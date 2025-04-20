'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Home() {
  const [categorias, setCategorias] = useState([])
  const [itens, setItens] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/api/categorias')
      .then(res => setCategorias(res.data))
      .catch(() => alert("Erro ao carregar categorias"))
  }, [])

  useEffect(() => {
    axios.get('http://localhost:3000/api/itens')
      .then(res => setItens(res.data))
      .catch(() => alert("Erro ao carregar itens"))
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white flex items-center justify-center p-4">
      <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl shadow-xl w-full max-w-4xl p-8">
        <h1 className="text-4xl font-bold text-center mb-6">Bem-vindo à Loja</h1>

        <div className="flex justify-center gap-4 mb-6">
          <Link href="/itens">
            <button className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl transition font-semibold">
              Ver todos os itens
            </button>
          </Link>
          <Link href="/categorias/new">
            <button className="px-5 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl transition font-semibold">
              Nova Categoria
            </button>
          </Link>
        </div>

        <h2 className="text-2xl font-semibold border-b border-white/10 pb-2 mb-4">Categorias</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 text-sm">
          {categorias.map(cat => (
            <li key={cat.id} className="bg-white/10 rounded-lg p-3 hover:bg-white/20 transition">
              <Link href={`/categorias/${cat.id}`} className="block text-center">{cat.nome}</Link>
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-semibold border-b border-white/10 pb-2 mb-4">Itens em destaque</h2>
        <ul className="space-y-3 text-sm">
          {itens.slice(0, 5).map(item => (
            <li key={item.id} className="bg-white/10 rounded-lg p-4 flex justify-between items-center hover:bg-white/20 transition">
              <span className="font-medium">{item.nome}</span>
              <span className="text-green-300">R$ {Number(item.preco).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
