import React, { useState } from 'react';

const Formulario = () => {
  // Gerenciamento de estado para cada campo do formulário
  const [nome, setNome] = useState('');
  const [contato, setContato] = useState('');
  const [tipoServico, setTipoServico] = useState('');
  const [data, setData] = useState('');
  const [status, setStatus] = useState('');

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Exibe os dados no console (pode ser enviado para uma API ou manipulado de outra forma)
    const dados = {
      nome,
      contato,
      tipoServico,
      data,
      status
    };

    console.log(dados);
    
    // Limpar o formulário após o envio
    setNome('');
    setContato('');
    setTipoServico('');
    setData('');
    setStatus('');
  };

  return (
    <div className="form-container">
      <h2>Formulário de Serviço</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome do Cliente:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contato">Contato do Cliente:</label>
          <input
            type="text"
            id="contato"
            name="contato"
            value={contato}
            onChange={(e) => setContato(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="tipo-servico">Tipo de Serviço:</label>
          <select
            id="tipo-servico"
            name="tipo-servico"
            value={tipoServico}
            onChange={(e) => setTipoServico(e.target.value)}
            required
          >
            <option value="">Selecione</option>
            <option value="servico1">Serviço 1</option>
            <option value="servico2">Serviço 2</option>
            <option value="servico3">Serviço 3</option>
            <option value="servico4">Serviço 4</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="data">Data do Serviço:</label>
          <input
            type="date"
            id="data"
            name="data"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status do Serviço:</label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="">Selecione</option>
            <option value="pendente">Pendente</option>
            <option value="em-andamento">Em Andamento</option>
            <option value="concluido">Concluído</option>
          </select>
        </div>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Formulario;