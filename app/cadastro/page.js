'use client'

import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import "./cadastro.css"

function Cadastro() {

    const [ nome, alteraNome ] = useState([])
    const [ email, alteraEmail ] = useState([])
    const [ cpf, alteraCpf ] = useState([])
    const [ telefone, alteraTelefone ] = useState([])
    const [ senha, alteraSenha ] = useState([])

    async function cadastro(){

        const obj = {
            nome: nome,
            email: email,
            cpf: cpf,
            telefone: telefone,
            senha: senha
        }
    
        try{

            const response = await axios.post("http://localhost:3000/api/usuarios", obj)
            console.log(response)

            alteraNome("")
            alteraEmail("")
            alteraCpf("")
            alteraTelefone("")
            alteraSenha("")

            window.location.href = "/login";


        }catch(e){
            
            toast.error("Email ou CPF já existentes...")
            
        }
        

    }

    return (  
        <div className="cadastro">

            <h1>Cadastro</h1>

            <form onSubmit={(e) => { e.preventDefault(); cadastro(); }}>

                <label>Nome <br/>
                <input required placeholder="Digite seu nome" onChange={ (e)=> alteraNome(e.target.value) } value={nome} />
                </label> <br/>
        
                <label>Email <br/>
                <input required placeholder="Digite seu email" onChange={ (e)=> alteraEmail(e.target.value) } value={email} />
                </label> <br/>

                <label>CPF<br/>
                <input required placeholder="Digite seu cpf" onChange={ (e)=> alteraCpf(e.target.value) } value={cpf} />
                </label> <br/>

                <label>Telefone/Celular<br/>
                <input required placeholder="Digite seu telefone" onChange={ (e)=> alteraTelefone(e.target.value) } value={telefone} />
                </label> <br/>
        
                <label>Senha <br/>
                <input type="password" required placeholder="Digite sua senha" onChange={ (e)=> alteraSenha(e.target.value) } value={senha} />
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