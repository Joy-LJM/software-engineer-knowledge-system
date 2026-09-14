// In the App Router, error.tsx is treated as a client-side error boundary.
'use client'

export default function ErrorPage({error,reset}:{error:Error,reset:()=>void}){

  return <div>
    
    <h2>Something aint right! :{error.message}</h2>
    <button onClick={reset}>Try again</button>
  </div>
}