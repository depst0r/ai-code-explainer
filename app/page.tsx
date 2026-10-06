'use client'
import Markdown from "react-markdown"
import remarkGfm from 'remark-gfm'
import { useState } from "react"

import { MODES } from "./lib/modes"

export default function Home() {

  const [code, setCode] = useState('')
  const [reply, setReply] = useState('')
  const [mode, setMode] = useState('explain')
  const [inputMode, setInputMode] = useState('code')
  const [url, setUrl] = useState('')


  const send = async () => {
  const res = await fetch('/api/explain', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, mode, inputMode, url }),
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
        <div className="flex gap-4 justify-center">
        {MODES.map(res => (
          <button
          key={res.id}
          onClick={() => setMode(res.id)}
          className={`px-4 py-2 border-2 cursor-pointer ${mode === res.id ? 'bg-zinc-600 border-zinc-400' : 'bg-zinc-800 border-zinc-600'}`}>
          {res.name}
          </button>
        ))}
        </div>
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => setInputMode('code')}
            className={`px-4 py-2 border-2 cursor-pointer ${inputMode === 'code'  ? 'bg-zinc-600 border-zinc-400' : 'bg-zinc-800 border-zinc-600'}`}
          >
            Код
          </button>
          <button
            onClick={() => setInputMode('url')}
            className={`px-4 py-2 border-2 cursor-pointer ${inputMode === 'url' ? 'bg-zinc-600 border-zinc-400' : 'bg-zinc-800 border-zinc-600'}`}
          >
            Ссылка на GitHub
          </button>
        </div>
        {inputMode === 'code' 
          ?  <textarea
              className="w-full h-64 p-4 bg-zinc-800 border-2 border-zinc-600 text-zinc-100"
              placeholder="Вставь код сюда..."
              onChange={e => setCode(e.target.value)}
              value={code}
            />
          : <input
              type="text"
              className="w-full p-4 bg-zinc-800 border-2 border-zinc-600 text-zinc-100"
              placeholder="https://github.com/..."
              value={url}
              onChange={e => setUrl(e.target.value)}
            />
        }

        <button
          className="px-6 py-3 bg-zinc-800 border-2 border-zinc-600 text-zinc-100 cursor-pointer"
          onClick={send}
        >
          Объяснить
        </button>
        {reply && 
          <div className="p-4 bg-zinc-800 border-2 border-zinc-600 prose prose-invert max-w-none">
            <Markdown remarkPlugins={[remarkGfm]}>{reply}</Markdown>
            </div>}
      </main>
    </div>
  )
}
