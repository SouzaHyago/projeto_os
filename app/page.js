'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Menu from './components/Menu'
import host from './lib/host';
import Link from 'next/link';

export default function Home() {

	const [produtos, alteraProdutos] = useState([]);
	const [categorias, alteracategorias] = useState([]);
	const [mostrando, alteraMostrando] = useState([]);
	const [menuAberto, alteraMenuAberto] = useState(false);
	const [produtoSelecionado, setProdutoSelecionado] = useState(null); 
	const [carrinho, alteraCarrinho] = useState([]);
	const [quantidade, alteraQuantidade] = useState(0);
	const [itemModal, alteraItemModel] = useState({});
	const [adm, alteraAdm] = useState(0);

	async function verificarAdm() {
		const usuario = JSON.parse(localStorage.getItem('usuario'));
		if (usuario && usuario.adm == 1) {
			alteraAdm(1)
		} else {
			alteraAdm(0)
		}
	}

	async function buscarProdutos() {
		const response = await axios.get(host + "itens");
		alteraProdutos(response.data);
		alteraMostrando(response.data)
	}

	function adicionarNoCarrinho(item) {
		let local = JSON.parse(localStorage.getItem('usuario'));
		let listaTemporaria = local.carrinho;
		console.log(local.carrinho);
		listaTemporaria.push(item);
		 if(quantidade < 1){
			quantidade = 1;
		}
		alteraCarrinho(listaTemporaria);
		console.log(local);

		localStorage.setItem('usuario', JSON.stringify({
			email: local.email,
			adm: local.adm,
			carrinho: listaTemporaria,
			id: local.id
		}))
		fecharModal();
	}

	async function buscarCategorias() {
		const response = await axios.get(host + "categorias");
		alteracategorias(response.data);
	}

	function ItensPorCategoria(id) {
		alteraMostrando([])
		let temp = [];
		produtos.forEach(produto => {
			if (produto.id_categoria == id) {
				temp.push(produto);
			}
		});
		if (temp.length > 0) {
			alteraMostrando(temp);
		} else {
			alteraMostrando(produtos)
		}
	}

	function abrirModal(produto) {
		setProdutoSelecionado(produto);
	}

	function fecharModal() {
		setProdutoSelecionado(null);
	}

	async function removerItem(id) {
		const response = await axios.delete(host + "itens/" + id)
		buscarProdutos();
		fecharModal();
	}

	useEffect(() => {
		buscarProdutos()
		buscarCategorias()
		verificarAdm()
	}, [])

	return (
		<div className="p-6 bg-gray-100 min-h-screen">
			<Menu />

			<div className="flex flex-wrap items-center gap-4 mb-6">
				<button 
					onClick={() => alteraMenuAberto(!menuAberto)} 
					className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow transition-all"
				>
					{menuAberto ? 'Esconder Categorias' : 'Selecionar Categoria'}
				</button>

				{menuAberto && (
					<button 
						onClick={() => alteraMostrando(produtos)} 
						className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow transition-all"
					>
						Mostrar Todos
					</button>
				)}
			</div>

			<div className={`overflow-hidden transition-all duration-500 ease-in-out ${menuAberto ? 'max-h-[1000px] mt-4' : 'max-h-0'}`}>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
					{categorias.map((i) => (
						<button 
							key={i.id}
							onClick={() => ItensPorCategoria(i.id)}
							className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-center hover:shadow-md font-medium transition-all"
						>
							{i.nome}
						</button>
					))}
				</div>
			</div>

			<div className="mt-10">
				{mostrando.length > 0 ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{mostrando.map((i) => (
							<div 
								key={i.id}
								onClick={() => { alteraItemModel(i); abrirModal(i) }}
								className="bg-white border rounded-xl shadow-lg hover:shadow-2xl transition-all p-4 cursor-pointer flex flex-col justify-between h-52"
								style={{ boxShadow: '0 4px 12px rgba(0, 128, 0, 0.2)' }} 
							>
								<h3 className="text-xl font-bold text-gray-800 truncate">{i.nome}</h3>
								<p className="text-gray-600 text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">{i.descricao}</p>
							</div>
						))}
					</div>
				) : (
					<p className="text-center text-gray-500 mt-10">Carregando produtos...</p>
				)}
			</div>

			{produtoSelecionado && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
					<div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative">
						<button 
							onClick={fecharModal} 
							className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl font-bold"
						>
							&times;
						</button>

						<h2 className="text-3xl font-bold mb-4 text-center">{produtoSelecionado.nome}</h2>
						<img 
							src={produtoSelecionado.imagemUrl} 
							alt={produtoSelecionado.nome} 
							className="w-full h-60 object-cover rounded-lg mb-4"
						/>
						<p className="text-gray-700 mb-2">{produtoSelecionado.descricao}</p>
						<p className="text-2xl font-bold text-green-700 mb-4">R$ {produtoSelecionado.valor}</p>

						{adm == 1 ? (
							<div className="flex justify-center">
								<button 
									onClick={() => removerItem(produtoSelecionado.id)} 
									className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg shadow"
								>
									Remover Produto
								</button>
							</div>

							:
							<div>
								<label htmlFor="">quantidade </label>
								<input className='border' placeholder={"digite uma quantidade"} onChange={(e) => alteraQuantidade(e.target.value)} type="number" min={0} />
								<button
									onClick={() => { adicionarNoCarrinho(itemModal) }}
									className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold mt-2"
								>
									Adicionar ao Carrinho
								</button>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
