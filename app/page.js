'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Menu from './components/Menu'
import host from './lib/host';
import '../app/cadastro_itens/cadastro_itens.css'

export default function Home() {

	const [produtos, alteraProdutos] = useState([]);
	const [categorias, alteracategorias] = useState([]);
	const [mostrando, alteraMostrando] = useState([]);
	const [menuAberto, alteraMenuAberto] = useState(false);
	const [produtoSelecionado, setProdutoSelecionado] = useState(null); 
	const [quantidade, alteraQuantidade] = useState(0);
	const [itemModal, alteraItemModel] = useState({});
	const [adm, alteraAdm] = useState(0);
	const [categoria, alteraCategoria] = useState("")
    const [nome, alteraNome] = useState("")
    const [imagem, alteraImagem] = useState("")
    const [descricao, alteraDescricao] = useState("")
    const [valor, alteraValor] = useState(0);
	const [editar,alteraEditar] = useState(null);

	async function verificarAdm() {
		const usuario = JSON.parse(localStorage.getItem('usuario'));
		if (usuario && usuario.adm == 1) {
			alteraAdm(1)
		} else {
			alteraAdm(0)
		}
	}

	async function buscarProdutos() {
		try {
			const response = await axios.get(host + "itens");
			alteraProdutos(response.data);
			alteraMostrando(response.data)
		} catch (erro) {
			console.error("Erro ao buscar produtos:", erro);
		}
	}

	function adicionarNoCarrinho(item) {
		let local = JSON.parse(localStorage.getItem('usuario'));
		let listaTemporaria = local.carrinho;
		for(let i = 0; i < listaTemporaria.length;i++){
			if(listaTemporaria[i].id == item.id){
				listaTemporaria[i].qtd += quantidade < 1 ? 1 : parseInt(quantidade);
				localStorage.setItem('usuario', JSON.stringify({
					email: local.email,
					adm: local.adm,
					carrinho: listaTemporaria,
					id: local.id
				}))
				fecharModal();
				return;
			}
		}
		listaTemporaria.push(item);
		console.log(quantidade)
		if (quantidade < 1) {
			item['qtd'] = 1;
		}else{
			item['qtd'] = parseInt(quantidade);
		}
		localStorage.setItem('usuario', JSON.stringify({
			email: local.email,
			adm: local.adm,
			carrinho: listaTemporaria,
			id: local.id,
			pedidos: local.pedidos
		}))
		fecharModal();
	}

	async function buscarCategorias() {
		try {
			const response = await axios.get(host + "categorias");
			alteracategorias(response.data);
		} catch (erro) {
			console.error("Erro ao buscar categorias:", erro);
		}
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
		try {
			await axios.delete(host + "itens/" + id);
			buscarProdutos();
			fecharModal();
		} catch (erro) {
			console.error("Erro ao remover item:", erro);
			alert("Ocorreu um erro ao remover o item.");
		}
	}

	function formataValor(input){
        let numeros = input.replace(/\D/g,'');
        if(numeros.length === 0){
            return '';
        }
        let numFormatado = parseFloat(numeros)/100;

        return numFormatado.toFixed(2);
    }

    function inputValor(val){
        let numFormatado = formataValor(val);
        alteraValor(numFormatado);
    }

	function montaEdicao(i){
		valor
		alteraEditar(1);
		alteraCategoria(i.categoria);
		alteraNome(i.nome);
		alteraDescricao(i.descricao);
		alteraImagem(i.imagem);
		alteraValor((i.valor).toFixed(2))
	}

	async function editarItem() {
		try {
			for(let i = 0; i < categorias.length; i++){
				if(categorias[i].nome === categoria){
					alteraCategoria(categorias[i].id)
				}
			}
			
			await axios.put(host+"itens/"+produtoSelecionado.id,{ nome: nome, imagem: imagem, descricao: descricao, valor: valor, id_categoria:categoria } );
			alteraEditar(null);
			setProdutoSelecionado(null);
			buscarProdutos();
		} catch (erro) {
			console.error("Erro ao editar item:", erro);
			alert("Ocorreu um erro ao editar o item.");
		}
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
				className="bg-green-200/30 hover:bg-green-300/40 text-green-800 px-6 py-3 rounded-lg font-semibold shadow-lg backdrop-blur-2xl border border-white/20 transition-all mt-10"
			>
		{menuAberto ? 'Esconder Categorias' : 'Selecionar Categoria'}
				</button>

		{menuAberto && (
			<button 
				onClick={() => alteraMostrando(produtos)} 
				className="bg-green-200/30 hover:bg-green-300/40 text-green-800 px-6 py-3 rounded-lg font-semibold shadow-lg backdrop-blur-2xl border border-white/20 transition-all mt-10"
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
									className="bg-white border rounded-xl shadow-lg hover:shadow-2xl transition-all p-4 cursor-pointer flex flex-col justify-between "
									style={{ boxShadow: '0 4px 12px rgba(0, 128, 0, 0.2)' }} 
								>
									<h3  className=" text-xl font-bold text-gray-800 truncate">{i.nome}</h3>
									<img src={i.imagem} className='w-50 m-auto'/>
									<p className="text-gray-600 text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">{i.descricao}</p>
								</div>
							))}
						</div>
					)
				: 
					(
						<p className="text-center text-gray-500 mt-10">Carregando produtos...</p>
					)
				}
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
							src={produtoSelecionado.imagem} 
							alt={produtoSelecionado.nome} 
							className="w-full h-60 object-cover rounded-lg mb-4"
						/>
						<p className="text-gray-700 mb-2">{produtoSelecionado.descricao}</p>
						<p className="text-2xl font-bold text-green-700 mb-4">R$ {(produtoSelecionado.valor).toFixed(2)}</p>

						{adm == 1 ? (
							<div className="flex justify-center">
								<button 
									onClick={() => removerItem(produtoSelecionado.id)} 
									className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg shadow"
								>
									Remover Produto
								</button>

								<button 
									onClick={() => {montaEdicao(produtoSelecionado)}}
									className="bg-yellow-500 ml-5 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg shadow"
								>
									Alterar item
								</button>

							</div>
						) : (
							<div className="flex flex-col gap-2">
								<label className="text-gray-700">Quantidade</label>
								<input 
									className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" 
									placeholder="Digite uma quantidade"
									onChange={(e) => alteraQuantidade(e.target.value)} 
									type="number" 
									min={0} 
								/>
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
			{

				editar &&(
					
					<div className="fixed inset-0 bg-black bg-opacity-50 mt-10 flex justify-center items-center z-50 p-4">
						<div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative cadastro_produtos">
							<form onSubmit={(e) => { alteraEditar(null); e.preventDefault(); editarItem(); }} >

								<label>Selecione a categoria<br/>
									<select onChange={(e) => alteraCategoria(e.target.value)} value={categoria}>
										<option>Selecione a categoria</option>
										{categorias.map((i) =>
											<option key={i.id} value={i.id}>{i.nome}</option>
										)}
									</select>
								</label> <br/>

								<label>Nome do produto<br />
									<input required placeholder="Digite o nome do produto" onChange={(e) => alteraNome(e.target.value)} value={nome} />
								</label>

								<label>Imagem<br />
									<input required placeholder="Coloque o link da imagem do produto" onChange={(e) => alteraImagem(e.target.value)} value={imagem} />
								</label> <br/>

								<label>Descrição<br />
									<input required placeholder="Digite a descrição do produto" onChange={(e) => alteraDescricao(e.target.value)} value={descricao} />
								</label>

								<label>Valor<br />
									<input 
										required 
										placeholder="Digite o valor" 
										onChange={(e) => inputValor(e.target.value)} 
										value={valor} 
									/>
								</label>
								<div className="flex justify-between gap-10 mt-5">
									<button 
										className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
										type="reset"
										onClick={() => alteraEditar(null)}
									>Cancelar</button>
									<button 
										className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
										type="submit"
									>Salvar Alterações</button>
								</div>
							</form>

						</div>
					</div>
				)

			}
		</div>
	)
}
