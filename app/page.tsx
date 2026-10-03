'use client'

import { useState } from "react";

export default function Home() {

  const [code, setCode] = useState('')
  const [reply, setReply] = useState('')

  const send = async () => {
  const res = await fetch('/api/explain', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  })
  const data = await res.json()
  setReply(data.reply)
  console.log('data =>', data)
  setCode('')
}

  return (
    <div className="min-h-screen bg-slate-900 text-zinc-100 flex justify-center items-center p-8">
      <main className="flex flex-col gap-4 w-full max-w-2xl text-center">
        <h1 className="text-3xl font-bold">AI Code Explainer</h1>
        <textarea
          className="w-full h-64 p-4 bg-zinc-800 border-2 border-zinc-600 text-zinc-100"
          placeholder="Вставь код сюда..."
          onChange={e => setCode(e.target.value)}
          value={code}
        />
        <button
          className="px-6 py-3 bg-zinc-800 border-2 border-zinc-600 text-zinc-100 cursor-pointer"
          onClick={send}
        >
          Объяснить
        </button>
        {reply && <div className="p-4 bg-zinc-800 border-2 border-zinc-600">{reply}</div>}
      </main>
    </div>
  )
}
