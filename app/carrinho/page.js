'use client'

import axios from "axios"
import { use, useEffect, useState } from "react"
import host from "../lib/host"
import Menu from "../components/Menu"

export default function Carrinho(){

    const [carrinho, alteraCarrinho] = useState([])
    const [ adm, alteraAdm ] = useState(0)
    const [pedidosRecentes, alteraPedidosRecentes] = useState([])
    const [compraFinalizada, alteraCompraFinalizada] = useState(false)

    function buscarCarrinho() {
        const response = JSON.parse(localStorage.getItem('usuario'))
        if (response?.carrinho) {
            alteraCarrinho(response.carrinho)
        }
    }

    async function finalizarCompra() {

        const local = JSON.parse(localStorage.getItem('usuario'))
        const novosPedidos = [];

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
            novosPedidos.push(carrinho[i])
            console.log(response)
        }

        localStorage.setItem('usuario', JSON.stringify({
			email: local.email,
			adm: local.adm,
			carrinho : [],
            id : local.id
		
		}))
        
        buscarCarrinho()
        alteraPedidosRecentes(novosPedidos)
        alteraCompraFinalizada(true)
    
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

    async function verificarAdm(){

        const usuario = JSON.parse(localStorage.getItem('usuario'))

        if (usuario && usuario.adm == 1) {
            alteraAdm(1)
        } else {
            alteraAdm(0)
        }

    }

    useEffect(() => {
        buscarCarrinho()
        verificarAdm()
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

            {
                compraFinalizada && pedidosRecentes.length > 0 && adm == 0 && (
                    <div className="mt-10 bg-green-100 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold text-green-700 mb-2">Seus Pedidos:</h3>
                        {pedidosRecentes.map(() => (
                            <div key={index} className="mb-4">
                                <p className="text-green-900 font-medium">{item.nome}</p>
                                <p className="text-green-800 text-sm">Quantidade: {item.qtd} • Valor: R$ {item.valor.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                )
            }

            
        </div>
    )
}
