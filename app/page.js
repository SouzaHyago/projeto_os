'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Menu from './components/Menu'

export default function Home() {

	const [produtos, alteraProdutos] = useState([]);
	const [categorias, alteracategorias] = useState([]);
	const [mostrando, alteraMostrando] = useState([]);
	const [menuAberto, alteraMenuAberto] = useState(false);
	const [produtoSelecionado, setProdutoSelecionado] = useState(null); // Estado para o produto selecionado
	const [carrinho, setCarrinho] = useState([]); // Estado para o carrinho

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

	function ItensPorCategoria(id) {
		alteraMostrando([])
		let temp = [];
		produtos.forEach(produto => {
			console.log(produto);
			if (produto.id_categoria == id) {
				temp.push(produto);
			}
		});
		if (temp.length > 0) {
			alteraMostrando(temp);
		} else {
			alteraMostrando(produtos)
		}
		console.log(mostrando);
	}

	function abrirModal(produto) {
		setProdutoSelecionado(produto);
	}

	function fecharModal() {
		setProdutoSelecionado(null);
	}

	// Função para adicionar um item ao carrinho
	function adicionarAoCarrinho(produto) {
		setCarrinho(prevCarrinho => [...prevCarrinho, produto]);
	}

	// Função para remover um item do carrinho
	function removerDoCarrinho(id) {
		setCarrinho(prevCarrinho => prevCarrinho.filter(item => item.id !== id));
	}

	useEffect(() => {
		buscarProdutos()
		buscarCategorias()
	}, [])

	return (
		<div className="p-4">
			<Menu></Menu>

			<img src="https://placehold.co/100x50" alt="Picture of the author" className='pr-10 mb-10' />

			<div className='menuCategoria'>
				<img src="https://placehold.co/50x50" alt="Picture of the author" className='pr-10 mb-10' />
			</div>

			<button onClick={() => alteraMenuAberto(!menuAberto)} className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition">
				{menuAberto ? 'Esconder categorias' : 'Selecionar categoria'}
			</button>

			{
				menuAberto &&
				<button onClick={() => alteraMostrando(produtos)} className="bg-blue-500 text-white px-4 py-2 ml-5 rounded shadow hover:bg-blue-600 transition">
					Mostrar Todos
				</button>
			}

			<div className={`overflow-hidden transition-all duration-500 ease-in-out ${menuAberto ? 'max-h-[1000px] mt-4' : 'max-h-0'}`}>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
					{categorias.map((i) => (
						<button onClick={() => ItensPorCategoria(i.id)} className="border px-4 py-2 rounded-xl shadow bg-white hover:shadow-md transition" key={i.id}>
							{i.nome}
						</button>
					))}
				</div>
			</div>

			{
				mostrando.length > 0 ?

					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 border mt-10">
						{mostrando.map((i) => (
							<div
								key={i.id}
								className="border max-h-40 mx-5 my-5 rounded-xl shadow p-4 bg-white hover:shadow-md transition-shadow"
								onClick={() => abrirModal(i)} // Ao clicar, abre o modal
							>
								<h3 className="text-lg font-semibold mb-1">{i.nome}</h3>
								<p className="text-sm text-gray-600">{i.descricao}</p>
								<button
									onClick={() => adicionarAoCarrinho(i)} // Adiciona ao carrinho
									className="mt-2 bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition"
								>
									Adicionar ao Carrinho
								</button>
							</div>
						))}
					</div>

					:
					<p>carregando...</p>
			}

			{/* Carrinho */}
			<div className="mt-10">
				<h3 className="text-xl font-semibold">Carrinho</h3>
				{carrinho.length > 0 ? (
					<div className="bg-white p-4 rounded-xl shadow-md">
						{carrinho.map((item) => (
							<div key={item.id} className="flex justify-between items-center py-2 border-b">
								<p>{item.nome}</p>
								<button
									onClick={() => removerDoCarrinho(item.id)} // Remove do carrinho
									className="text-red-500 hover:text-red-700"
								>
									Remover
								</button>
							</div>
						))}
					</div>
				) : (
					<p>Seu carrinho está vazio</p>
				)}
			</div>

			{/* Modal com detalhes do produto */}
			{produtoSelecionado && (
				<div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
					<div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
						<button onClick={fecharModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
							X
						</button>
						<h2 className="text-2xl font-bold mb-4">{produtoSelecionado.nome}</h2>
						<img src={produtoSelecionado.imagemUrl} alt={produtoSelecionado.nome} className="w-full h-64 object-cover rounded-lg mb-4" />
						<p className="text-lg mb-2">{produtoSelecionado.descricao}</p>
						<p className="text-xl font-semibold">R$ {produtoSelecionado.valor}</p>
					</div>
				</div>
			)}
		</div>
	);
}
