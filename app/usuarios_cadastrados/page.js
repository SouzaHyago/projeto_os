'use client'

import { useEffect, useState } from "react"
import axios from "axios"
import './usuarios_cadastrados.css'
import Menu from "../components/Menu"

function Usuarios() {

    const [usuarios, alteraUsuarios] = useState([])

    async function buscaTodos() {
        const response = await axios.get("http://localhost:3000/api/usuarios")
        alteraUsuarios(response.data)
    }

    useEffect(() => {
        buscaTodos()
    }, []);

    return (
        <div id="usuarios" className="container" >

            <div className="menu">
                <Menu/>
            </div>

            <h1>Usuários cadastrados no sistema</h1>

            {
                usuarios.length > 0 ?
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>CPF</th>
                                <th>Telefone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                usuarios.map(i =>
                                    <tr key={i.id}>
                                        <td>{i.id}</td>
                                        <td>{i.nome}</td>
                                        <td>{i.email}</td>
                                        <td>{i.cpf}</td>
                                        <td>{i.telefone}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    :
                    <p className="loading">Carregando...</p>
            }
        </div>
    );
}

export default Usuarios;
