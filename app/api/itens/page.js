'use client'
import { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"

export default function ListaItens() {
    const [itens, setItens] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3000/api/itens")
            .then(res => setItens(res.data))
            .catch(err => console.error("Erro ao buscar itens", err))
    }, [])

    return (
        <div>
            <h1>Lista de Itens</h1>
            <hr />
            {itens.length === 0 ? (
                <p>Nenhum item encontrado.</p>
            ) : (
                <ul>
                 {itens.map(item => (
                     <li key={item.id}>
                        <Link href={`/api/itens/${item.id}`}>
                            <strong>{item.nome}</strong> - R$ {item.valor}
                        </Link>
                    </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
