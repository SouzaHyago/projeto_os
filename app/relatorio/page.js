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
            {
                dados.length > 0 ? 

                    <table className="border-collapse border border-gray-400">
                        <thead>
                            <tr>
                                <th className="border border-gray-500 px-5">ID</th>
                                <th className="border border-gray-500 px-5">NOME DO CLIENTE</th>
                                <th className="border border-gray-500 px-5">VALOR</th>
                                <th className="border border-gray-500 px-5">DATA</th>
                                <th className="border border-gray-500 px-5">NOME DO ITEM</th>
                                <th className="border border-gray-500 px-5">QUANTIDADE</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                               dados.map((i,index) => 

                                    <tr key={index}>
                                        <td className="border border-gray-500 px-5" > {i.id} </td>
                                        <td className="border border-gray-500 px-5" > {i.nome} </td>
                                        <td className="border border-gray-500 px-5" > {i.valor} </td>
                                        <td className="border border-gray-500 px-5" > {i.data} </td>
                                        <td className="border border-gray-500 px-5" > {i.item} </td>
                                        <td className="border border-gray-500 px-5" > {i.quantidade} </td>
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