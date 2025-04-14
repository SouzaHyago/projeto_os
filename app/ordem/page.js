'use client'

import axios from 'axios';
import Image from 'next/image'
import { useEffect, useState } from 'react';


export default function Ordem(){

    const [dados,alteraDados] = useState([]);

    async function buscaDados() {
        const response = await axios.get("http://localhost:3000/api/ordem",{
            params : {
                idItem: 4,
                idUsuario:1,
                idCompra:2
            }   
        });
        alteraDados(response.data);
    }

    useEffect(()=>{
        buscaDados()
    },[])
    return( 
    
        <div >

                <header className=' my-7   flex justify-center '>
                    <img src="https://placehold.co/100x50"  alt="Picture of the author" className='pr-10' />
                    <h1 className="text-2xl">Venda  N° {123}</h1>
                </header>

            {
                dados.length > 0 ?
                    <div className='flex flex-col m-auto w-150' >
                

                        <div className=" max-w-5xl  p-6 bg-white border rounded shadow">
                            <div className="bg-gray-800 text-white px-4 py-2 font-bold">Cliente</div>
                            <div className="grid grid-cols-2 gap-4 border p-4">
                                <div><strong>Nome:</strong> Clovis chupa manga</div>
                                <div><strong>Endereço:</strong> minha casa</div>
                                <div><strong>Telefone:</strong> (41) 9908-0808</div>
                                <div><strong>CPF:</strong> </div>
                            </div>

                            <div className="bg-gray-800 text-white px-4 py-2 font-bold mt-4">Item</div>
                            <div className="grid grid-cols-2 gap-4 border p-4">
                                <div><strong>Nome:</strong> Aifone</div>
                                <div><strong>Categoria:</strong> Telemóvel</div>
                                <div><strong>Valor:</strong> 0.00</div>
                                <div><strong>Quantidade:</strong> 1x</div>
                            </div>

                            <div className="bg-gray-800 text-white px-4 py-2 font-bold mt-4">Descrição</div>
                            <div className="border p-4">
                                <p>Ta bem zuado</p>
                            </div>

                            
                            <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                                <div>
                                    <strong>Data:</strong> 26/02/2021 às 8h
                                </div>

                                <div>
                                    <strong>Contatos:</strong> (16) 4002-8922
                                </div>

                                <div>
                                    <strong>Total da venda:</strong> R$ 123.55
                                </div>
                                
                            </div>
                        </div>

                    

                    

                    </div>
                :
                    <p>carregando...</p>

            }

            

        </div> 
    )
}