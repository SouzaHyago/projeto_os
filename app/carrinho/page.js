'use client'

import { useEffect, useState } from "react"


export default function Carrinho(){

    const [carrinho,alteraCarrinho] = useState({})

    function buscarCarrinho(){
        const response = JSON.parse(localStorage.getItem('usuario'))
        alteraCarrinho(response.carrinho);
    }

    useEffect(()=> {
        buscarCarrinho()
    },[])

    return(


        <div>
            
            <h1 className="">Carrinho</h1>

            {
                carrinho.length > 0 &&
    
                    <div>
                        <div  className=" max-w-200 flex items-center flex-col mb-4 mt-2">
                            {carrinho.map((i,index) => (
                            <div key={index} className="border max-h-40 mx-5 my-5 rounded-xl shadow p-10 bg-white  hover:shadow-md transition-shadow">
                                <h3 className="text-lg font-semibold">{i.nome}</h3>
                                <img src='https://placehold.co/100x100'></img>
                                <p className="text-sm text-gray-600">{i.descricao}</p>
                                <p>{i.quantidade}</p>
                            </div>
                            ))}
                        </div>
                    </div>
    
            }
            
        </div>

    )
}