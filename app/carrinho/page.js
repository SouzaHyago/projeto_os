'use client'

import axios from "axios"
import { useEffect, useState } from "react"
import host from "../lib/host"
import Menu from "../components/Menu"

export default function Carrinho(){

    const [carrinho, alteraCarrinho] = useState([])
    

    function buscarCarrinho() {
        const response = JSON.parse(localStorage.getItem('usuario'))
        if (response?.carrinho) {
            alteraCarrinho(response.carrinho)
        }
    }

    async function finalizarCompra() {


        const local = JSON.parse(localStorage.getItem('usuario'));


        for(let i = 0; i < carrinho.length;i++){
            console.log(carrinho[i])

            const obj = {
                id_item : carrinho[i].id,
                id_usuario : local.id,
                stats : 1,
                descricao: "",
                quantidade : carrinho[i].qtd,
                valorItem : carrinho[i].valor
            }

            const response = await axios.post(host+"compras",obj)
            console.log(response)
        };

        localStorage.setItem('usuario', JSON.stringify({
			email: local.email,
			adm: local.adm,
			carrinho : [],
            id : local.id
		
		}))
        buscarCarrinho();



    
    }

    async function removerItem(item){
        let local = await JSON.parse(localStorage.getItem('usuario'));
		let listaTemporaria = local.carrinho

		console.log(local.carrinho)

        for(let i = 0; i < listaTemporaria.length;i++){
            if(listaTemporaria[0].id == item.id){
                listaTemporaria.splice(i,1);
            }
        }



		localStorage.setItem('usuario', JSON.stringify({
			email: local.email,
			adm: local.adm,
			carrinho : listaTemporaria,
            id : local.id
		
		}))

        buscarCarrinho();
    }

    useEffect(() => {
        buscarCarrinho()
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <Menu/>
            <h1 className="text-3xl mt-10 font-bold mb-6 text-gray-800">🛒 Carrinho de Compras</h1>

            {
                carrinho && carrinho.length > 0 ? (
                    <div className="grid gap-4">
                        {carrinho.map((item, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-start md:items-center">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">{item.nome}</h3>
                                    <p className="text-gray-700 mt-1">{item.descricao}</p>
                                    <p className="text-green-600 font-bold mt-2">R$ {item.valor.toFixed(2)}</p>
                                    <p className="text-sm text-gray-500 mt-1">Quantidade: {item.qtd}</p>
                                </div>
                                <button onClick={()=> removerItem(item)} className="mt-4 md:mt-0 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                                    Remover
                                </button>
                            </div>
                        ))}
                        <button onClick={()=> finalizarCompra()} className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded self-start">
                            Finalizar Compra
                        </button>
                    </div>
                ) : (
                    <p className="text-gray-600 text-lg" >Seu carrinho está vazio 😕</p>
                )
            }
        </div>
    )
}
