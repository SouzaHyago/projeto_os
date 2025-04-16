'use client'
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios"

export default function ItensPorCategoria() {
  const { id } = useParams()
  const [itens, setItens] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:3000/api/categorias/${id}`)
      .then(res => setItens(res.data))
      .catch(err => console.error("Erro ao carregar os itens:", err))
  }, [id])

  return (
    <div style={{ padding: "20px" }}>
      <h1>Itens da Categoria {id}</h1>
      <ul>
        {itens.map(item => (
          <li key={item.id} style={{ marginBottom: "10px" }}>
            <strong>{item.nome}</strong><br />
            <span>{item.descricao}</span><br />
            <span>Preço: R$ {item.valor}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
