'use client'

import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./cadastro_produtos.css"

function CadastroProdutos() {

    return (  
        <div className="cadastro_produtos">

            <h1>Cadastro de Produtos</h1>

            <form>


                <label>Nome do produto <br/>
                <input required placeholder="Digite o nome do produto" onChange={ (e)=> alteraNomeProduto(e.target.value) } />
                </label> <br/>
        
                <label>Imagem <br/>
                    <input required placeholder="Coloque o link da imagem do produto" onChange={ (e)=> alteraImagem(e.target.value) } />
                </label>

                <label>Descrição <br/>
                <input required placeholder="Digite a descrição do produto" onChange={ (e)=> alteraDescricao(e.target.value) } />
                </label> <br/>

        
                <label>Valor<br/>
                <input required placeholder="Digite o valor" onChange={ (e)=> alteraValor(e.target.value) } />
                </label>
        
                <br/>
        
                <button>Adicionar</button>

            </form>

            <ToastContainer />

        </div>
    );
}

export default CadastroProdutos;