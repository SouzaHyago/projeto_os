
export default function Tabela(attr){
    return(
        <div className='flex flex-col m-auto w-150' >
                

            <div className=" max-w-5xl  p-6 bg-white border rounded shadow">
                <div className="bg-gray-800 text-white px-4 py-2 font-bold">Cliente</div>
                <div className="grid grid-cols-2 gap-4 border p-4">
                    <div><strong>Nome:</strong> {attr.nome}</div>
                    <div><strong>CPF:</strong> {attr.cpf}</div>
                    <div><strong>Email: </strong>{attr.email}</div>
                    <div><strong>Telefone:</strong> {attr.telefone}</div>
                </div>

                <div className="bg-gray-800 text-white px-4 py-2 font-bold mt-4">Item</div>
                <div className="grid grid-cols-2 gap-4 border p-4">
                    <div><strong>Nome:</strong> {attr.produto} </div>
                    <div><strong>Categoria:</strong> {attr.categoria} </div>
                    <div><strong>Valor:</strong> {attr.valorItem}</div>
                    <div><strong>Quantidade:</strong> {attr.quantidade}</div>
                </div>

                <div className="bg-gray-800 text-white px-4 py-2 font-bold mt-4">Descrição</div>
                <div className="border p-4">
                    <p> {attr.descricao} </p>
                </div>

                
                <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                    <div>
                        <strong>Data:</strong> {attr.data}
                    </div>

                    <div>
                        <strong>Contatos:</strong> {attr.telefone}
                    </div>

                    <div>
                        <strong>Total da venda:</strong> R$ {attr.valor}
                    </div>
                    
                </div>

            </div>

        </div>

    )
}