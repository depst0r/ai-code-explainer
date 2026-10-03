export async function POST(req: Request) {
    const { code } = await req.json()
    const res = await fetch('https://text.pollinations.ai/openai', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            model: 'openai',
            messages: [
                {role: 'system', content: 'Ты объясняешь код понятным языком'},
                {role: 'user', content: code}
            ]
        })
    })

    const data = await res.json()
    return Response.json({ reply: data.choices[0].message.content })
}