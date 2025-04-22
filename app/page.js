'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Menu from './components/Menu'



export default function Home() {

  const [produtos,alteraProdutos] = useState([]);
  const [categorias,alteracategorias] = useState([]);
  const [mostrando,alteraMostrando] =  useState([]);

  async function buscarProdutos() {
    const response = await axios.get("http://localhost:3000/api/itens");
    alteraProdutos(response.data);
    alteraMostrando(response.data)
  }
  async function buscarCategorias() {
    const response = await axios.get("http://localhost:3000/api/categorias");
    alteracategorias(response.data);
    console.log(response.data)
  }
  function ItensPorCategoria(id){
      alteraMostrando([])
      let temp = [];
      produtos.forEach(produto => {
        console.log(produto);
        if(produto.id_categoria == id){
          temp.push(produto);
        }
      });
      if(temp.length > 0){
        alteraMostrando(temp);
      }else{
        alteraMostrando(produtos)
      }
      console.log(mostrando);
  }

  useEffect(()=>{
    buscarProdutos()
    buscarCategorias()
  },[])



  return (
    <div className="p-4">

      <Menu></Menu>
      
      <img src="https://placehold.co/100x50"  alt="Picture of the author" className='pr-10 mb-10' />

      {
        categorias.length > 0 &&
          <div className="">
            <p>categorias</p>
            {categorias.map((i) => (
              <button  onClick={()=> ItensPorCategoria(i.id)} className='"border max-h-40 ml-5 my-5  min-w-60 rounded-xl shadow p-4 bg-white hover:shadow-md transition-shadow"' key={i.id} variant="secondary">
                {i.nome}
              </button>
            ))}
          </div>
      }


      {
        mostrando.length > 0 ? 
        
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 border mt-10">
            {mostrando.map((i) => (
              <div
                key={i.id}
                className="border max-h-40 mx-5 my-5  rounded-xl shadow p-4 bg-white hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold mb-1">{i.nome}</h3>
                <p className="text-sm text-gray-600">{i.descricao}</p>
              </div>
            ))}
          </div>
        
        :
          <p>carregando...</p>
      }
 
    </div>
  );
}