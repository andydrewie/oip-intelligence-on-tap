'use client';
import ResearchLoader from '../../app/research-loader';
// Preview-only probe. Its temporary app route is removed before release.
let calls=0;
const controlledLoad=()=>++calls<3?Promise.reject(new Error('Deliberate import failure for recovery verification')):import('../../app/research');
export default function ResearchLoaderProbe(){return <main><h1>Research loading recovery probe</h1><p>The first two module requests fail deliberately. The third loads the real research.</p><ResearchLoader route="chapters" loadResearch={controlledLoad}/></main>}
