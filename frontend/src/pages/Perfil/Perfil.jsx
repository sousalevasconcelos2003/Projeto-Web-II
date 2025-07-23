import { useEffect, useState } from "react";
import styles from "./Perfil.module.css";

function Perfil({ onAlterarSenha, onExcluirConta, onVerRanking, onVerJogos }) {
  const [usuario, setUsuario] = useState({});

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("usuario"));
    if (user) setUsuario(user);
  }, []);

  return (
    <div className={styles.perfilContainer}>
      <div className={styles.perfilCard}>
        <img
          src={usuario.foto || "/default-user.png"}
          alt="Foto de Perfil"
          className={styles.fotoPerfil}
        />
        <h2>{usuario.nome}</h2>
        <p><strong>Email:</strong> {usuario.email}</p>
        <p><strong>Data de Nascimento:</strong> {usuario.nascimento}</p>

        <div className={styles.botoes}>
          <button onClick={onAlterarSenha}>Alterar Senha</button>
          <button onClick={onVerRanking}>Ver Ranking</button>
          <button onClick={onVerJogos}>Meus Jogos</button>
          <button onClick={onExcluirConta} className={styles.excluir}>
            Excluir Conta
          </button>
          
        </div>
      </div>
    </div>
  );
}

export default Perfil;
