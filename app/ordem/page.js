'use client'

import axios from 'axios';
import { redirect, RedirectType } from 'next/navigation';
import { useEffect, useState } from 'react';
import Tabela from './components/Tabela';


export default function Ordem(){

    const [dados,alteraDados] = useState([]);
    const [gerandoPdf,setGerandoPdf] = useState(true);

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


    function baixarPDF() {
        fetch('/api/gerar-pdf')
          .then((res) => res.blob())
          .then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'Ordem de Serviço';
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
          })
          .catch((err) => console.error('Erro ao baixar o PDF:', err));

      }




    useEffect(()=>{
        buscaDados(),
        setGerandoPdf(false)
    },[])
    return( 
    
        <div >

            
                <style>
                                            
                    {`
                        button{
                            border-radius: 5px;
                            padding: 0.65rem 0.55rem 0.6rem 0.40rem;
                            cursor: pointer;
                            color: #1D2027;
                            font-size: 1rem;
                            border: none;
                            margin-top: 5px;
                            box-shadow: 1px 0.75px 5px #1B87EA;
                            text-decoration: none;
                        }

                        button{
                            transition: 0.3s;
                            color: #F6F7F6;
                        }
                    `}
            
            </style>

                <header className=' my-7   flex justify-center '>
                    <img src="https://placehold.co/100x50"  alt="Picture of the author" className='pr-10' />
                    <h1 className="text-2xl">Venda  N° {123}</h1>
                </header>
          

            {
                // dados.length > 0 ?

                // //    { <Tabela
                // //         nome = {dados[0].nome}
                // //         cpf = {dados[0].cpf}
                // //         email = {dados[0].email}
                // //         telefone = {dados[0].telefone}
                // //         produto = {dados[0].produto}
                // //         categoria = {dados[0].categoria}
                // //         valorItem = {dados[0].valo}
                // //         quantidade = {dados[0].}
                // //         descricao = {dados[0].}
                // //         data = {dados[0].}
                // //         valor = {dados[0].}
                // //     />}
                // :
                //     <p>carregando...</p>

            }

            {
                !gerandoPdf &&
                    <button className='bg-gray-800' onClick={()=> baixarPDF()}>Gerar PDF</button>

            }

            

        </div> 
    )
}