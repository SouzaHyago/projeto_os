'use client'
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios"

export default function ItensPorCategoria() {
  const { id } = useParams()
  const [categoria, setCategoria] = useState(null)
  const [itens, setItens] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)

    // Busca a categoria
    axios.get(`http://localhost:3000/api/categorias/${id}`)
      .then(res => setCategoria(res.data))
      .catch(() => setError('Erro ao carregar a categoria'))

    // Busca os itens da categoria
    axios.get(`http://localhost:3000/api/itens?categoriaId=${id}`)
      .then(res => {
        setItens(res.data)
        setLoading(false)
      })
      .catch(() => {
        setError('Erro ao carregar os itens.')
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return <div className="loading">Carregando...</div>
  }

  if (error) {
    return <div className="loading">{error}</div>
  }

  return (
    <div className="container">
      <h1 className="category-title">
        Itens da Categoria: {categoria?.nome || 'Categoria não encontrada'}
      </h1>
      <ul>
        {itens.length > 0 ? (
          itens.map(item => (
            <li key={item.id}>
              <strong>{item.nome}</strong><br />
              <span>{item.descricao}</span><br />
              <span>Preço: R$ {item.valor}</span>
            </li>
          ))
        ) : (
          <li>Nenhum item encontrado nesta categoria.</li>
        )}
      </ul>
    </div>
  )
}
