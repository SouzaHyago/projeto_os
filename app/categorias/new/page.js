'use client'
import { useState, useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function NovaCategoria() {
    const [nome, setNome] = useState("")
    const [loading, setLoading] = useState(false)  
    const [error, setError] = useState(null)

    const router = useRouter()

    useEffect(() => {
        const isAdmin = localStorage.getItem("isAdmin")
        if (isAdmin !== "true") {
            alert("Acesso negado: apenas administradores podem criar categorias.")
            router.push("/")
        }
    }, [])

    function cadastrar(e) {
        e.preventDefault()

        if (!nome.trim()) {
            setError('Nome da categoria não pode ser vazio!')
            return
        }

        setLoading(true)
        axios.post("http://localhost:3000/api/categorias", { nome })
            .then(() => {
                alert("Categoria cadastrada!")
                router.push("/")
            })
            .catch(() => {
                setError('Erro ao cadastrar a categoria.')
                setLoading(false)
            })
    }

    return (
        <div className="container">
            <h1>Cadastrar Nova Categoria</h1>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <form onSubmit={cadastrar}>
                <input
                    type="text"
                    placeholder="Nome da categoria"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
                <br />
                <button type="submit" disabled={loading}>Cadastrar</button>
            </form>
        </div>
    )
}
