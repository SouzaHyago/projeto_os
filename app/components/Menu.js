import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faBagShopping, faBars, faClipboardList, faListUl, faUser, faUsers } from '@fortawesome/free-solid-svg-icons'
import { redirect } from 'next/navigation';

function Menu() {
    const [ativo, alteraAtivo] = useState(false);

    const alteraMenu = () => alteraAtivo(!ativo)
    const [ adm, alteraAdm ] = useState(0)

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
        <div>
            <div 
                style={{
                    color: "white",
                    background: "#5F805F",
                    padding: "10px 20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000
                }}
            >
                <div onClick={alteraMenu} style={{cursor: "pointer"}}>
                    <FontAwesomeIcon icon={faBars} />
                </div>

                <h1 style={{fontWeight: 600, fontSize: 24, textAlign: "center", margin: 0 }}>Work2sell</h1>
                <div></div>
                
            </div>

            {/* Menu lateral */}
            <div 
                style={{
                    width: 250,
                    height: "100vh",
                    background: "#5F805F",
                    position: "fixed",
                    top: 0,
                    left: ativo ? 0 : -250, 
                    transition: "left 0.3s ease",
                    color: "white",
                    paddingTop: 50,
                    textAlign: "center",
                    zIndex: 999
                }}
            >
                <button 
                    style={{border: "none", color: "white", fontSize: 16, cursor: "pointer", marginBottom: 20, marginTop: 20}}
                    onClick={() => {localStorage.removeItem("usuario"), window.location.href = "/login"}}
                >
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> Logout
                </button><br/>

                <button onClick={()=> redirect("/carrinho")} >Carrinho</button>

                {
                    adm == 1 &&
                        <div>
                            <button 
                                style={{border: "none", color: "white", fontSize: 16, cursor: "pointer", marginBottom: 20}}
                                onClick={() => window.location.href = "/cadastro"}
                            >
                                <FontAwesomeIcon icon={faUser} /> Cadastrar um usuário
                            </button><br/>

                            <button 
                                style={{border: "none", color: "white", fontSize: 16, cursor: "pointer", marginBottom: 20 }}
                                onClick={() => window.location.href = "/categorias"}
                            >
                                <FontAwesomeIcon icon={faListUl} /> Cadastrar uma categoria
                            </button><br/>

                            <button 
                                style={{border: "none", color: "white", fontSize: 16, cursor: "pointer" , marginBottom: 20}}
                                onClick={() => window.location.href = "/cadastro_itens"}
                            >
                                <FontAwesomeIcon icon={faBagShopping} /> Cadastrar um item
                            </button><br/>

                            <button 
                                style={{border: "none", color: "white", fontSize: 16, cursor: "pointer", marginBottom: 20}}
                                onClick={() => window.location.href = "/usuarios_cadastrados"}
                            >
                                <FontAwesomeIcon icon={faUsers} /> Todos os usuários do sistema
                            </button><br/>

                            <button 
                                style={{border: "none", color: "white", fontSize: 16, cursor: "pointer" , marginBottom: 20}}
                                onClick={() => window.location.href = "/relatorio"}
                            >
                                <FontAwesomeIcon icon={faClipboardList} /> Relatório
                            </button>
                        </div>
                }



            </div>

        </div>
    );
}

export default Menu;
