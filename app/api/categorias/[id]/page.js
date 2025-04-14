'use client'
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import axios from "axios"

export default function ItensPorCategoria() {
    const { id } = useParams()
    const [itens, setItens] = useState([])

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3000/api/categorias/${id}`)
                .then(res => setItens(res.data))
        }
    }, [id])

    return (
        <div>
            <h1>Itens da Categoria #{id}</h1>
            <ul>
                {itens.map(item => (
                    <li key={item.id}>
                        <Link href={`/itens/${item.id}`}>
                            {item.nome} - R$ {item.valor}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
