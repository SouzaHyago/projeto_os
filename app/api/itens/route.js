import conexao from "@/app/lib/conexao"

export async function GET() {
    const query = `SELECT * FROM itens;`
    const [results] = await conexao.execute(query)

    return new Response(JSON.stringify(results), {
        status: 200,
        headers: { "Content-Type": "application/json" }
    })
}

export async function POST( request ){

    const body = await request.json()
    const query = `INSERT INTO itens(id_categoria, nome, descricao, valor) VALUES (?, ?, ?, ?);`

    const [results] = await conexao.execute(
        query,
        [body.id_categoria, body.nome, body.descricao, body.valor]
    )

    return new Response( JSON.stringify(results.insertId) )

}
