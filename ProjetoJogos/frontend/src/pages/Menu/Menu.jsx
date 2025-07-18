import styles from './Menu.module.css';

function Menu({ onMudarPagina }) {
  return (
    <div className={styles.menuContainer}>
      <h1>Bem-vindo ao Mundo dos Jogos!</h1>
      <p>Crie, jogue e compartilhe jogos incríveis como quiz, memória e associação.</p>
      <div className={styles.botoes}>
        <button className={styles.botaoLink} onClick={() => onMudarPagina('criar')}>Criar Jogo</button>
        <button className={styles.botaoLink} onClick={() => onMudarPagina('jogar')}>Jogar</button>
        <button className={styles.botaoLink} onClick={() => onMudarPagina('ranking')}>Ver Rankings</button>
        <button className={styles.botaoLink} onClick={() => onMudarPagina('login')}>Sair</button>
      </div>
    </div>
  );
}

export default Menu;
