'use client'
import { useState, useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function NovoItem() {
    const [nome, setNome] = useState("")
    const [preco, setPreco] = useState("")
    const [categoriaId, setCategoriaId] = useState("")
    const [categorias, setCategorias] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const router = useRouter()

    useEffect(() => {
        const isAdmin = localStorage.getItem("isAdmin")
        if (isAdmin !== "true") {
            alert("Acesso negado: apenas administradores podem criar itens.")
            router.push("/")
        }

        axios.get("http://localhost:3000/api/categorias")
            .then(res => setCategorias(res.data))
            .catch(() => setError("Erro ao carregar categorias"))
    }, [])

    function cadastrar(e) {
        e.preventDefault()

        if (!nome.trim() || !preco || !categoriaId) {
            setError("Todos os campos devem ser preenchidos!")
            return
        }

        setLoading(true)
        axios.post("http://localhost:3000/api/itens", {
            nome,
            preco: parseFloat(preco),
            categoriaId
        })
        .then(() => {
            alert("Item cadastrado com sucesso!")
            router.push("/")
        })
        .catch(() => {
            setError("Erro ao cadastrar item.")
            setLoading(false)
        })
    }

    return (
        <div className="container">
            <h1>Cadastrar Novo Item</h1>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <form onSubmit={cadastrar}>
                <input
                    type="text"
                    placeholder="Nome do item"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
                <br />
                <input
                    type="number"
                    step="0.01"
                    placeholder="Preço"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                    required
                />
                <br />
                <select
                    value={categoriaId}
                    onChange={(e) => setCategoriaId(e.target.value)}
                    required
                >
                    <option value="">Selecione a categoria</option>
                    {categorias.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.nome}</option>
                    ))}
                </select>
                <br />
                <button type="submit" disabled={loading}>Cadastrar</button>
            </form>
        </div>
    )
}
