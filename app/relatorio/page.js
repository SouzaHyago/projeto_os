'use client'

import axios from "axios";
import { useEffect, useState } from "react";




function Relatorio() {

    const [dados, alteraDados] = useState([])


    //SELECT compras.id, usuarios.nome, compras.valor, compras.data, itens.nome, compras.quantidade

    async function buscaDados(){
        const response = await axios.get("http://localhost:3000/api/compras")
        alteraDados(response.data)
        console.log(dados)

    }
        useEffect(()=> {
            buscaDados()
        }, [])

    return ( 
        <div>

            <style> 


                {`

                    .borda{
                        border: solid 1px black;

                    }
                `}

            </style>


            <div>
                <h1 className="text-3xl font-bold text-blue-600 dark:text-sky-400 pt-8 "> Painel administrativo</h1>
                <h2 className="pb-8 pt-8">Venda de produtos / Serviço</h2>

            </div>
            {
                dados.length > 0 ? 
                    
                    <table className="min-w-full table-auto border-collapse mx-10 my-10 ml-10">
                        <thead>
                            <tr className="bg-blue-600 border-1 border-black">
                                <th className="px-4 py-2 text-left borda  text-white">ID</th>
                                <th className="px-4 py-2 text-left borda text-white">NOME DO CLIENTE</th>
                                <th className="px-4 py-2 text-left borda text-white">VALOR</th>
                                <th className="px-4 py-2 text-left borda text-white">DATA</th>
                                <th className="px-4 py-2 text-left borda text-white">NOME DO ITEM</th>
                                <th className="px-4 py-2 text-left borda text-white">QUANTIDADE</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                               dados.map((i,index) => 

                                    <tr className= "hover:bg-gray-100" key={index}>
                                        <td className="px-6 py-3 border-1" > {i.id} </td>
                                        <td className="px-6 py-3 border-1" > {i.nome} </td>
                                        <td className="px-6 py-3 border-1" > {i.valor} </td>
                                        <td className="px-6 py-3 border-1" > {i.data} </td>
                                        <td className="px-6 py-3 border-1" > {i.item} </td>
                                        <td className="px-6 py-3 border-1" > {i.quantidade} </td>
                                    </tr>

                               ) 
                            }
             
                        </tbody>

                    </table>
                :   
                    <p> Carregando... </p> 
                
            }     

        </div>
     );
}

export default Relatorio;