import { useState } from 'react';
import axios from 'axios';
import styles from './Cadastro.module.css';

function Cadastro({ onMudarPagina }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const validarEmail = (email) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  };

  const validarNome = (nome) => {
    const regex = /^[A-Za-zÀ-ÿ\s]+$/;
    return regex.test(nome);
  };

  const handleCadastro = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    if (!validarNome(nome)) {
      return setErro('Nome inválido. Use apenas letras e espaços.');
    }

    if (!validarEmail(email)) {
      return setErro('E-mail inválido.');
    }

    if (senha !== confirmaSenha) {
      return setErro('Senhas não conferem.');
    }

    try {
      const res = await axios.post('http://localhost:3001/api/usuarios/cadastro', {
        nome,
        email,
        senha
      });

      const usuario = res.data;
      sessionStorage.setItem('usuario', JSON.stringify(usuario));
      setSucesso('Usuário cadastrado com sucesso!');
      setTimeout(() => onMudarPagina('menu'), 1000); // Redireciona após 1s
    } catch (err) {
      if (err.response?.data?.erro) {
        setErro(err.response.data.erro);
      } else {
        setErro('Erro ao cadastrar usuário. Tente novamente mais tarde.');
      }
    }
  };

  return (
    <div className={styles.cadastroBody}>
      <div className={styles['form-container']}>
        <h2>Crie sua conta</h2>
        <form onSubmit={handleCadastro}>
          <label htmlFor="nome">Nome</label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={e => setNome(e.target.value)}
            required
          />

          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            type="password"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            required
          />

          <label htmlFor="confirmaSenha">Confirmar Senha</label>
          <input
            id="confirmaSenha"
            type="password"
            value={confirmaSenha}
            onChange={e => setConfirmaSenha(e.target.value)}
            required
          />

          {/* Mensagem de erro */}
          {erro && <div className={styles.erroMensagem}>{erro}</div>}

          {/* Mensagem de sucesso */}
          {sucesso && <div className={styles.sucessoMensagem}>{sucesso}</div>}

          <button type="submit">Cadastrar</button>
        </form>
        <div className={styles.voltar}>
          <p>
            Já tem uma conta?{' '}
            <a href="#" onClick={() => onMudarPagina('login')}>
              Faça login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
