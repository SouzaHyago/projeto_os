import mysql from 'mysql2/promise'

const conexao = await mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "work2sell"
})

export default conexao