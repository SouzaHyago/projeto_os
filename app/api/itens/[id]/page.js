'use client'
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios"

export default function ItemDetalhes() {
    const { id } = useParams()
    const [item, setItem] = useState(null)

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3000/api/itens/${id}`)
                .then(res => setItem(res.data))
                .catch(err => console.error("Erro ao buscar item", err))
        }
    }, [id])

    return (
        <div>
            <h1>Detalhes do Item - ID {id}</h1>
            <hr />
            {item ? (
                <div>
                    <p><strong>Nome:</strong> {item.nome}</p>
                    <p><strong>Descrição:</strong> {item.descricao}</p>
                    <p><strong>Valor:</strong> R$ {item.valor}</p>
                    <p><strong>ID da Categoria:</strong> {item.id_categoria}</p>
                </div>
            ) : (
                <p>Carregando item...</p>
            )}
        </div>
    )
}
