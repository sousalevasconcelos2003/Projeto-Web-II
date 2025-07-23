import { useState } from 'react';
import axios from 'axios';
import styles from './Login.module.css';

function Login({ onMudarPagina }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(''); // <- novo estado para erro

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro(''); // limpa erro anterior

    try {
      const res = await axios.post('http://localhost:3001/api/usuarios/login', {
        email,
        senha
      });

      const usuario = res.data;
      sessionStorage.setItem('usuario', JSON.stringify(usuario));

      onMudarPagina('menu');
    } catch (err) {
      if (err.response?.data?.erro) {
        setErro(err.response.data.erro); // exibe erro do backend
      } else {
        setErro('Erro ao fazer login. Tente novamente mais tarde.');
      }
    }
  };

  return (
    <div className={styles.loginBody}>
      <div className={styles['form-container']}>
        <h2>Faça Login</h2>
        <form onSubmit={handleLogin}>
          <label>E-mail</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <label>Senha</label>
          <input
            type="password"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            required
          />

          {/* Caixa de erro visível apenas se existir erro */}
          {erro && <div className={styles.erroMensagem}>{erro}</div>}

          <button type="submit">Entrar</button>
        </form>
        <div className={styles.voltar}>
          <p>
            Não tem uma conta?{' '}
            <button onClick={() => onMudarPagina('cadastro')}>
              Cadastre-se
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
