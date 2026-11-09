// Completion belongs to the request that started it, never to the next scenario.
export const idleRequest=()=>({status:'idle',request:0,value:''});
export function requestTransition(state,event){
 if(event.type==='RESET')return {...idleRequest(),request:state.request+1};
 if(event.type==='START')return {status:'pending',request:state.request+1,value:event.value};
 if(event.request!==state.request||state.status!=='pending')return state;
 if(event.type==='SUCCEEDED')return {...state,status:'succeeded'};
 if(event.type==='FAILED')return {...state,status:'failed'};
 return state;
}
