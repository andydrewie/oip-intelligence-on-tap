import {test} from 'node:test';
import assert from 'node:assert/strict';
import {idleRequest, requestTransition} from '../lib/async-state.mjs';

// Pure request-identity tests. FAILED is also the timeout event emitted by
// ShareLink's timer. These do not claim clipboard permission or browser timing QA.
const start = (state, value) => requestTransition(state, {type: 'START', value});
const complete = (state, type, request) => requestTransition(state, {type, request});
const reset = state => requestTransition(state, {type: 'RESET'});

test('AS01 Completion without a pending request cannot manufacture copied feedback', () => {
  const idle = idleRequest();
  for (const type of ['SUCCEEDED', 'FAILED']) {
    assert.strictEqual(complete(idle, type, idle.request), idle);
  }
  assert.equal(idle.value, '');
  assert.equal(idle.status, 'idle');
});

test('AS02 Start binds an immutable URL snapshot to a new request identity', () => {
  const idle = Object.freeze(idleRequest());
  const pending = start(idle, 'https://example.test/#billing?use=86.4');
  assert.equal(pending.status, 'pending');
  assert.equal(pending.request, idle.request + 1);
  assert.equal(pending.value, 'https://example.test/#billing?use=86.4');
  assert.equal(idle.status, 'idle');
  assert.equal(idle.value, '');
});

test('AS03 Successful copy is terminal; a later timeout or duplicate callback cannot overwrite it', () => {
  const pending = start(idleRequest(), 'bill-A');
  const copied = complete(pending, 'SUCCEEDED', pending.request);
  assert.equal(copied.status, 'succeeded');
  assert.equal(copied.value, 'bill-A');
  assert.strictEqual(complete(copied, 'FAILED', pending.request), copied);
  assert.strictEqual(complete(copied, 'SUCCEEDED', pending.request), copied);
});

test('AS04 Clipboard failure preserves the exact URL for manual recovery', () => {
  const pending = start(idleRequest(), 'https://example.test/#cost-scenario?input-paymentFee=555');
  const failed = complete(pending, 'FAILED', pending.request);
  assert.equal(failed.status, 'failed');
  assert.equal(failed.value, pending.value);
  assert.strictEqual(complete(failed, 'SUCCEEDED', pending.request), failed);
});

test('AS05 Changing scope resets a pending request and rejects either late outcome', () => {
  const old = start(idleRequest(), 'bill-A');
  const cleared = reset(old);
  assert.equal(cleared.status, 'idle');
  assert.equal(cleared.value, '');
  assert.ok(cleared.request > old.request);
  assert.strictEqual(complete(cleared, 'SUCCEEDED', old.request), cleared);
  assert.strictEqual(complete(cleared, 'FAILED', old.request), cleared);
});

test('AS06 A newer pending copy owns feedback when an older request settles', () => {
  const first = start(idleRequest(), 'bill-A');
  const second = start(first, 'bill-B');
  assert.ok(second.request > first.request);
  assert.equal(second.value, 'bill-B');
  for (const type of ['SUCCEEDED', 'FAILED']) {
    assert.strictEqual(complete(second, type, first.request), second);
  }
  assert.equal(complete(second, 'SUCCEEDED', second.request).status, 'succeeded');
});

test('AS07 Reset followed by the same URL still creates a distinct request', () => {
  const first = start(idleRequest(), 'bill-A');
  const second = start(reset(first), 'bill-A');
  assert.ok(second.request > first.request);
  assert.strictEqual(complete(second, 'SUCCEEDED', first.request), second);
  assert.equal(complete(second, 'SUCCEEDED', second.request).value, 'bill-A');
});

test('AS08 Retry after failure uses a new identity and may complete normally', () => {
  const first = start(idleRequest(), 'chapter-A');
  const failed = complete(first, 'FAILED', first.request);
  const retry = start(failed, 'chapter-A');
  assert.equal(retry.status, 'pending');
  assert.ok(retry.request > first.request);
  assert.strictEqual(complete(retry, 'FAILED', first.request), retry);
  const success = complete(retry, 'SUCCEEDED', retry.request);
  assert.equal(success.status, 'succeeded');
  assert.equal(success.value, 'chapter-A');
});

test('AS09 A new copy after success can fail without retaining an earlier copied result', () => {
  const first = start(idleRequest(), 'bill-A');
  const copied = complete(first, 'SUCCEEDED', first.request);
  const retry = start(copied, 'bill-B');
  const failed = complete(retry, 'FAILED', retry.request);
  assert.equal(failed.status, 'failed');
  assert.equal(failed.value, 'bill-B');
  assert.ok(failed.request > copied.request);
});

test('AS10 Timeout enters terminal manual recovery; a late clipboard success cannot reverse it', () => {
  const pending = start(idleRequest(), 'bill-A');
  // The UI sends FAILED for its bounded timer, exactly as for permission denial.
  const timedOut = complete(pending, 'FAILED', pending.request);
  assert.equal(timedOut.status, 'failed');
  assert.equal(timedOut.value, 'bill-A');
  assert.strictEqual(complete(timedOut, 'SUCCEEDED', pending.request), timedOut);
  assert.strictEqual(complete(timedOut, 'FAILED', pending.request), timedOut);
});

test('AS11 A stale timeout cannot fail a retry, even when its URL is identical', () => {
  const first = start(idleRequest(), 'bill-A');
  const timedOut = complete(first, 'FAILED', first.request);
  const retry = start(timedOut, 'bill-A');
  assert.strictEqual(complete(retry, 'FAILED', first.request), retry);
  assert.equal(retry.status, 'pending');
  assert.equal(complete(retry, 'SUCCEEDED', retry.request).status, 'succeeded');
});

test('AS12 Reset clears both terminal result types and invalidates their callbacks', () => {
  for (const type of ['SUCCEEDED', 'FAILED']) {
    const pending = start(idleRequest(), 'bill-A');
    const terminal = complete(pending, type, pending.request);
    const cleared = reset(terminal);
    assert.equal(cleared.status, 'idle');
    assert.equal(cleared.value, '');
    assert.ok(cleared.request > terminal.request);
    assert.strictEqual(complete(cleared, type, terminal.request), cleared);
  }
});

test('AS13 Missing, unrelated and unknown completion events cannot advance a pending request', () => {
  const pending = Object.freeze(start(idleRequest(), 'bill-A'));
  for (const event of [
    {type: 'SUCCEEDED'},
    {type: 'FAILED', request: pending.request + 1},
    {type: 'UNKNOWN', request: pending.request},
  ]) assert.strictEqual(requestTransition(pending, event), pending);
});

test('AS14 Out-of-order completion after a newer success cannot replace its URL or status', () => {
  const first = start(idleRequest(), 'bill-A');
  const second = start(reset(first), 'bill-B');
  const copied = complete(second, 'SUCCEEDED', second.request);
  assert.strictEqual(complete(copied, 'FAILED', first.request), copied);
  assert.strictEqual(complete(copied, 'SUCCEEDED', first.request), copied);
  assert.equal(copied.value, 'bill-B');
  assert.equal(copied.status, 'succeeded');
});
