

function Servico(){

    return(
        <div> 
            
            <form className="max-w-md mx-auto p-6 bg-white rounded shadow-md space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Produto</label>
                    <input type="text" name="produto" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                    <select name="categoria" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Selecione</option>
                        <option value="eletronico">Eletrônico</option>
                        <option value="roupas">Roupas</option>
                        <option value="alimentos">Alimentos</option>
                        <option value="livros">Livros</option>
                        <option value="outros">Outros</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                    <textarea name="descricao" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Valor</label>
                    <input type="number" name="valor" step="0.01" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
                    Enviar
                </button>
            </form>



        </div>    
    )
}

export default Servico;

