import { useState, useEffect } from "react";
import styles from "./Associacao.module.css";

function Associacao({ jogo, finalizarJogo, setAcertos, setErros, onVoltar }) {
  const itens = jogo.perguntas.map((p) => p.pergunta);
  const categorias = jogo.perguntas.map((p) => p.correta);

  const [arrastados, setArrastados] = useState([]);
  const [paresCertos, setParesCertos] = useState([]);
  const [categoriaHover, setCategoriaHover] = useState(null);

  const onDragStart = (e, item) => {
    e.dataTransfer.setData("item", item);
  };

  const onDrop = (e, categoria) => {
    e.preventDefault();
    setCategoriaHover(null);

    const item = e.dataTransfer.getData("item");

    if (arrastados.includes(item)) return;

    if (jogo.perguntas.some((p) => p.pergunta === item && p.correta === categoria)) {
      setParesCertos((c) => [...c, item]);
      setAcertos((a) => a + 1);
    } else {
      setErros((e) => e + 1);
    }

    setArrastados((a) => [...a, item]);
  };

  useEffect(() => {
    if (arrastados.length === itens.length && itens.length > 0) {
      alert(`Fim do jogo!\nAcertos: ${paresCertos.length}\nErros: ${arrastados.length - paresCertos.length}`);
      finalizarJogo();
    }
  }, [arrastados, paresCertos, itens.length, finalizarJogo]);

  const onDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <h2>{jogo.nome} - Associação</h2>
      <div className={styles.flexRow}>
        <div className={styles.column}>
          <h3>Itens</h3>
          {itens.map((item, i) => (
            <div
              key={i}
              draggable={!arrastados.includes(item)}
              onDragStart={(e) => onDragStart(e, item)}
              className={`${styles.item} ${arrastados.includes(item) ? styles.dragged : ""}`}
            >
              {item}
            </div>
          ))}
        </div>
        <div className={styles.column}>
          <h3>Categorias</h3>
          {categorias.map((cat, i) => (
            <div
              key={i}
              onDrop={(e) => onDrop(e, cat)}
              onDragOver={onDragOver}
              onDragEnter={() => setCategoriaHover(cat)}
              onDragLeave={() => setCategoriaHover(null)}
              className={`${styles.categoria} ${categoriaHover === cat ? styles.dragover : ""}`}
            >
              {cat}
            </div>
          ))}
        </div>
      </div>

      <button className={styles.voltarBtn} onClick={onVoltar}>
        Voltar
      </button>
    </div>
  );
}

export default Associacao;
