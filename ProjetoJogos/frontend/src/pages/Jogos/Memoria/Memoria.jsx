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
  return (
    <div className={styles.formContainer}>
      <h2>{jogo.nome} - Memória</h2>
      <div className={styles.memoriaGrid}>
        {paresMemoria.map((card, i) => {
          const isSelecionado = selecionados.includes(i);
          const isAcertado = acertados.includes(i);
          const mostrarTexto = revelando || isSelecionado || isAcertado;

          return (
            <div
              key={card.id}
              onClick={() => {
                if (!mostrarTexto && selecionados.length < 2) selecionarMemoria(i);
              }}
              className={`${styles.card} ${mostrarTexto ? styles.selected : ""} ${
                isAcertado ? styles.disabled : ""
              }`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (
                  (e.key === "Enter" || e.key === " ") &&
                  !mostrarTexto &&
                  selecionados.length < 2
                )
                  selecionarMemoria(i);
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
