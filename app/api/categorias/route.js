import conexao from "@/app/lib/conexao"

export async function GET() {
    const query = `SELECT * FROM categorias;`
    const [results] = await conexao.execute(query)

    return new Response(JSON.stringify(results), { status: 200 })
}

export async function POST(request) {
    const body = await request.json()

    const query = `INSERT INTO categorias (nome) VALUES (?);`
    await conexao.execute(query, [body.nome])

    return new Response(JSON.stringify({ msg: "Categoria criada com sucesso!" }), { status: 201 })
}
