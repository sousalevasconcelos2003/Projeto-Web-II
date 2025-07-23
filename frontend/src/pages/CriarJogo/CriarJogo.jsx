import { useState } from 'react';
import axios from 'axios';
import styles from './CriarJogo.module.css';

function CriarJogo({ onVoltar }) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tipo, setTipo] = useState('item-categoria');
  const [pares, setPares] = useState([{ item: '', categoria: '' }]);

  const adicionarPar = () => {
    setPares([...pares, { item: '', categoria: '' }]);
  };

  const atualizarPar = (index, campo, valor) => {
    const novosPares = [...pares];
    novosPares[index][campo] = valor;
    setPares(novosPares);
  };

  
  const salvarJogo = async () => {
    if (pares.length < 4) return alert('Adicione pelo menos 4 pares.');

    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    if (!usuarioLogado) {
      alert('Usuário não está logado');
      return;
    }

    const { _id: criadorId, nome: criadorNome } = usuarioLogado;

    try {
      await axios.post('http://localhost:3001/api/jogos', {
        nome: titulo,
        descricao,
        tipo,
        perguntas: pares.map(p => ({
          pergunta: p.item,
          correta: p.categoria,
          opcoes: []
        })),
        criadorId,
        criadorNome
      });
      alert('Jogo criado com sucesso!');
      onVoltar();
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar jogo');
    }
  };

  return (
    <div className={styles.criarContainer}>
      <div className={styles.formContainer}>
        <h2>Criar Novo Jogo</h2>

        <label>Título</label>
        <input value={titulo} onChange={e => setTitulo(e.target.value)} required />

        <label>Descrição</label>
        <input value={descricao} onChange={e => setDescricao(e.target.value)} />

        <label>Tipo de jogo</label>
        <select value={tipo} onChange={e => setTipo(e.target.value)}>
          <option value="item-categoria">Item - Categoria</option>
          <option value="termo-definicao">Termo - Definição</option>
        </select>

        {pares.map((par, index) => (
          <div key={index} className={styles.parInputs}>
            <input
              placeholder={tipo === 'item-categoria' ? 'Item' : 'Termo'}
              value={par.item}
              onChange={e => atualizarPar(index, 'item', e.target.value)}
            />
            <input
              placeholder={tipo === 'item-categoria' ? 'Categoria' : 'Definição'}
              value={par.categoria}
              onChange={e => atualizarPar(index, 'categoria', e.target.value)}
            />
          </div>
        ))}

        <div className={styles.botoes}>
          <button onClick={adicionarPar}>Adicionar Par</button>
          <button onClick={salvarJogo}>Salvar Jogo</button>
          <button onClick={onVoltar}>Voltar</button>
        </div>
      </div>
    </div>
  );
}

export default CriarJogo;
