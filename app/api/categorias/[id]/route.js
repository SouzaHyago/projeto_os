import conexao from "@/app/lib/conexao"

export async function GET(request, { params }) {
    const id_categoria = params.id

    const query = "SELECT * FROM itens WHERE id_categoria = ?"
    const [results] = await conexao.execute(query, [id_categoria])

    if (results.length === 0) {
        return new Response(JSON.stringify({ message: 'Nenhum item encontrado.' }), {
            status: 404,
            headers: { "Content-Type": "application/json" }
        })
    }

    return new Response(JSON.stringify(results), {
        status: 200,
        headers: { "Content-Type": "application/json" }
    })
}
