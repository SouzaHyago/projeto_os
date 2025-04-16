import conexao from "@/app/lib/conexao"

export async function GET(request, { params }) {
    const id_categoria = params.id

    const query = "SELECT * FROM itens WHERE id_categoria = ?"
    const [results] = await conexao.execute(query, [id_categoria])

    return new Response(JSON.stringify(results), {
        status: 200,
        headers: { "Content-Type": "application/json" }
    })
}
