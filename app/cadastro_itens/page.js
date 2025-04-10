'use client'

import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./cadastro_itens.css"
import axios from "axios";

function CadastroItens() {

    const [ categoria, alteraCategoria ] = useState([])
    const [ nome, alteraNome ] = useState([])
    const [ descricao, alteraDescricao ] = useState([])
    const [ valor, alteraValor ] = useState([])
    

    async function cadastroItens(){

        const obj = {
            categoria: categoria,
            nome: nome,
            descricao: descricao,
            valor:valor
        }

        const response = await axios.post("http://localhost:3000/api/itens", obj)
        console.log(response)

        alteraCategoria("")
        alteraNome("")
        alteraDescricao("")
        alteraValor("")

    }

    return (  
        <div className="cadastro_produtos">

            <h1>Cadastro de Itens</h1>

            <form onSubmit={(e) => { e.preventDefault(); cadastroItens(); }} >

                <label>Categoria<br/>
                <input required placeholder="Digite a categoria do produto" onChange={ (e)=> alteraCategoria(e.target.value) } value={categoria} />
                </label> <br/>
        
                <label>Nome do produto<br/>
                    <input required placeholder="Digite o nome do produto" onChange={ (e)=> alteraNome(e.target.value) } value={nome}  />
                </label>

                <label>Descrição<br/>
                <input required placeholder="Digite a descrição do produto" onChange={ (e)=> alteraDescricao(e.target.value) } value={descricao} />
                </label> <br/>

        
                <label>Valor<br/>
                <input required placeholder="Digite o valor" onChange={ (e)=> alteraValor(e.target.value) } value={valor} />
                </label>
        
                <br/>
        
                <button>Adicionar</button>

            </form>

            <ToastContainer />

        </div>
    );
}

export default CadastroItens;