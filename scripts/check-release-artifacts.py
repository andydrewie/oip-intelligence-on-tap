"""Check generated local destinations and packaged source; no network requests."""
import json,re,posixpath,sys
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
from zipfile import ZipFile
root=Path(__file__).resolve().parents[1]
public=root/'public'
class Page(HTMLParser):
 def __init__(self,text):
  super().__init__(); self.ids=[];self.links=[];self.feed(text)
 def handle_starttag(self,tag,attrs):
  attrs=dict(attrs)
  if attrs.get('id'):self.ids.append(attrs['id'])
  for key in ['href','src']:
   if attrs.get(key):self.links.append(attrs[key])
pages={p:Page(p.read_text()) for p in public.rglob('*.html')}
errors=[];checked=0;app_routes=0;external=0
for p,page in pages.items():
 dup={x for x in page.ids if page.ids.count(x)>1}
 if dup:errors.append(f'{p.relative_to(public)} duplicate ids {sorted(dup)}')
 for href in page.links:
  u=urlsplit(href)
  if u.scheme or u.netloc:external+=1;continue
  if not u.path:target=p
  elif u.path=='/':app_routes+=1;continue
  else:
   path=unquote(u.path)
   target=public/path.lstrip('/') if path.startswith('/') else p.parent/path
   if not target.exists():
    candidates=[target.with_suffix('.html'),target/'index.html']
    target=next((x for x in candidates if x.exists()),target)
  checked+=1
  if not target.is_file():errors.append(f'{p.relative_to(public)} missing {href}');continue
  if u.fragment and target.suffix=='.html':
   dest=pages.get(target) or Page(target.read_text())
   if unquote(u.fragment) not in dest.ids:errors.append(f'{p.relative_to(public)} missing fragment {href}')
json_count=0
for p in public.rglob('*.json'):
 try:json.loads(p.read_text());json_count+=1
 except Exception as e:errors.append(f'{p.relative_to(public)} JSON {e}')
archive=public/'source-code.zip'
zip_result={'checked':False}
if archive.exists():
 with ZipFile(archive) as z:
  corrupt=z.testzip(); names=z.namelist()
  if corrupt:errors.append('Corrupt ZIP '+corrupt)
  required=['lib/inputs.mjs','lib/money.mjs','tests/input-state.test.mjs','tests/recon-contract.test.mjs','tests/archive-contract.test.mjs','public/archive/models.json','review/input-recovery/cases.json','lib/experience-state.mjs','lib/async-state.mjs','tests/state-machines.test.mjs','tests/async-state.test.mjs','public/archive/interaction-states.json','review/state-machines/cases.json','public/testing.json','PROJECT_GUIDANCE.md']
  required=sorted(set(required+[str(p.relative_to(root)) for folder in ['app','lib','tests'] for p in (root/folder).rglob('*') if p.is_file()]))
  # A runnable package can still have a stale README, equation or agent handoff.
  # Keep the repository presentation and its generator in the same release gate.
  presentation=['README.md','AGENTS.md','CONTRIBUTING.md','SOURCE_PROVENANCE.json','CITATION.cff','scripts/build-archive.mjs','scripts/check-release-artifacts.py','.github/workflows/checks.yml']
  presentation += [str(p.relative_to(root)) for p in (root/'docs').rglob('*') if p.is_file()]
  presentation += [str(p.relative_to(root)) for p in (public/'archive').rglob('*.md')]
  required=sorted(set(required+presentation))
  for name in required:
   if name not in names:errors.append('Missing ZIP member '+name)
   elif z.read(name)!=(root/name).read_bytes():errors.append('Stale ZIP member '+name)
  if any(x.endswith('/qa-mobile.html') or x.startswith('app/qa-') for x in names):errors.append('Temporary QA page packaged')
  zip_result={'checked':True,'members':len(names),'corrupt_member':corrupt,'required_current_files':len(required)}
else:errors.append('Source ZIP absent')
report={'html_files':len(pages),'local_targets_checked':checked,'application_routes_deferred_to_browser':app_routes,'external_targets_not_requested':external,'json_files_parsed':json_count,'zip':zip_result,'errors':errors}
(root/(sys.argv[1] if len(sys.argv)>1 else 'review/input-recovery')/'artifact-checks.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report,indent=2))
raise SystemExit(bool(errors))
