'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Menu from './components/Menu'

export default function Home() {
  const [categorias, setCategorias] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/api/categorias')
      .then(res => setCategorias(res.data))
      .catch(() => alert("Erro ao carregar categorias"))
  }, [])

  return (
    <div style={{ padding: '20px' }}>

      <Menu/>
    
      <Link href="/itens">Ver todos os itens</Link>
      <br />
      <Link href="/api/categorias/new">Nova Categoria</Link>
      <h2>Categorias</h2>
      <ul>
        {categorias.map(cat => (
          <li key={cat.id}>
            <Link href={`/api/categorias/${cat.id}`}>
              {cat.nome}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
