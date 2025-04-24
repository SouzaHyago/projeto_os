'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function ItensPage() {
  const [itens, setItens] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)

    axios.get(host+'itens')
      .then(res => {
        setItens(res.data)
        setLoading(false)
      })
      .catch(err => {
        setError('Erro ao carregar itens')
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div className="text-white text-center mt-20 text-xl">Carregando...</div>
  }

  if (error) {
    return <div className="text-red-400 text-center mt-20 text-lg">{error}</div>
  }

  return (
    <div className="container min-h-screen pt-20 px-6">
      <h1 className="text-3xl text-white font-bold mb-6">Todos os Itens</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
        {itens.length > 0 ? (
          itens.map(item => (
            <li key={item.id} className="bg-white/10 backdrop-blur-lg p-4 rounded-xl border border-white/10 shadow-md hover:bg-white/20 transition">
              <h2 className="text-lg font-semibold">{item.nome}</h2>
              <p className="text-sm text-gray-200">{item.descricao}</p>
              <p className="mt-2 font-bold text-indigo-200">R$ {Number(item.valor).toFixed(2)}</p>
            </li>
          ))
        ) : (
          <li>Nenhum item encontrado.</li>
        )}
      </ul>
    </div>
  )
}
