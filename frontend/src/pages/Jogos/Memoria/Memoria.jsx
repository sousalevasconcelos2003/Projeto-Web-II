import { useEffect, useRef } from "react";
import styles from "./Memoria.module.css";

function Memoria({
  jogo,
  paresMemoria,
  selecionados,
  selecionarMemoria,
  acertados,
  onVoltar,
  revelando,
}) {
  const somFundo = useRef(null);
  const somAcerto = useRef(null);
  const somErro = useRef(null);

  useEffect(() => {
    // Iniciar som de fundo
    if (somFundo.current) {
      somFundo.current.loop = true;
      somFundo.current.volume = 0.2;
      somFundo.current.play().catch(() => {});
    }

    return () => {
      if (somFundo.current) somFundo.current.pause();
    };
  }, []);

  useEffect(() => {
    // Quando 2 cartas forem selecionadas, verifica se houve acerto ou erro
    if (selecionados.length === 2) {
      const [i1, i2] = selecionados;
      const c1 = paresMemoria[i1];
      const c2 = paresMemoria[i2];

      const acertou = c1.texto === c2.texto;

      setTimeout(() => {
        if (acertou) {
          somAcerto.current?.play();
        } else {
          somErro.current?.play();
        }
      }, 100); // pequeno atraso para evitar tocar antes da exibição
    }
  }, [selecionados, paresMemoria]);

  return (
    <div className={styles.formContainer}>
      <h2>{jogo.nome} - Memória</h2>

      {/* 🎵 Áudios */}
      <audio ref={somFundo} src="/sounds/fundo.mp3.mp3" />
      <audio ref={somAcerto} src="/sounds/acerto.mp3" />
      <audio ref={somErro} src="/sounds/erro.mp3" />

      <div className={styles.memoriaGrid}>
        {paresMemoria.map((card, i) => {
          const isSelecionado = selecionados.includes(i);
          const isAcertado = acertados.includes(i);
          const mostrarTexto = revelando || isSelecionado || isAcertado;

          return (
            <div
              key={card.id}
              onClick={() => {
                if (!isAcertado && !mostrarTexto && selecionados.length < 2) {
                  selecionarMemoria(i);
                }
              }}
              className={`${styles.card} ${mostrarTexto ? styles.selected : ""} ${
                isAcertado ? styles.disabled : ""
              }`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (
                  (e.key === "Enter" || e.key === " ") &&
                  !isAcertado &&
                  !mostrarTexto &&
                  selecionados.length < 2
                ) {
                  selecionarMemoria(i);
                }
              }}
            >
              {mostrarTexto ? card.texto : ""}
            </div>
          );
        })}
      </div>

      <div className={styles.voltar}>
        <button onClick={onVoltar}>Voltar</button>
      </div>
    </div>
  );
}

export default Memoria;
