import conexao from "@/app/lib/conexao";



//enviar com {params: obj   }
export async function GET(request) {
    const body = new URL (await request.url);
    const params = Object.fromEntries(body.searchParams.entries());
   const query = `
        SELECT u.nome,u.email,u.cpf,u.telefone, i.nome AS produto, i.descricao, i.valor AS valorItem, c.valor, c.quantidade ,cat.nome AS categoria
        FROM usuarios u, compras c, itens i, categorias cat
        WHERE ((i.id = ? AND u.id = ?) AND c.id = ?) AND i.id_categoria = cat.id;
    `

    const [results] = await conexao.execute(
        query,
        [
            params.idItem,
            params.idUsuario,
            params.idCompra
        ]
    )

    
    return new Response(
        JSON.stringify(results),
        {
            status: 200,
            headers: {'Content-Type': 'application/json'}    
        }
    )
}