import { MODES } from "@/app/lib/modes"

export async function POST(req: Request) {
    const { code, mode, inputMode, url } = await req.json()

    let finalCode = code

    if (inputMode === "url") {
        if (!url.includes('github.com')) {
            return Response.json({ reply: 'Нужна ссылка с github.com' })
        }
        const rawUrl = url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/')
        const githubRes = await fetch(rawUrl)
        if (!githubRes.ok) {
            return Response.json({ reply: 'Не удалось получить файл: ' + githubRes.status })
        }
        finalCode = await githubRes.text()
    }

    const selected = MODES.find(m => m.id === mode)
    const res = await fetch('https://text.pollinations.ai/openai', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            model: 'openai',
            messages: [
                { role: 'system', content: selected ? selected.prompt : '' },
                {role: 'user', content: finalCode}
            ]
        })
    })

    const data = await res.json()

    console.log('POLLINATIONS:', JSON.stringify(data, null, 2))

    return Response.json({ reply: data.choices[0].message.content })
}