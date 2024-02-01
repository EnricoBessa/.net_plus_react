import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Item {
  id: number;
  nome: string;
  dataCriacao: string;
}

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [nome, setNome] = useState('');
  const [dataCriacao, setDataCriacao] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5155/lembrete')
      .then(response => setItems(response.data))
      .catch(error => console.error('Erro ao obter itens:', error));
  }, []);

  const handleAddItem = () => {
    axios.post('http://localhost:5155/lembrete', { nome, dataCriacao })
      .then(response => setItems([...items, response.data]))
      .catch(error => console.error('Erro ao adicionar item:', error));

    setNome('');
    setDataCriacao('');
  };

  const handleDelete = (itemId: number) => {
    axios.delete(`http://localhost:5155/lembrete/${itemId}`)
      .then(() => setItems(items.filter(item => item.id !== itemId)))
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
          <input className='inputData' type="text" value={dataCriacao} onChange={e => setDataCriacao(e.target.value)} />
        </label>
        <button onClick={handleAddItem}>Adicionar</button>
      </div>
      <p className='lista'>Lista de Lembretes</p>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.nome} - {item.dataCriacao}
            <button onClick={() => handleDelete(item.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
