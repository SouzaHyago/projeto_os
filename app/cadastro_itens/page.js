'use client'

import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import "./cadastro_itens.css"
import axios from "axios"
import host from "../lib/host"
import Menu from "../components/Menu"

function CadastroItens() {

    const [categoria, alteraCategoria] = useState("")
    const [nome, alteraNome] = useState("")
    const [imagem, alteraImagem] = useState("")
    const [descricao, alteraDescricao] = useState("")
    const [valor, alteraValor] = useState(0)
    const [categorias, alteraCategorias] = useState([]) // ✅ Agora é um array

    async function cadastroItens() {

        let valorLocal = valor
        valorLocal = valorLocal.replaceAll(",", ".")

        const obj = {
            id_categoria: categoria,
            nome: nome,
            imagem: imagem,
            descricao: descricao,
            valor: valorLocal
        };

        try {
            const response = await axios.post(host + "itens", obj)
            console.log(response)

            alteraCategoria("")
            alteraNome("")
            alteraImagem("")
            alteraDescricao("")
            alteraValor("")

            toast.success("Item cadastrado com sucesso!")
        } catch (e) {
            toast.error("Erro ao cadastrar item.")
        }
    }

    async function buscaCategorias() {
        try {
            const response = await axios.get(host + "categorias")
            alteraCategorias(response.data)
        } catch (e) {
            console.error("Erro ao buscar categorias", e)
            alteraCategorias([])
        }
    }

    function formataValor(input) {
        let numeros = input.replace(/\D/g, '')
        if (numeros.length === 0) return ''
        let numFormatado = parseFloat(numeros) / 100
        return numFormatado.toFixed(2)
    }

    function inputValor(val) {
        let numFormatado = formataValor(val)
        alteraValor(numFormatado)
    }

    useEffect(() => {
        buscaCategorias()
    }, [])

    return (
        <div className="cadastro_produtos">
            <Menu />

            <h1>Cadastro de Itens</h1>

            <form onSubmit={(e) => { e.preventDefault(); cadastroItens(); }}>

                <label>Selecione a categoria<br />
                    <select onChange={(e) => alteraCategoria(e.target.value)} value={categoria} required>
                        <option value="">Selecione a categoria</option>
                        {Array.isArray(categorias) && categorias.map((i) =>
                            <option key={i.id} value={i.id}>{i.nome}</option>
                        )}
                    </select>
                </label> <br />

                <label>Nome do produto<br />
                    <input required placeholder="Digite o nome do produto" onChange={(e) => alteraNome(e.target.value)} value={nome} />
                </label>

                <label>Imagem<br />
                    <input required placeholder="Coloque o link da imagem do produto" onChange={(e) => alteraImagem(e.target.value)} value={imagem} />
                </label> <br />

                <label>Descrição<br />
                    <input required placeholder="Digite a descrição do produto" onChange={(e) => alteraDescricao(e.target.value)} value={descricao} />
                </label> <br />

                <label>Valor<br />
                    <input required placeholder="0.00" inputMode='numeric' onChange={(e) => inputValor(e.target.value)} value={valor} />
                </label>

                <br />

                <button type="submit">Adicionar</button>

            </form>

            <ToastContainer />
        </div>
    )
}

export default CadastroItens
