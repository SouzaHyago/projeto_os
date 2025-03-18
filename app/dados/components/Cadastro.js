"use client"; 
import { useState } from "react";

function Cadastro() {
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
        </div>
    );
}

export default Cadastro;
