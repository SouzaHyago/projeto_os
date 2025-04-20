'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Menu from './components/Menu'

export default function Home() {

    const [categorias, alteraCategorias] = useState([])
    const [itens, alteraItens] = useState([])


    async function buscaCategorias() {
        const response = await axios.get("http://localhost:3000/api/categorias");
        alteraCategorias(response.data);
    }

    async function buscaItens() {
        const response = await axios.get("http://localhost:3000/api/itens");
        alteraItens(response.data);
    }

    useEffect(() => {
        buscaCategorias()
        buscaItens()
    }, [])

    return (
        <div>

            <Menu/>

            {
                categorias.map( i =>
                    <div className='categorias'>
                        <button>{i.nome}</button>
                    </div>
                )
            }

            {
                itens.map( i =>
                    <div className='itens'>
                        <ul>
                            <li>{i.nome}</li>
                            <li>{i.descricao}</li>
                            <li>R$ {i.valor}</li>
                        </ul>
                    </div>
                )
            }

        </div>
    )
}
