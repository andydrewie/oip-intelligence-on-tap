'use client';
import {createContext,useContext,useEffect,useId,useRef,useState,type ReactNode,type CSSProperties} from 'react';
import {scenarioHash,targetFromHash,ECONOMICS_TARGETS,BILLING_TARGETS} from '../lib/scenarios.mjs';
import {createExperience,experienceTransition,experienceHash,economicsValues,reviewStatus} from '../lib/experience-state.mjs';
import {idleRequest,requestTransition} from '../lib/async-state.mjs';
import {numberInput} from '../lib/inputs.mjs';

export const InputResetContext=createContext(0);

const arrowPaths={right:'M3 8h10M8 3l5 5-5 5',down:'M8 3v10M3 8l5 5 5-5','up-right':'M3 13 13 3M4 3h9v9'};
export const Arrow=({direction='right'}:{direction?:'up-right'|'right'|'down'})=> <svg className={`arrow-icon arrow-${direction}`} aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d={arrowPaths[direction]} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
export const CopyIcon=()=> <svg className="copy-icon" aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="5" y="5" width="8" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M10 5V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h2" stroke="currentColor" strokeWidth="1.3"/></svg>;
export function Tag({children}:{children:ReactNode}){return <span className="tag">{children}</span>}
export function Pet({pose='welcome'}:{pose?:'welcome'|'reading'}){return <span className={`codex-pet pet-${pose}`} aria-hidden="true"/>}
export function UtilityEgg(){
 const [open,setOpen]=useState(false),root=useRef<HTMLDivElement>(null),toggle=useRef<HTMLButtonElement>(null),id=useId();
 useEffect(()=>{if(!open)return;const dismiss=(e:PointerEvent)=>{if(!root.current?.contains(e.target as Node))setOpen(false)};document.addEventListener('pointerdown',dismiss);return()=>document.removeEventListener('pointerdown',dismiss)},[open]);
 return <div ref={root} className="utility-egg" onKeyDown={e=>{if(e.key==='Escape'&&open){e.preventDefault();setOpen(false);toggle.current?.focus()}}}><button ref={toggle} className="utility-toggle" aria-label="A small thought, on tap" aria-expanded={open} aria-controls={id} title="A small thought, on tap" onClick={()=>setOpen(v=>!v)}><Pet/></button>{open&&<div id={id} className="utility-note" role="note"><div className="utility-note-head"><span>Andrew’s utility intuition</span><button aria-label="Close the small thought" onClick={()=>{setOpen(false);toggle.current?.focus()}}>×</button></div><p>Compute = electricity + infrastructure;<br/>Electricity = energy + infrastructure;<br/>Oil = energy + infrastructure;<br/>Energy = the power of life;</p><strong>Different grades of oil.<br/>Different grades of intelligence?</strong><small>A design analogy, not a literal cost equation.</small><a className="origin-link" href="#founding-story" onClick={()=>setOpen(false)}>The Uber inspiration behind the bill <Arrow direction="right"/></a></div>}</div>
}
export function Detail({title,children,id}:{title:string,children:ReactNode,id?:string}){return <details className="detail" id={id}><summary>{title}<span aria-hidden="true">+</span></summary><div className="detail-body">{children}</div></details>}
export function Field({label,value,onChange,min=0,max=1000,step=1,suffix='',range=false,rangeMax=max}:{label:string,value:number,onChange:(v:number)=>void,min?:number,max?:number,step?:number,suffix?:string,range?:boolean,rangeMax?:number}){
 const id=useId(),epoch=useContext(InputResetContext),[draft,setDraft]=useState(String(value)),[ready,setReady]=useState(false),[notice,setNotice]=useState('');
 useEffect(()=>setReady(true),[]);
 useEffect(()=>{setDraft(String(value));setNotice('')},[value,epoch]);
 const state=numberInput(draft,{min,max}),invalid=state.state!=='valid';
 const used=`${value.toLocaleString('en-US',{maximumFractionDigits:10})}${suffix?' '+suffix:''}`;
 function commit(raw:string){const next=numberInput(raw,{min,max});if(next.state==='valid'){setDraft(String(next.value));setNotice('');onChange(next.value!)}else{setDraft(String(value));setNotice(`Entry not applied. Using ${used}. Enter ${min.toLocaleString()}–${max.toLocaleString()}.`)}}
 const hint=invalid?`Enter ${min.toLocaleString()}–${max.toLocaleString()}. Results still use ${used}. Your entry has not been applied.`:notice;
 return <div className="field" data-machine="number-input" data-state={!ready?'loading':state.state} aria-busy={!ready}><label htmlFor={id}>{label}<span className="unit">{suffix}</span></label><input id={id} disabled={!ready} aria-label={`${label} ${suffix}`.trim()} aria-invalid={invalid||undefined} aria-describedby={hint?`${id}-hint`:undefined} type="number" inputMode="decimal" min={min} max={max} step={step} value={draft} onChange={e=>{const raw=e.target.value;setDraft(raw);setNotice('');const next=numberInput(raw,{min,max});if(next.state==='valid')onChange(next.value!)}} onBlur={e=>commit(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')commit(e.currentTarget.value);if(e.key==='Escape'){setDraft(String(value));setNotice('')}}}/>{hint&&<small className="field-hint" id={`${id}-hint`} role="status">{hint}</small>}{range&&<input disabled={!ready} aria-label={`${label} slider`} type="range" min={min} max={rangeMax} step={step} value={value} style={{'--range-fill':`${100*(value-min)/(rangeMax-min)}%`} as CSSProperties} onChange={e=>{const n=Number(e.target.value);setDraft(String(n));setNotice('');onChange(n)}}/>}</div>
}
export type ScenarioController={
 values:Record<string,number>;costInputs:Record<string,string>;revision:number;warning:string;ready:boolean;reviewState:string;
 set:(key:string)=>(value:number)=>void;setCostInput:(key:string,raw:string)=>void;
 reset:()=>void;clearCosts:()=>void;reviewCosts:()=>void;
};
export function useExperienceState(){
 const [state,setState]=useState(createExperience),current=useRef(state),lastRestore=useRef<string|null>(null);
 function apply(event:Record<string,unknown>){const next=experienceTransition(current.current,event);current.current=next;setState(next);return next}
 useEffect(()=>{
  const restore=()=>{
   if(lastRestore.current===location.hash)return;
   const next=apply({type:'RESTORE',hash:location.hash}),target=targetFromHash(location.hash);
   if(!location.hash.includes('?')){
    const kind=BILLING_TARGETS.includes(target)?'billing':ECONOMICS_TARGETS.includes(target)?'economics':null;
    if(kind)history.replaceState(history.state,'',experienceHash(next,kind,target));
   }
   lastRestore.current=location.hash;
  };
  restore();window.addEventListener('hashchange',restore);window.addEventListener('popstate',restore);
  return()=>{window.removeEventListener('hashchange',restore);window.removeEventListener('popstate',restore)};
 },[]);
 function send(kind:'billing'|'economics',event:Record<string,unknown>,worksheet=false){
  const next=apply(event),target=targetFromHash(location.hash);
  const owns=(kind==='billing'?BILLING_TARGETS:ECONOMICS_TARGETS).includes(target);
  if(owns||(kind==='billing'&&['','main','overview','explore'].includes(target))){
   history.replaceState(history.state,'',experienceHash(next,kind,worksheet?'cost-scenario':target));
   lastRestore.current=location.hash;
  }
 }
 function controller(kind:'billing'|'economics'):ScenarioController{return {
  values:kind==='billing'?state.bill:economicsValues(state),costInputs:state.costInputs,revision:state.revision[kind],warning:state.warnings[kind],ready:state.phase==='ready',reviewState:reviewStatus(state),
  set:key=>value=>send(kind,{type:kind==='billing'?'BILL_CHANGED':'ECONOMICS_CHANGED',key,value}),
  setCostInput:(key,raw)=>send('economics',{type:'COST_EDITED',key,raw},true),
  reviewCosts:()=>send('economics',{type:'COSTS_REVIEWED'},true),
  clearCosts:()=>send('economics',{type:'COSTS_CLEARED'},true),
  reset:()=>send(kind,{type:kind==='billing'?'BILL_RESET':'ECONOMICS_RESET'})
 }}
 return {billing:controller('billing'),economics:controller('economics')};
}
export function ShareLink({hash,label='Copy link to these settings',openLabel='Open this scenario'}:{hash:string,label?:string,openLabel?:string}){
 const [state,setState]=useState(idleRequest),current=useRef(state),scope=useRef(hash),timer=useRef<ReturnType<typeof setTimeout>|null>(null);
 scope.current=hash;
 function move(event:Record<string,unknown>){const next=requestTransition(current.current,event);current.current=next;setState(next);return next}
 useEffect(()=>{move({type:'RESET'});return()=>{current.current=requestTransition(current.current,{type:'RESET'});if(timer.current)clearTimeout(timer.current)}},[hash]);
 async function copy(){
  if(timer.current)clearTimeout(timer.current);
  const url=new URL(location.href);url.search='';url.hash=hash;
  const request=move({type:'START',value:url.href}).request,snapshot=hash;
  const finish=(type:string)=>{if(scope.current===snapshot&&current.current.request===request&&current.current.status==='pending'){move({type,request});if(timer.current)clearTimeout(timer.current)}};
  timer.current=setTimeout(()=>finish('FAILED'),8000);
  try{await navigator.clipboard.writeText(url.href);finish('SUCCEEDED')}catch{finish('FAILED')}
 }
 const message=state.status==='pending'?'Copying link…':state.status==='succeeded'?'Link copied.':state.status==='failed'?'Select and copy the link below.':'';
 return <div className="share-control" data-machine="share-link" data-state={state.status}><button className="text-button" disabled={state.status==='pending'} onClick={copy}>{label} <CopyIcon/></button><span role="status">{message}</span>{state.value&&<a className="inline-link" href={state.value}>{openLabel} <Arrow/></a>}{state.status==='failed'&&<input aria-label="Shareable link" readOnly value={state.value} onFocus={e=>e.currentTarget.select()}/>}</div>
}

export function ScenarioShare({kind,values,costInputs,openWorksheet=false}:{kind:'billing'|'economics',values:Record<string,number>,costInputs?:Record<string,string>,openWorksheet?:boolean}){const hash=scenarioHash(kind,values,costInputs);return <ShareLink hash={kind==='economics'&&openWorksheet?hash.replace('#economics?','#cost-scenario?'):hash} label={kind==='billing'?'Copy link to this bill':'Copy link to these assumptions'}/>}
export function scrollToRoute(route:string){
 const target=targetFromHash(route)||'main';
 const id=target==='personal-scaling'?'pricing-formula':['billing','economics','relationship','research'].includes(target)?'explore':target;
 const el=document.getElementById(id);if(!el||el.closest('[hidden]'))return;
 for(let node:HTMLElement|null=el;node;node=node.parentElement)if(node instanceof HTMLDetailsElement)node.open=true;
 // Route changes transfer keyboard focus to the same destination as visual navigation.
 const mainTab=['billing','economics','relationship','research'].includes(target);
 const destination=mainTab?document.getElementById(`tab-${target}`):el instanceof HTMLDetailsElement?el.querySelector('summary') as HTMLElement:el;
 if(destination){if(!destination.matches('a,button,input,select,summary,[tabindex]'))destination.tabIndex=-1;destination.focus({preventScroll:true})}
 el.scrollIntoView({behavior:'instant',block:'start'});
}
