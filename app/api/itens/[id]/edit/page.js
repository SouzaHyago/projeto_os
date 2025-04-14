'use client'
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import axios from "axios"

export default function EditarItem() {
    const { id } = useParams()
    const router = useRouter()

    const [nome, setNome] = useState("")
    const [descricao, setDescricao] = useState("")
    const [valor, setValor] = useState("")
    const [idCategoria, setIdCategoria] = useState("")
    const [categorias, setCategorias] = useState([])

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3000/api/itens/${id}`)
                .then(res => {
                    const item = res.data
                    setNome(item.nome)
                    setDescricao(item.descricao)
                    setValor(item.valor)
                    setIdCategoria(item.id_categoria)
                })

            axios.get("http://localhost:3000/api/categorias")
                .then(res => setCategorias(res.data))
        }
    }, [id])

    function atualizar(e) {
        e.preventDefault()

        axios.put(`http://localhost:3000/api/itens/${id}`, {
            nome,
            descricao,
            valor,
            id_categoria: idCategoria
        }).then(() => {
            alert("Item atualizado com sucesso!")
            router.push(`/itens/${id}`)
        }).catch(() => alert("Erro ao atualizar o item."))
    }

    return (
        <div>
            <h1>Editar Item #{id}</h1>
            <form onSubmit={atualizar}>
                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
                <br />
                <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
                <br />
                <input type="number" value={valor} onChange={(e) => setValor(e.target.value)} required />
                <br />
                <select value={idCategoria} onChange={(e) => setIdCategoria(e.target.value)} required>
                    <option value="">Selecione uma categoria</option>
                    {categorias.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.nome}</option>
                    ))}
                </select>
                <br />
                <button type="submit">Salvar Alterações</button>
            </form>
        </div>
    )
}
