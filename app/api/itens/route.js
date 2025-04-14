import conectar from "@/app/lib/conexao"

export async function GET() {
    try {
        const conexao = await conectar()
        const [results] = await conexao.execute("SELECT * FROM itens;")

        return new Response(JSON.stringify(results), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        })
    } catch (erro) {
        console.error("Erro ao buscar itens:", erro)
        return new Response("Erro ao buscar itens", { status: 500 })
    }
}

export async function POST(request) {
    try {
        const body = await request.json()
        const conexao = await conectar()

        const query = `INSERT INTO itens(id_categoria, nome, descricao, valor) VALUES (?, ?, ?, ?);`

        const [results] = await conexao.execute(query, [
            body.id_categoria,
            body.nome,
            body.descricao,
            body.valor
        ])

        return new Response(JSON.stringify({ id: results.insertId }), {
            status: 201,
            headers: { "Content-Type": "application/json" }
        })
    } catch (erro) {
        console.error("Erro ao inserir item:", erro)
        return new Response("Erro ao inserir item", { status: 500 })
    }
}
