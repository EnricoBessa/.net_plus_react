import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Item {
  id: number;
  nome: string;
  dataCriacao: string;
}

const App: React.FC = () => {
  const [dadosAgrupados, setDadosAgrupados] = useState<{ [key: string]: Item[] }>({});
  const [nome, setNome] = useState('');
  const [dataCriacao, setDataCriacao] = useState('');

  const agruparPorData = (response: Item[]) => {
    const agrupado: { [key: string]: Item[] } = {};
    response.forEach((item) => {
      const data = new Date(item.dataCriacao).toLocaleDateString();
      if (!agrupado[data]) {
        agrupado[data] = [];
      }
      agrupado[data].push(item);
    });

    setDadosAgrupados(agrupado);
  };

  const handleGetItems = () => {
    axios.get('http://localhost:5155/api/lembrete')
      .then(response => agruparPorData(response.data))
      .catch(error => console.error('Erro ao obter itens:', error));
  }

  useEffect(() => {
    handleGetItems()
  }, []);

  const handleAddItem = () => {
    axios.post('http://localhost:5155/api/lembrete', { nome, dataCriacao })
      .then(() => {
        handleGetItems();
        setNome('');
        setDataCriacao('');
      })
      .catch(error => console.error('Erro ao adicionar item:', error));
  };

  const handleDelete = (itemId: number) => {
    axios.delete(`http://localhost:5155/api/lembrete/${itemId}`)
      .then(() => handleGetItems())
      .catch(error => console.error('Erro ao deletar item:', error));
  };

  return (
    <div className='maindiv'>
      <h1>Adicionar novo lembrete</h1>
      <div className='secdiv'>
        <label>
          Nome:
          <input className='inputNome' type="text" value={nome} onChange={e => setNome(e.target.value)} />
        </label>
        <label>
          Data de Criação:
          <input className='inputData' type="date" value={dataCriacao} onChange={e => setDataCriacao(e.target.value)} />
        </label>
        <button onClick={handleAddItem}>Adicionar</button>
      </div>
      <p className='lista'>Lista de Lembretes</p>
      <ul className='ulLista'>
        {Object.keys(dadosAgrupados).map((data, index) => (
          <div key={index}>
            <h3>{data}</h3>
            <ul>
              {dadosAgrupados[data].map((item) => (
                <li key={item.id}>{item.nome} <button onClick={() => handleDelete(item.id)}>Deletar</button></li>
              ))}
            </ul>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default App;
