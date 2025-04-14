'use client'
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function NovaCategoria() {
    const [nome, setNome] = useState("")
    const router = useRouter()

    function cadastrar(e) {
        e.preventDefault()

        axios.post("http://localhost:3000/api/categorias", { nome })
            .then(() => {
                alert("Categoria cadastrada!")
                router.push("/")
            }).catch(() => alert("Erro ao cadastrar."))
    }

    return (
        <div>
            <h1>Cadastrar Nova Categoria</h1>
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
