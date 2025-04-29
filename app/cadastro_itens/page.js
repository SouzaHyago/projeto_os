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
    const [nome, alteraNome] = useState([])
    const [ imagem, alteraImagem ] = useState([])
    const [descricao, alteraDescricao] = useState([])
    const [valor, alteraValor] = useState([]);
    const [categorias, alteraCategorias] = useState([])

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
            const response = await axios.post(host+"itens", obj)
            console.log(response)

            alteraCategoria("")
            alteraNome("")
            alteraImagem("")
            alteraDescricao("")
            alteraValor("")

        } catch (e) {
            
        }
    }

    async function buscaCategorias() {
        const response = await axios.get(host+"categorias")
        alteraCategorias(response.data)
    }

    useEffect(() => {
        buscaCategorias()
    }, [])

    return (
        <div className="cadastro_produtos">
            <Menu/>

            <h1>Cadastro de Itens</h1>

            <form onSubmit={(e) => { e.preventDefault(); cadastroItens(); }} >

                <label>Selecione a categoria<br/>
                    <select onChange={(e) => alteraCategoria(e.target.value)} value={categoria}>
                        <option>Selecione a categoria</option>
                        {categorias.map((i) =>
                            <option key={i.id} value={i.id}>{i.nome}</option>
                        )}
                    </select>
                </label> <br/>

                <label>Nome do produto<br />
                    <input required placeholder="Digite o nome do produto" onChange={(e) => alteraNome(e.target.value)} value={nome} />
                </label>

                <label>Imagem<br />
                    <input required placeholder="Coloque o link da imagem do produto" onChange={(e) => alteraImagem(e.target.value)} value={imagem} />
                </label> <br/>

                <label>Descrição<br />
                    <input required placeholder="Digite a descrição do produto" onChange={(e) => alteraDescricao(e.target.value)} value={descricao} />
                </label> <br/>

                <label>Valor<br />
                    <input required placeholder="Digite o valor" onChange={(e) => alteraValor(e.target.value)} value={valor} />
                </label>

                <br/>

                <button>Adicionar</button>

            </form>

            <ToastContainer />

        </div>
    )
}

export default CadastroItens;
