import conexao from "@/app/lib/conexao";




export async function GET(request,{params}) {
    const id = await(params)
    
    console.log("sdnsjand: "+(id.obj))
    `
        SELECT u.nome,u.email,u.cpf,u.telefone, i.nome AS produto, i.descricao, c.valor
        FROM usuarios u, compras c, itens i
        WHERE (i.id = ? AND u.id = ?) AND c.id = ?;
    `

    const [results] = conexao.execute(
        query,
        [
            body.idItem,
            body.idUsuario,
            body.idCompra
        ]
    )

    
    return new Response(
        JSON.stringify(id),
        {
            status: 200,
            headers: {'Content-Type': 'application/json'}    
        }
    )
}