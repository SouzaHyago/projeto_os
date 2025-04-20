import conexao from "@/app/lib/conexao"

export async function GET() {
    const query = "SELECT * FROM categorias"
    const [results] = await conexao.execute(query)

    return new Response(JSON.stringify(results), { status: 200 })
}

export async function POST(request) {
    const body = await request.json()

    const queryCheck = "SELECT COUNT(*) as count FROM categorias WHERE nome = ?"
    const [checkResults] = await conexao.execute(queryCheck, [body.nome])

    if (checkResults[0].count > 0) {
        return new Response(JSON.stringify({ msg: "Categoria já existe!" }), { status: 400 })
    }

    const query = "INSERT INTO categorias (nome) VALUES (?);"
    await conexao.execute(query, [body.nome])

    return new Response(JSON.stringify({ msg: "Categoria criada com sucesso!" }), { status: 201 })
}
