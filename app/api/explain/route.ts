import { MODES } from "@/app/lib/modes"

export async function POST(req: Request) {
    const { code, mode } = await req.json()
    const selected = MODES.find(m => m.id === mode)
    const res = await fetch('https://text.pollinations.ai/openai', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            model: 'openai',
            messages: [
                { role: 'system', content: selected ? selected.prompt : '' },
                {role: 'user', content: code}
            ]
        })
    })

    const data = await res.json()

    console.log('POLLINATIONS:', JSON.stringify(data, null, 2))

    return Response.json({ reply: data.choices[0].message.content })
}