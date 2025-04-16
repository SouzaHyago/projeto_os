'use client'
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import axios from "axios"

export default function NovaCompra() {
  const [item, setItem] = useState(null)
  const [quantidade, setQuantidade] = useState(1)
  const [descricao, setDescricao] = useState("")
  const searchParams = useSearchParams()
  const router = useRouter()
  const id = searchParams.get("id")

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/api/itens/${id}`)
        .then(res => setItem(res.data))
    }
  }, [id])

  function comprar(e) {
    e.preventDefault()
    axios.post("http://localhost:3000/api/compras", {
      id_item: item.id,
      id_usuario: 1, // fixo por enquanto
      stats: 3,
      descricao,
      quantidade,
      valorItem: item.valor
    }).then(() => {
      alert("Compra realizada!")
      router.push("/")
    }).catch(() => alert("Erro ao comprar."))
  }

  if (!item) return <p>Carregando item...</p>

  return (
    <div>
      <h1>Comprar: {item.nome}</h1>
      <form onSubmit={comprar}>
        <p>Valor Unitário: R$ {item.valor}</p>
        <input type="number" value={quantidade} min="1" onChange={e => setQuantidade(e.target.value)} required />
        <br />
        <textarea placeholder="Descrição da compra" value={descricao} onChange={e => setDescricao(e.target.value)} />
        <br />
        <button type="submit">Finalizar Compra</button>
      </form>
    </div>
  )
}
