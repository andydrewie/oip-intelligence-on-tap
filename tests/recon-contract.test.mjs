import {test} from 'node:test';
import assert from 'node:assert/strict';
import {bill, cents, money, simulate, defaults} from '../lib/model.mjs';
import {parseScenario, scenarioHash, scenarios} from '../lib/scenarios.mjs';
import {providerDefaults, providerEconomics, costCategories} from '../lib/provider-economics.mjs';

// Independent regressions from the input-contract reconnaissance. These are
// calculation/parser tests, not evidence of browser or touch interaction.
const supplied = {
  ...providerDefaults,
  servingCost: 0, servingKnown: 1,
  developmentCost: 0, developmentKnown: 1,
  operationsCost: 0, operationsKnown: 1,
  paymentFee: 0, paymentKnown: 1,
  costsReviewed: 1, costBasis: 1000,
};
const legacy = (entries, target='cost-scenario') => `#${target}?${new URLSearchParams({
  v: '4', use: '1000', servingCost: '0', servingKnown: '1',
  developmentCost: '0', developmentKnown: '1', operationsCost: '0',
  operationsKnown: '1', paymentFee: '0', paymentKnown: '1',
  costsReviewed: '1', costBasis: '1000', ...entries,
})}`;

test('RC01 Equivalent known-flag spellings never revive a rejected cost as supplied zero', () => {
  for (const flag of ['1', '1.0', '01', '1e0', '0x1']) {
    for (const c of costCategories) {
      const invalidValue = String(c.max + 1);
      const parsed = parseScenario('economics', legacy({[c.key]: invalidValue, [c.known]: flag}));
      assert.equal(parsed.values[c.known], 0, `${c.key}, known=${flag}`);
      assert.equal(parsed.values.costsReviewed, 0, `${c.key}, known=${flag}`);
      assert.ok(parsed.warning, `${c.key}, known=${flag}: explicit migration warning`);
      const result = providerEconomics(1000, {...parsed.values, costsReviewed: 1}, parsed.costInputs);
      assert.equal(result.remaining, null, `${c.key}, known=${flag}: cannot approve rejected input`);
    }
  }
});

test('RC02 Supplied flags without a cost value never manufacture an intentional zero', () => {
  for (const flag of ['1', '1.0', '01', '1e0']) {
    for (const c of costCategories) {
      const url = legacy({[c.known]: flag});
      const [target, query] = url.split('?');
      const params = new URLSearchParams(query);
      params.delete(c.key);
      const parsed = parseScenario('economics', `${target}?${params}`);
      assert.equal(parsed.values[c.known], 0, `${c.key}, known=${flag}`);
      assert.equal(parsed.values.costsReviewed, 0);
      assert.equal(parsed.costInputs[c.key], '');
      assert.ok(parsed.warning);
    }
  }
});

test('RC03 Shared-link numbers use the same decimal grammar as visible number controls', () => {
  for (const raw of ['0x20', '0b100', '0o20']) {
    const parsed = parseScenario('billing', `#billing?v=2&use=${raw}&gift=${raw}`);
    assert.equal(parsed.values.use, scenarios.billing.defaults.use);
    assert.equal(parsed.values.gift, scenarios.billing.defaults.gift);
    assert.ok(parsed.warning);
  }
});

test('RC04 Invalid raw cost drafts survive share and reload and remain distinct from missing', () => {
  const original = parseScenario('economics', legacy({paymentFee: '555', paymentKnown: '1.0'}));
  const restored = parseScenario('economics', scenarioHash('economics', original.values, original.costInputs));
  assert.equal(restored.costInputs.paymentFee, '555');
  assert.equal(restored.values.paymentKnown, 0);
  assert.equal(restored.values.costsReviewed, 0);
  const result = providerEconomics(1000, restored.values, restored.costInputs);
  assert.deepEqual(result.invalid, ['Payment processing']);
  assert.ok(!result.missing.includes('Payment processing'));
  assert.equal(result.remaining, null);
});

test('RC05 Final money rounding agrees with the displayed decimal amount at half cents', () => {
  for (const [input, expected] of [[2.135, 2.14], [2.175, 2.18], [2.385, 2.39], [4.015, 4.02]]) {
    assert.equal(cents(input), expected, `cents(${input})`);
    assert.equal(money(cents(input)), money(input), `displayed ${input}`);
    const result = bill(86.4, input);
    assert.equal(result.contribution, expected);
    assert.equal(result.final, 100 + expected);
  }
});

test('RC06 Fractional percentage precision survives until final charge rounding, including half cents', () => {
  for (const [usage, fee, expected] of [[86.4, 2.135, 2.14], [1000, .2135, 2.14], [1000, 2.875, 28.75]]) {
    const result = providerEconomics(usage, {...supplied, costBasis: usage, paymentFee: fee});
    assert.equal(result.feeRate, fee);
    assert.equal(result.payment, expected, `${fee}% of ${result.revenue}`);
    assert.equal(result.remaining, cents(result.revenue - expected));
  }
});

test('RC07 Every economics deep-link target restores both its worksheet and linked receipt', () => {
  const values = {...scenarios.economics.defaults, ...supplied, use: 1000, gift: 5.25, paymentFee: 2.875};
  const validHash = scenarioHash('economics', values);
  const targets = ['economics', 'cost-scenario', 'public-benchmarks', 'economics-loyalty', 'economics-method', 'economics-comparison'];
  for (const target of targets) {
    const hash = validHash.replace('#economics?', `#${target}?`);
    const restored = parseScenario('economics', hash);
    assert.ok(restored, `${target}: worksheet parameters must be read`);
    assert.equal(restored.values.use, 1000);
    assert.equal(restored.values.gift, 5.25);
    assert.equal(restored.values.paymentFee, 2.875);
    assert.equal(restored.costInputs.paymentFee, '2.875');
    const receipt = parseScenario('billing', hash);
    assert.ok(receipt, `${target}: linked receipt parameters must be read`);
    assert.equal(receipt.values.use, 1000);
    assert.equal(receipt.values.gift, 5.25);
    const invalidHash = hash.replace('input-paymentFee=2.875', 'input-paymentFee=555');
    const invalid = parseScenario('economics', invalidHash);
    assert.equal(invalid.costInputs.paymentFee, '555');
    assert.equal(invalid.values.paymentKnown, 0);
    assert.equal(invalid.values.costsReviewed, 0);
  }
});

test('RC08 Perpetual lifetime estimates never expose Infinity for an accepted near-zero churn rate', () => {
  const parsed = parseScenario('economics', '#economics?v=5&churn=1e-320');
  assert.equal(parsed.values.churn, 1e-320);
  for (const row of simulate({...defaults, churn: parsed.values.churn})) {
    assert.equal(row.ltv, null, `${row.name}: no finite estimate`);
    assert.ok(Number.isFinite(row.annual), `${row.name}: finite 12-month comparison`);
  }
});
