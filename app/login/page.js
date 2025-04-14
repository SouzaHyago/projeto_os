'use client'

import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from "axios"
import "./login.css"
import host from "../lib/host"

function Login() {

    const [usuarios, alteraUsuarios] = useState([])
    const [email, alteraEmail] = useState("")
    const [senha, alteraSenha] = useState("")

    useEffect(() => {
        buscaUsuarios()
    }, []);

    async function buscaUsuarios() {
        try {
            const response = await axios.get(host+"usuarios")
            alteraUsuarios(response.data)
        } catch (error) {
            toast.error("Erro ao buscar usuários.")
        }
    }

    function login(e) {
        e.preventDefault()

        const usuarioEncontrado = usuarios.find(
            (usuario) => usuario.email == email && usuario.senha == senha
        )

        if (usuarioEncontrado) {

            localStorage.setItem('usuario', JSON.stringify({
                email: usuarioEncontrado.email,
                adm: usuarioEncontrado.adm
            }))

            // Futuramente colocar um window.location.href para direcionar para o página inicial
            toast.success("Login realizado com sucesso!")
            alteraEmail("")
            alteraSenha("")



        } else {
            toast.error("Usuário ou senha incorretos.")
        }

    }


    return ( 
        <div className="login">

            <h1>Login</h1>

            <form onSubmit={ (e)=> login(e) }>
        
                <label>Email <br/>
                <input required placeholder="Digite seu email" onChange={ (e)=> alteraEmail(e.target.value) } value={email} />
                </label> <br/>
        
                <label>Senha <br/>
                <input type="password" required placeholder="Digite sua senha" onChange={ (e)=> alteraSenha(e.target.value) } value={senha} /><br/>
                </label>
        
                <button>Entrar</button><br/>
                
            </form>
            
            <p>
                Não possui login?
                <a href="/cadastro"> Cadastre-se</a>
            </p>

            <ToastContainer />

        </div>
        
    );
}

export default Login;