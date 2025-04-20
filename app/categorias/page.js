'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'

export default function ItensDaCategoria() {
  const [itens, setItens] = useState([])
  const [categoria, setCategoria] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    setLoading(true)

    axios.get(`http://localhost:3000/api/itens?categoriaId=${id}`)
      .then(res => setItens(res.data))
      .catch(() => setError('Erro ao carregar itens'))

    axios.get(`http://localhost:3000/api/categorias/${id}`)
      .then(res => {
        setCategoria(res.data)
        setLoading(false)
      })
      .catch(() => {
        setError('Erro ao carregar categoria')
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return <div className="loading">Carregando...</div>
  }

  if (error) {
    return <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{error}</div>
  }

  return (
    <div className="container">
      <h1 className="category-title">Itens da Categoria: {categoria?.nome || 'Categoria não encontrada'}</h1>
      <ul>
        {itens.length > 0 ? (
          itens.map(item => (
            <li key={item.id}>
              <strong>{item.nome}</strong><br />
              <span>{item.descricao}</span><br />
              <span>R$ {Number(item.valor).toFixed(2)}</span>
            </li>
          ))
        ) : (
          <li>Nenhum item encontrado nesta categoria.</li>
        )}
      </ul>
    </div>
  )
}
