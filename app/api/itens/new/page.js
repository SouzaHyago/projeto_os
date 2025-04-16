'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function NovoItem() {
  const [categorias, setCategorias] = useState([])
  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")
  const [valor, setValor] = useState("")
  const [idCategoria, setIdCategoria] = useState("")
  const router = useRouter()

  useEffect(() => {
    axios.get("http://localhost:3000/api/categorias")
      .then(res => setCategorias(res.data))
  }, [])

  function cadastrar(e) {
    e.preventDefault()
    axios.post("http://localhost:3000/api/itens", {
      nome, descricao, valor, id_categoria: idCategoria
    }).then(() => {
      alert("Item cadastrado!")
      router.push("/itens")
    }).catch(() => alert("Erro ao cadastrar item."))
  }

  return (
    <div>
      <h1>Cadastrar Novo Item</h1>
      <form onSubmit={cadastrar}>
        <input type="text" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} required />
        <br />
        <textarea placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} required />
        <br />
        <input type="number" placeholder="Valor" value={valor} onChange={e => setValor(e.target.value)} required />
        <br />
        <select value={idCategoria} onChange={e => setIdCategoria(e.target.value)} required>
          <option value="">Selecione uma categoria</option>
          {categorias.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.nome}</option>
          ))}
        </select>
        <br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  )
}
