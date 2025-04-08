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