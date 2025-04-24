'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function ListaCompras() {
  const [compras, setCompras] = useState([])

  useEffect(() => {
    axios.get(host+"compras")
      .then(res => setCompras(res.data))
      .catch(err => console.error("Erro ao buscar compras", err))
  }, [])

  return (
    <div>
      <h1>Compras Finalizadas</h1>
      {compras.length === 0 ? (
        <p>Nenhuma compra registrada.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuário</th>
              <th>Item</th>
              <th>Quantidade</th>
              <th>Valor</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {compras.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.nome}</td>
                <td>{c.item}</td>
                <td>{c.quantidade}</td>
                <td>R$ {c.valor}</td>
                <td>{new Date(c.data).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
