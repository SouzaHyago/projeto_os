import conexao from "@/app/lib/conexao"

export async function GET(){

    const query = `SELECT compras.id, usuarios.nome, compras.valor, compras.data, itens.nome AS item, compras.quantidade, compras.status
                    FROM compras, itens, usuarios WHERE compras.status != 3 AND (compras.id_item = itens.id AND compras.id_usuario = usuarios.id) ORDER BY compras.data ;
    `
    const [results] = await conexao.execute(query)

        return new Response(
            JSON.stringify(results),
            {
                status: 200,
                headers: { "Content-Type": "application/json" }
            }
        )

}