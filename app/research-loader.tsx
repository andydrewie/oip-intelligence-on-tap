'use client';
import {useEffect,useState,type ComponentType} from 'react';
type ResearchModule={default:ComponentType<{route:string}>};
const loadResearchModule=()=>import('./research');

export default function ResearchLoader({route,loadResearch=loadResearchModule}:{route:string,loadResearch?:()=>Promise<ResearchModule>}){
 const [attempt,setAttempt]=useState(0),[status,setStatus]=useState<'loading'|'ready'|'failed'>('loading');
 const [Research,setResearch]=useState<ComponentType<{route:string}>|null>(null);
 useEffect(()=>{
  let current=true;setStatus('loading');
  loadResearch().then(module=>{if(current){setResearch(()=>module.default);setStatus('ready')}},()=>{if(current)setStatus('failed')});
  return()=>{current=false};
 },[attempt,loadResearch]);
 return <div data-machine="research-load" data-state={status} aria-busy={status==='loading'}>
  {status==='ready'&&Research?<Research route={route}/>:<div className={status==='failed'?'notice':undefined}><p role="status">{status==='failed'?'The interactive research could not load. Your bill and assumptions are still here.':'Opening the research…'}</p><button className="text-button" hidden={status==='loading'&&attempt===0} aria-disabled={status==='loading'} onClick={()=>{if(status!=='loading')setAttempt(n=>n+1)}}>{status==='loading'?'Loading research…':'Try loading research again'}</button>{' '}<a href="/archive/index.html">Read the static research index</a></div>}
 </div>;
}
