// One validation result for controls, calculation and saved scenarios.
// Empty is not invalid, and neither is a deliberate zero.
export function numberInput(raw, {min=0,max=Infinity,decimals}={}) {
 const text=String(raw ?? '');
 if(text.trim()==='')return {state:'empty',raw:text,value:null,reason:'empty'};
 const numeric=/^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(text.trim());
 const n=Number(text);
 if(!numeric||!Number.isFinite(n))return {state:'invalid',raw:text,value:null,reason:'number'};
 if(n<min||n>max)return {state:'invalid',raw:text,value:null,reason:'range'};
 if(decimals!==undefined&&Number(n.toFixed(decimals))!==n)
  return {state:'invalid',raw:text,value:null,reason:'precision'};
 return {state:'valid',raw:text,value:n,reason:null};
}
