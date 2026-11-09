// Presentation only. Billing arithmetic remains in model.mjs.
// Shared native MathML keeps the app and the JavaScript-free archive in step.
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const num = n => `<mn>${escape(n)}</mn>`;
const variable = n => `<mi>${n}</mi>`;
const op = n => `<mo>${escape(n)}</mo>`;
const row = body => `<mrow>${body}</mrow>`;
const bs = row(`${variable('B')}<mo stretchy="false">(</mo>${variable('S')}<mo stretchy="false">)</mo>`);
const math = (body, label, tex = '') => `<math xmlns="http://www.w3.org/1998/Math/MathML" displaystyle="true"${label?` aria-label="${escape(label)}"`:""}><semantics>${row(body)}${tex?`<annotation encoding="application/x-tex">${escape(tex)}</annotation>`:''}</semantics></math>`;
const bound = (low, high, inclusive = false) => `${num(low)}${op(inclusive?'≤':'<')}${variable('S')}${op('≤')}${num(high)}`;
const floor = numerator => `${num(50)}${op('⌊')}<mfrac>${row(`${numerator}${op('+')}${num(25)}`)}${num(50)}</mfrac>${op('⌋')}`;

export const settlementLatex = String.raw`B(S)=\begin{cases}
20, & 20\le S\le60,\\
100, & 60<S\le150,\\
200, & 150<S\le350,\\
500, & 350<S\le500,\\
50\left\lfloor\dfrac{S+25}{50}\right\rfloor, & S>500.
\end{cases}`;
export const subtotalMarkup = math(`${variable('S')}${op('=')}${num(20)}${op('+')}${variable('M')}`, 'S equals 20 plus M', 'S=20+M');
export const floorMarkup = math(`${op('⌊')}${variable('x')}${op('⌋')}`, 'floor of x', String.raw`\lfloor x\rfloor`);
const cases = [[num(20),bound(20,60,true)],[num(100),bound(60,150)],[num(200),bound(150,350)],[num(500),bound(350,500)],[floor(variable('S')),`${variable('S')}${op('>')}${num(500)}`]];
const caseTable = `<mtable displaystyle="true">${cases.map(([value,condition])=>`<mtr><mtd>${value}</mtd><mtd>${condition}</mtd></mtr>`).join('')}</mtable>`;
// One mathematical box: no wrapping between B(S), brace, values or conditions.
export const settlementMarkup = `<div class="settlement-equation">${math(`${bs}${op('=')}${op('{')}${caseTable}`,'B of S equals: 20 for S from 20 through 60; 100 for S above 60 through 150; 200 for S above 150 through 350; 500 for S above 350 through 500; otherwise 50 times the floor of the fraction S plus 25 over 50',settlementLatex)}</div>`;

const amount = n => num(Number(n).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}));
const line = (parts,label) => `<div class="equation-line" role="group" aria-label="${escape(label)}">${parts.map(p=>math(p,'')).join('')}</div>`;
export function workedEquationMarkup(b) {
 const subtotal=line([`${variable('S')}${op('=')}${num(20)}${op('+')}${amount(b.metered)}`,`${op('=')}${amount(b.subtotal)}`],`Subtotal: 20 plus ${b.metered.toFixed(2)} equals ${b.subtotal.toFixed(2)} dollars`);
 const band=b.subtotal<=60?bound(20,60,true):b.subtotal<=150?bound(60,150):b.subtotal<=350?bound(150,350):bound(350,500);
 const settlement=b.subtotal>500
  ? line([`${bs}${op('=')}`,floor(amount(b.subtotal))],`Bill equals 50 times the floor of (${b.subtotal.toFixed(2)} plus 25) divided by 50`)+line([`${op('=')}${num(50)}${op('×')}${num(b.adjusted/50)}`,`${op('=')}${amount(b.adjusted)}`],`50 times ${b.adjusted/50} equals ${b.adjusted.toFixed(2)} dollars`)
  : line([band,`${op('⇒')}${bs}${op('=')}${amount(b.adjusted)}`],`This subtotal is in the band that settles to ${b.adjusted.toFixed(2)} dollars`);
 const final=line([`${amount(b.adjusted)}${op('+')}${amount(b.contribution)}`,`${op('=')}<mrow data-testid="drawer-final"><mo lspace="0" rspace="0">$</mo>${amount(b.final)}</mrow>`],`After donation: ${b.adjusted.toFixed(2)} plus ${b.contribution.toFixed(2)} equals ${b.final.toFixed(2)} dollars`);
 return {subtotal,settlement,final};
}
