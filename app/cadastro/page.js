'use client'

import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import "./cadastro.css"
import host from "../lib/host"

function Cadastro() {

    const [ nome, alteraNome ] = useState([])
    const [ email, alteraEmail ] = useState([])
    const [ cpf, alteraCpf ] = useState([])
    const [ telefone, alteraTelefone ] = useState([])
    const [ senha, alteraSenha ] = useState([])
    const [ adm, alteraAdm ] = useState(0)
    const [admNovoUsuario, alteraAdmNovoUsuario] = useState("Não")

    async function cadastro(){

        const obj = {
            nome: nome,
            email: email,
            cpf: cpf,
            telefone: telefone,
            senha: senha,
            adm: admNovoUsuario == "Sim" ? 1 : 0
        }
    
        try{

            const response = await axios.post(host+"usuarios", obj)
            console.log(response)

            alteraNome("")
            alteraEmail("")
            alteraCpf("")
            alteraTelefone("")
            alteraSenha("")

            window.location.href = "/login"


        }catch(e){
            
            toast.error("Email ou CPF já existentes...")
            
        }
        

    }

    async function verificarAdm(){

        const usuario = JSON.parse(localStorage.getItem('usuario'))

        if (usuario && usuario.adm == 1) {
            alteraAdm(1)
        } else {
            alteraAdm(0)
        }

    }


    useEffect(() => {
        verificarAdm()
    }, [])

    return (  
        <div className="cadastro">

            <h1>Cadastro</h1>

            <form onSubmit={(e) => { e.preventDefault(); cadastro(); }}>

                <label>Nome <br/>
                <input required placeholder="Digite seu nome" onChange={ (e)=> alteraNome(e.target.value) } value={nome} />
                </label> <br/>
        
                <label>Email <br/>
                <input required type="email" placeholder="Digite seu email" onChange={ (e)=> alteraEmail(e.target.value) } value={email} />
                </label> <br/>

                <label>CPF<br/>
                <input required type="phone" placeholder="Digite seu cpf" onChange={ (e)=> alteraCpf(e.target.value) } value={cpf} />
                </label> <br/>

                <label>Telefone/Celular<br/>
                <input required type="phone" placeholder="Digite seu telefone" onChange={ (e)=> alteraTelefone(e.target.value) } value={telefone} />
                </label> <br/>
        
                <label>Senha <br/>
                <input type="password" required placeholder="Digite sua senha" onChange={ (e)=> alteraSenha(e.target.value) } value={senha} />
                </label><br/>
        
                {
                    adm == 1 &&
                    <>
                        <label>Deseja cadastrar um administrador?</label>
                        <div className="adm-options">
                            <label>
                                <input 
                                    type="radio" 
                                    name="adm" 
                                    value="Sim" 
                                    checked={admNovoUsuario === "Sim"}
                                    onChange={(e)=> alteraAdmNovoUsuario(e.target.value)} 
                                />
                                Sim
                            </label>
            
                            <label>
                                <input 
                                    type="radio" 
                                    name="adm" 
                                    value="Não" 
                                    checked={admNovoUsuario === "Não"}
                                    onChange={(e)=> alteraAdmNovoUsuario(e.target.value)} 
                                />
                                Não
                            </label>
                        </div>
                    </>
                }
        
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