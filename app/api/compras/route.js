import conexao from "@/app/lib/conexao"



export async function POST(request) {
    const body = await request.json()

    const query = `
        INSERT INTO compras (id_item,id_usuario,status,descricao,quantidade,valor)
            VALUES (?, ?, ?, ?, ?, ?);
    `
    const [results] = await conexao.execute(
        query,
        [
            body.id_item,
            body.id_usuario,
            body.stats,
            body.descricao,
            body.quantidade,
            body.valorItem * body.quantidade
        ]
    );

    return new Response(
        JSON.stringify(results),
        {
            status: 201,
            headers: {'Content-Type': 'application/json'}    
        }
    )
}

export async function GET(){

    const query = `SELECT compras.id, usuarios.nome, compras.valor, compras.data, itens.nome AS item, compras.quantidade
                    FROM compras, itens, usuarios WHERE compras.status = 3 AND (compras.id_item = itens.id AND compras.id_usuario = usuarios.id);
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


