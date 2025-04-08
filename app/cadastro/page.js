'use client'

import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./cadastro.css"

function Cadastro() {

    const [ nome, alteraNome ] = useState("")
    const [ email, alteraEmail ] = useState("")
    const [ senha, alteraSenha ] = useState("")
    
    function cadastro(e){
        e.preventDefault()

        const usuarioExistente = JSON.parse(localStorage.getItem(email))

        if (usuarioExistente) {
            toast.error("Este e-mail já está cadastrado.")
            return
        }

        localStorage.setItem("nome", nome)
        localStorage.setItem("email", email)
        localStorage.setItem("senha", senha)

        toast.success("Cadastro realizado com sucesso!")
    }

    return (  
        <div className="cadastro">

            <h1>Cadastro</h1>

            <form onSubmit={ (e)=> cadastro(e) }>

                <label>Nome <br/>
                <input required placeholder="Digite seu nome" onChange={ (e)=> alteraNome(e.target.value) } />
                </label> <br/>
        
                <label>Email <br/>
                <input required placeholder="Digite seu email" onChange={ (e)=> alteraEmail(e.target.value) } />
                </label> <br/>

                {/* <label>CPF<br/>
                <input required placeholder="Digite seu cpf" onChange={ (e)=> alteraCpf(e.target.value) } />
                </label> <br/>

                <label>Telefone/Celular<br/>
                <input required placeholder="Digite seu telefone" onChange={ (e)=> alteraTelefone(e.target.value) } />
                </label> <br/> */}
        
                <label>Senha <br/>
                <input type="password" required placeholder="Digite sua senha" onChange={ (e)=> alteraSenha(e.target.value) } />
                </label>
        
                <br/>
        
                <button>Cadastrar</button>

            </form>

            <p>
                <a href="/login">Voltar</a>
            </p>

            <ToastContainer />

        </div>
    );
}

export default Cadastro;