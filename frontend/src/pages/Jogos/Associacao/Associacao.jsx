import { useState, useEffect, useRef } from "react";
import styles from "./Associacao.module.css";

function Associacao({ jogo, finalizarJogo, setAcertos, setErros, onVoltar }) {
  const itens = jogo.perguntas.map((p) => p.pergunta);
  const categorias = jogo.perguntas.map((p) => p.correta);

  const [arrastados, setArrastados] = useState([]);
  const [paresCertos, setParesCertos] = useState([]);
  const [categoriaHover, setCategoriaHover] = useState(null);
  const [jogoFinalizado, setJogoFinalizado] = useState(false);

  const [categoriaRespondida, setCategoriaRespondida] = useState(null);
  const [foiAcerto, setFoiAcerto] = useState(null);

  const somFundo = useRef(null);
  const audioAcerto = useRef(null);
  const audioErro = useRef(null);

  const onDragStart = (e, item) => {
    e.dataTransfer.setData("item", item);
  };

  const onDrop = (e, categoria) => {
    e.preventDefault();
    setCategoriaHover(null);

    const item = e.dataTransfer.getData("item");

    if (arrastados.includes(item)) return;

    const acertou = jogo.perguntas.some((p) => p.pergunta === item && p.correta === categoria);

    setCategoriaRespondida(categoria);
    setFoiAcerto(acertou);

    if (acertou) {
      setParesCertos((c) => [...c, item]);
      setAcertos((a) => a + 1);
      audioAcerto.current?.play();
    } else {
      setErros((e) => e + 1);
      audioErro.current?.play();
    }

    setArrastados((a) => [...a, item]);

    // Resetar cor depois de 800ms
    setTimeout(() => {
      setCategoriaRespondida(null);
      setFoiAcerto(null);
    }, 800);
  };

  useEffect(() => {
    if (arrastados.length === itens.length && itens.length > 0) {
      finalizarJogo();
      setJogoFinalizado(true);
    }
  }, [arrastados, itens.length, finalizarJogo]);

  useEffect(() => {
    if (somFundo.current) {
      somFundo.current.loop = true;
      somFundo.current.volume = 0.2;
      somFundo.current.play().catch(() => {});
    }
    return () => {
      if (somFundo.current) somFundo.current.pause();
    };
  }, []);

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const acertos = paresCertos.length;
  const erros = arrastados.length - acertos;

  return (
    <div className={styles.container}>
      <h2>{jogo.nome} - Associação</h2>

      {/* 🎵 Áudios */}
      <audio ref={somFundo} src="/sounds/fundo.mp3.mp3" />
      <audio ref={audioAcerto} src="/sounds/acerto.mp3" />
      <audio ref={audioErro} src="/sounds/erro.mp3" />

      {jogoFinalizado ? (
        <div className={styles.resultado}>
          <h3>✅ Jogo Finalizado!</h3>
          <p>Acertos: <strong>{acertos}</strong></p>
          <p>Erros: <strong>{erros}</strong></p>
        </div>
      ) : (
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
                className={`
                  ${styles.categoria} 
                  ${categoriaHover === cat ? styles.dragover : ""} 
                  ${categoriaRespondida === cat ? (foiAcerto ? styles.correta : styles.errada) : ""}
                `}
              >
                {cat}
              </div>
            ))}
          </div>
        </div>
      )}

      <button className={styles.voltarBtn} onClick={onVoltar}>
        Voltar
      </button>
    </div>
  );
}

export default Associacao;
