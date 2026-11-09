import type { Metadata } from 'next';
import './globals.css';
import './equations.css';
export const metadata: Metadata={title:'Intelligence on Tap — An open concept by Andrew Fai',description:'Keep fixed plans. Add a $20 base plus metered intelligence for personal use. An independent exploration of billing, loyalty and mutual value.',icons:{icon:'/favicon.svg'},openGraph:{title:'Intelligence on Tap',description:'An open contribution. Take what is useful.'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><head><link rel="preload" href="/fonts/OpenAISans-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/><link rel="alternate" type="text/markdown" href="/llms.txt" title="Concise research index"/><link rel="alternate" type="application/json" href="/archive/index.json" title="Research manifest"/></head><body>{children}</body></html>}
