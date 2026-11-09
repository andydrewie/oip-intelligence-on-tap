from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
root=Path(__file__).resolve().parents[1]
folders=['docs','.github','review','tests','app','components','lib','hooks','public','vendor','scripts','worker','db','drizzle']
files=['AGENTS.md','CITATION.cff','.gitignore','.npmrc','package.json','package-lock.json','pnpm-lock.yaml','components.json','vite.config.ts','postcss.config.mjs','tsconfig.json','cloudflare-env.d.ts','next.config.ts','eslint.config.mjs','drizzle.config.ts','README.md','CONTRIBUTING.md','SOURCE_PROVENANCE.json','LICENSE','CONTENT-LICENSE.md','PROJECT_GUIDANCE.md','.openai/hosting.json','tests/model.test.mjs']
paths=[]
for f in folders:
 paths.extend(p for p in (root/f).rglob('*') if p.is_file() and 'node_modules' not in p.parts and '.sites-runtime' not in p.parts and p.name not in ['source-code.zip','qa-mobile.html'])
paths.extend(root/f for f in files if (root/f).exists())
with ZipFile(root/'public/source-code.zip','w',ZIP_DEFLATED) as z:
 for p in sorted(set(paths)):z.write(p,p.relative_to(root))
print(f'Source archive: {len(set(paths))} files')
