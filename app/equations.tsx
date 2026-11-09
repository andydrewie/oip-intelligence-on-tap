import {settlementMarkup,subtotalMarkup,floorMarkup,workedEquationMarkup} from '../lib/equations.mjs';
import {bill,money} from '../lib/model.mjs';

// Only trusted, locally generated MathML enters these containers.
export function SubtotalEquation(){return <span className="inline-equation" dangerouslySetInnerHTML={{__html:subtotalMarkup}}/>}
export function FloorNotation(){return <span className="inline-equation" dangerouslySetInnerHTML={{__html:floorMarkup}}/>}
export function SettlementEquation(){return <div className="equation-card"><div className="equation-scroll" tabIndex={0} role="region" aria-label="Bill equation; scroll horizontally if needed" dangerouslySetInnerHTML={{__html:settlementMarkup}}/><p className="equation-hint">Scroll sideways if the full equation is not visible.</p></div>}
export function WorkedEquations({value}:{value:ReturnType<typeof bill>}){
 const parts=workedEquationMarkup(value);
 return <div className="worked-example equation-worked" aria-live="polite" aria-atomic="true"><span className="eyebrow">YOUR CURRENT EXAMPLE · USD</span><div className="equation-scroll" tabIndex={0} role="region" aria-label="Current calculation; scroll horizontally if needed"><div dangerouslySetInnerHTML={{__html:parts.subtotal}}/><div className="settlement-working" dangerouslySetInnerHTML={{__html:parts.settlement}}/><div className="worked-final"><p>After your {money(value.contribution)} Foundation donation</p><div dangerouslySetInnerHTML={{__html:parts.final}}/></div></div></div>
}
