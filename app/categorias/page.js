'use client'
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import Menu from "../components/Menu"

export default function NovaCategoria() {
    const [nome, setNome] = useState("")
    const [erro, setErro] = useState(null)
    const router = useRouter()

    async function cadastrar(e) {
        e.preventDefault()

        if (!nome.trim()) {
            setErro("O nome da categoria não pode ser vazio!")
            return
        }

        try {
            await axios.post("http://localhost:3000/api/categorias", { nome })
            alert("Categoria cadastrada!")
            router.push("/")
        } catch {
            setErro("Erro ao cadastrar a categoria.")
        }
    }

    return (
        <div>
            <Menu/>
            <h1 className="mt-20">Cadastrar Nova Categoria</h1>
            {erro && <div style={{ color: "red" }}>{erro}</div>}
            <form onSubmit={cadastrar}>
                <input
                    type="text"
                    placeholder="Nome da categoria"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
                <br />
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    )
}
