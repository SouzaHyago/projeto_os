'use client'

import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./login.css"

function Login() {

    const [ email, alteraEmail ] = useState("")
    const [ senha, alteraSenha ] = useState("")

    function login(e){
        e.preventDefault();

        let emailSalvo = localStorage.getItem("email")
        let senhaSalva = localStorage.getItem("senha")

        if (email == emailSalvo && senha == senhaSalva) {
            alert("Login realizado com sucesso!")
        } else {
            toast.error("Usuário ou senha incorretos.")
        }

    }

    return ( 
        <div className="login">

            <h1>Login</h1>

            <form onSubmit={ (e)=> login(e) }>
        
                <label>Email <br/>
                <input required placeholder="Digite seu email" onChange={ (e)=> alteraEmail(e.target.value) } />
                </label> <br/>
        
                <label>Senha <br/>
                <input type="password" required placeholder="Digite sua senha" onChange={ (e)=> alteraSenha(e.target.value) } /><br/>
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