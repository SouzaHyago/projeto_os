import conexao from "@/app/lib/conexao"

export async function GET(request, { params }) {
    const id = params.id
    const query = `SELECT * FROM itens WHERE id = ?;`
    const [results] = await conexao.execute(query, [id])

    return new Response(JSON.stringify(results[0] || {}), { status: 200 })
}

export async function PUT(request, { params }) {
    const id = (await params).id
    console.log(id);
    const body = await request.json()
    const { nome, imagem, descricao, valor, id_categoria } = body

    const query = `
        UPDATE itens 
        SET nome = ?, imagem = ?, descricao = ?, valor = ?, id_categoria = ?
        WHERE id = ?;
    `
    await conexao.execute(query, [nome, imagem, descricao, valor, id_categoria,id])

    return new Response(JSON.stringify({ msg: "Item atualizado com sucesso!" }), { status: 200 })
}

export async function DELETE(request, { params }) {
    const id = params.id
    const query = `DELETE FROM itens WHERE id = ?;`
    await conexao.execute(query, [id])

    return new Response(JSON.stringify({ msg: "Item excluído com sucesso!" }), { status: 200 })
}
