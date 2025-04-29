'use client'

import { useEffect, useState } from "react"
import axios from "axios"
// import './.css'
import Menu from "../components/Menu"
import host from "../lib/host"

function Compras() {
    const [pedidos, alteraPedidos] = useState([])

    async function buscaPendentesAndamento() {
        const response = await axios.get(host+"pedidos")
        alteraPedidos(response.data)
    }

    useEffect(() => {
        buscaPendentesAndamento()
    }, []);

    return (
        <div className="pedidos" >

            <div className="menu">
                <Menu/>
            </div>

            <h1>Compras pendentes e em andamento</h1>

            {
                (pedidos.length > 0 && pedidos.status != 3) ?
                    <table>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Usuário</th>
                                <th>Quantidade</th>
                                <th>Valor</th>
                                <th>Data</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                pedidos.map(i =>
                                    <tr key={i.id}>
                                        <td>{i.item}</td>
                                        <td>{i.nome}</td>
                                        <td>{i.quantidade}</td>
                                        <td>{i.valor}</td>
                                        <td>{i.data}</td>
                                        <td>{i.status}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    :
                    <p className="loading">Nenhuma compra pendente ou em andamento</p>
            }
        </div>
    );
}

export default Compras;