'use client'

import { useEffect, useState } from "react"

export default function Carrinho(){

    const [carrinho, alteraCarrinho] = useState([])

    function buscarCarrinho() {
        const response = JSON.parse(localStorage.getItem('usuario'))
        if (response?.carrinho) {
            alteraCarrinho(response.carrinho)
        }
    }

    async function removerItem(item){
        let local = await JSON.parse(localStorage.getItem('usuario'));
		let listaTemporaria = local.carrinho

		console.log(local.carrinho)
		listaTemporaria.push(item)

        for(let i = 0; i < listaTemporaria.length;i++){
            if(item.id == id){
                listaTemporaria.slice(i,1);
            }
        }



		localStorage.setItem('usuario', JSON.stringify({
			email: local.email,
			adm: local.adm,
			carrinho : listaTemporaria
		
		}))

        buscarCarrinho();
    }

    useEffect(() => {
        buscarCarrinho()
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">🛒 Carrinho de Compras</h1>

            {
                carrinho && carrinho.length > 0 ? (
                    <div className="grid gap-4">
                        {carrinho.map((item, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-start md:items-center">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">{item.nome}</h3>
                                    <p className="text-gray-700 mt-1">{item.descricao}</p>
                                    <p className="text-green-600 font-bold mt-2">R$ {item.valor.toFixed(2)}</p>
                                    <p className="text-sm text-gray-500 mt-1">Quantidade: {item.quantidade}</p>
                                </div>
                                <button onClick={()=> removerItem(item)} className="mt-4 md:mt-0 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                                    Remover
                                </button>
                            </div>
                        ))}
                        <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded self-start">
                            Finalizar Compra
                        </button>
                    </div>
                ) : (
                    <p className="text-gray-600 text-lg">Seu carrinho está vazio 😕</p>
                )
            }
        </div>
    )
}
