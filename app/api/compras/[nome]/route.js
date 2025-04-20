import conexao from "@/app/lib/conexao"

export async function GET(request, {params}){

    const usuario = (await params).nome
    console.log(usuario)

    const query = `SELECT compras.id, usuarios.nome, compras.valor, compras.data, itens.nome AS item, compras.quantidade
                    FROM compras, itens, usuarios WHERE compras.status = 3 AND (compras.id_item = itens.id AND compras.id_usuario = usuarios.id) AND usuarios.nome LIKE ?;
    `
    const [results] = await conexao.execute(query ,  [`%${usuario}%`])
    console.log(results)

        return new Response(
            JSON.stringify(results),
            {
                status: 200,
                headers: { "Content-Type": "application/json" }
            }
        )

}