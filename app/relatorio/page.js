'use client'

import axios from "axios";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import host from "../lib/host";
import Menu from "../components/Menu";

function Relatorio() {

    const [dados, alteraDados] = useState([])
    const [busca, alteraBusca] = useState("")
    const [numero,alteraNumero] = useState(0)
    const [mostrar,alteraMostrar] = useState(false)
    const [stats, alteraStats] = useState("");




    function formataData( valor ){
        let data = valor.split("T")[0]

        data = data.split("-")
        data = data.reverse()
        data = data.join("/")

        return data

    }

    async function exibirBusca(){
        const response = await axios.get(host+"compras/"+ busca)
        alteraDados(response.data)
        if(response.data > 0){
            alteraMostrar(true)
        }
        console.log(response)
    }

    //SELECT compras.id, usuarios.nome, compras.valor, compras.data, itens.nome, compras.quantidade

    async function buscaDados(){
        const response = await axios.get(host+"compras")
        alteraDados(response.data)
        alteraStats(response.statusText) 

       

    }
        
    useEffect(()=> {
            buscaDados()
        }, []
    )

    return ( 

        <div>

            <Menu/>

            <style> 


                {`

                    .borda{
                        border: solid 1px black;

                    }
                `}

            </style>


            <div className="mt-10">   
                <h1 className="text-3xl font-bold text-gray-600 dark:text-sky-400 pt-8 "> Painel administrativo </h1>
                <h2 className="pb-8 pt-8">Venda de produtos / Serviço</h2>
            <div/>

            <div className=" mt-10 px-4 flex">
                
                <input placeholder="Digite aqui..." className= " px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 placeholder-gray-500"
                value={busca}   
                onChange={(e)=> {alteraBusca(e.target.value); busca.length > 1 ? exibirBusca() :  buscaDados() }}/>
                <div onClick={()=> exibirBusca()}><img src="https://img.freepik.com/vetores-premium/icone-de-lupa-pesquisar-encontrar-icone-de-busca_250841-965.jpg" width={40}/></div>
                
            </div>

            </div>

           {!stats && <p>carregando...</p>}
          
            { 
                mostrar &&
                    
                    <table className="max-w-300 table-auto border-collapse mx-10 my-10 ml-10">
                        <thead>
                            <tr className="bg-gray-600 border-1 border-black">
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

                                    <tr className= "hover:bg-gray-100" key={index} onClick={ ()=> redirect("/ordem") }>
                                        <td className="px-6 py-3 border-1" > {i.id} </td>
                                        <td className="px-6 py-3 border-1" > {i.nome} </td>
                                        <td className="px-6 py-3 border-1" > {i.valor} </td>
                                        <td className="px-6 py-3 border-1" > {formataData(i.data)} </td>
                                        <td className="px-6 py-3 border-1" > {i.item} </td>
                                        <td className="px-6 py-3 border-1" > {i.quantidade} </td>
                                    </tr>

                               ) 
                            }

                        </tbody>

                    </table>
            } 

            {stats && dados <= 0 && <p>nenhuma compra finalizada</p>}

            
            </div>
     );
}

export default Relatorio;