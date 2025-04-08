import conexao from "@/app/lib/conexao"

export async function GET() {
    const query = `SELECT * FROM itens;`
    const [results] = await conexao.execute(query)

    return new Response(JSON.stringify(results), {
        status: 200,
        headers: { "Content-Type": "application/json" }
    })
}

export async function POST(request) {
    const body = await request.json()
    const { nome, descricao, valor, id_categoria } = body

    const query = `
        INSERT INTO itens (nome, descricao, valor, id_categoria)
        VALUES (?, ?, ?, ?);
    `
    await conexao.execute(query, [nome, descricao, valor, id_categoria])

    return new Response(JSON.stringify({ msg: "Item criado com sucesso!" }), { status: 201 })
}
