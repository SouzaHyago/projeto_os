// components/Menu.js
'use client'
import Link from 'next/link'

export default function Menu() {
  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <Link href="/">Início</Link> |{' '}
      <Link href="/categorias/new">Nova Categoria</Link> |{' '}
      <Link href="/itens">Itens</Link> |{' '}
      <Link href="/compras">Compras</Link>
    </nav>

  )
}
