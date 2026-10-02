'use client'

import { useState } from "react";

export default function Home() {

  const [code, setCode] = useState('')

  return (
    <div className="flex justify-center items-center">
      <main className="">
        <h1>AI Code Explainer</h1>
        <textarea
        placeholder="Вставь код сюда..." 
        onChange={e => setCode(e.target.value)} 
        value={code}/>
        <button onClick={() => console.log(code)}></button>
        <div className="response"></div>
      </main>
    </div>
  );
}
