import { useState, useEffect, useRef } from "react";
import styles from "./VerdadeiroFalso.module.css";

function VerdadeiroFalso({ jogo, finalizarJogo, setAcertos, setErros, onVoltar }) {
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [respostas, setRespostas] = useState([]);
  const [fraseMontada, setFraseMontada] = useState("");
  const [respostaCorreta, setRespostaCorreta] = useState(true);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [respostaCerta, setRespostaCerta] = useState(null);

  const somFundo = useRef(null);
  const somAcerto = useRef(null);
  const somErro = useRef(null);

  const gerarFrase = () => {
    const ehVerdadeiro = Math.random() < 0.5;
    let frase = "";
    let respostaCorreta = false;

    const termo = perguntaAtual.pergunta;
    const definicao = perguntaAtual.correta;

    if (ehVerdadeiro) {
      frase = `${definicao} está relacionado à ${termo}`;
      respostaCorreta = true;
    } else {
      let outra;
      do {
        const aleatorio = Math.floor(Math.random() * jogo.perguntas.length);
        outra = jogo.perguntas[aleatorio].correta;
      } while (outra === definicao);
      frase = `${outra} está relacionado à ${termo}`;
      respostaCorreta = false;
    }

    return { frase, respostaCorreta };
  };

  useEffect(() => {
    const nova = gerarFrase();
    setFraseMontada(nova.frase);
    setRespostaCorreta(nova.respostaCorreta);
  }, [indiceAtual]);

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

  const responder = (respostaUsuario) => {
    setRespostaSelecionada(respostaUsuario);
    setRespostaCerta(respostaUsuario === respostaCorreta);

    if (respostaUsuario === respostaCorreta) {
      setAcertos((a) => a + 1);
      somAcerto.current?.play();
    } else {
      setErros((e) => e + 1);
      somErro.current?.play();
    }

    const novaResposta = {
      pergunta: fraseMontada,
      correta: respostaCorreta ? "Verdadeiro" : "Falso",
      respostaUsuario: respostaUsuario ? "Verdadeiro" : "Falso",
    };

    setTimeout(() => {
      setRespostas([...respostas, novaResposta]);
      setRespostaSelecionada(null);
      setRespostaCerta(null);

      if (indiceAtual + 1 < jogo.perguntas.length) {
        setIndiceAtual(indiceAtual + 1);
      } else {
        finalizarJogo();
      }
    }, 800);
  };

  const perguntaAtual = jogo.perguntas[indiceAtual];

  return (
    <div className={styles.container}>
      <h2>{jogo.nome} - Verdadeiro ou Falso</h2>
      <p className={styles.pergunta}>{fraseMontada}</p>
      <div className={styles.botoes}>
        <button
          onClick={() => responder(true)}
          className={
            respostaSelecionada === true
              ? respostaCerta
                ? styles.correta
                : styles.errada
              : ""
          }
        >
          Verdadeiro
        </button>
        <button
          onClick={() => responder(false)}
          className={
            respostaSelecionada === false
              ? respostaCerta
                ? styles.correta
                : styles.errada
              : ""
          }
        >
          Falso
        </button>
      </div>
      <button className={styles.voltarBtn} onClick={onVoltar}>Voltar</button>

      {/* 🎵 Áudios */}
      <audio ref={somFundo} src="/sounds/fundo.mp3.mp3" />
      <audio ref={somAcerto} src="/sounds/acerto.mp3" />
      <audio ref={somErro} src="/sounds/erro.mp3" />
    </div>
  );
}

export default VerdadeiroFalso;
