"use client"; 
import { useState } from "react";

function Cadastro({ alternarTela }) {
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem! Tente novamente.");
            return;
        }

        alert("Cadastro realizado com sucesso!");
    };

    return (
        <div className="glass-card">
            <h1><strong>CADASTRO</strong></h1>
            <form id="formCadastro" onSubmit={handleSubmit}>
                <label htmlFor="nome">Nome Completo</label>
                <input type="text" id="nome" name="nome" placeholder="Digite seu nome" required />

                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" name="email" placeholder="Digite seu e-mail" required />

                <label htmlFor="login">Login</label>
                <input type="text" id="login" name="login" placeholder="Escolha um login" required />

                <label htmlFor="senha">Senha</label>
                <input
                    type="password"
                    id="senha"
                    name="senha"
                    placeholder="Digite sua senha"
                    required
                    onChange={(e) => setSenha(e.target.value)}
                />

                <label htmlFor="confirmarSenha">Confirmar Senha</label>
                <input
                    type="password"
                    id="confirmarSenha"
                    name="confirmarSenha"
                    placeholder="Confirme sua senha"
                    required
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                />

                <button type="submit">Cadastrar</button>
            </form>
            <button onClick={alternarTela}>Já tem uma conta? Faça login</button>
        </div>
    );
}

function Login({ alternarTela }) {
    return (
        <div className="glass-card">
            <h1><strong>LOGIN</strong></h1>
            <form>
                <label htmlFor="login">Login</label>
                <input type="text" id="login" name="login" placeholder="Digite seu login" required />

                <label htmlFor="senha">Senha</label>
                <input type="password" id="senha" name="senha" placeholder="Digite sua senha" required />

                <button type="submit">Entrar</button>
            </form>
            <button onClick={alternarTela}>Ainda não tem uma conta? Cadastre-se</button>
        </div>
    );
}

function PaginaCadastro() {
    const [mostrarCadastro, setMostrarCadastro] = useState(true);

    return (
        <div>
            {mostrarCadastro ? <Cadastro alternarTela={() => setMostrarCadastro(false)} /> : <Login alternarTela={() => setMostrarCadastro(true)} />}
        </div>
    );
}

export default PaginaCadastro;
