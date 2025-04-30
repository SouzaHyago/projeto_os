'use client'
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import Menu from "../components/Menu"
import "./categorias.css"
import host from "../lib/host"

export default function NovaCategoria() {
    const [nome, setNome] = useState("")
    const [erro, setErro] = useState("") // <-- Adicionado aqui
    const router = useRouter()

    async function cadastrar(e) {
        e.preventDefault()

        if (!nome.trim()) {
            setErro("O nome da categoria não pode ser vazio!")
            return
        }

        try {
            await axios.post(host+"categorias", { nome })
            router.push("/")
        } catch {
            setErro("Erro ao cadastrar a categoria.")
        }
    }

    return (
        <div className="categorias">
            <Menu/>
            <h1 className="mt-20">Cadastrar Nova Categoria</h1>
            {erro && <div style={{ color: "red" }}>{erro}</div>}
            <form onSubmit={(e)=> cadastrar(e)}>
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
