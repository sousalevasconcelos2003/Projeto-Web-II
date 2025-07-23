import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Ranking.module.css"; 

function Ranking({ onVoltar }) {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/ranking")
      .then((res) => setRanking(res.data))
      .then(console.log(ranking))
      .catch(() => alert("Erro ao carregar o ranking"));
  }, []);

  return (
    <div className={styles.formContainer}>
      <h2>Ranking</h2>
      <div className={styles.rankingTable}>
        <div className={styles.rankingHeader}>
          <span>Usuário</span>
          <span>Modo</span>
          <span>Acertos</span>
          <span>Erros</span>
        </div>

        {ranking.map((item, index) => (
          
          <div key={index} className={styles.rankingRow}>
            <span>{item.nome || "Desconhecido"}</span>
            <span>{item.modo}</span>
            <span>{item.pontos}</span>
            <span>{item.erros}</span>
          </div>
        ))}
      </div>

      <div className={styles.voltar}>
        <button onClick={onVoltar}>Voltar</button>
      </div>
    </div>
  );
}

export default Ranking;
