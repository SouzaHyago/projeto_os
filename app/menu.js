'use client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function Menu() {
  const searchParams = useSearchParams()
  const isAdmin = searchParams.get('admin') === '1'

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white/10 backdrop-blur-lg border-b border-white/10 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between text-white">
        <div className="flex gap-6 font-semibold text-sm">
          <Link href="/" className="hover:text-indigo-300 transition">Início</Link>
          <Link href="/itens" className="hover:text-indigo-300 transition">Itens</Link>
          <Link href="/compras" className="hover:text-indigo-300 transition">Compras</Link>
          {isAdmin && (
            <Link href="/categorias/new?admin=1" className="hover:text-purple-300 transition">
              Nova Categoria
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
