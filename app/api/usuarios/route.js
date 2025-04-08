import conexao from "@/app/lib/conexao"

export async function POST( request ){

    const body = await request.json()
    const query = `INSERT INTO usuarios(nome, email, senha, cpf, telefone) VALUES (?, ?, ?, ?, ?)`

    const [results] = await conexao.execute(
        query,
        [body.nome, body.email, body.senha, body.cpf, body.telefone]
    )

    return new Response( JSON.stringify(results.insertId) )

}