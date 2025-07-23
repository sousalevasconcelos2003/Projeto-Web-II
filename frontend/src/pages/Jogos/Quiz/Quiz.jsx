import { useEffect, useMemo, useRef, useState } from "react";
import styles from './Quiz.module.css';

function Quiz({ jogo, index, responderQuiz }) {
  const perguntaAtual = jogo.perguntas[index];
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [respostaCerta, setRespostaCerta] = useState(null);

  const somFundo = useRef(null);
  const somAcerto = useRef(null);
  const somErro = useRef(null);

  useEffect(() => {
    if (somFundo.current) {
      somFundo.current.loop = true;
      somFundo.current.volume = 0.2;
      somFundo.current.play().catch(() => {});
    }
    return () => {
      if (somFundo.current) {
        somFundo.current.pause();
        somFundo.current.currentTime = 0;
      }
    };
  }, []);

  function tocarSom(tipo) {
    if (tipo === "acerto" && somAcerto.current) {
      somAcerto.current.play();
    } else if (tipo === "erro" && somErro.current) {
      somErro.current.play();
    }
  }

  function handleResposta(op) {
    const correta = perguntaAtual.correta;
    const ehCerta = op === correta;
    setRespostaSelecionada(op);
    setRespostaCerta(ehCerta);
    tocarSom(ehCerta ? "acerto" : "erro");

    setTimeout(() => {
      setRespostaSelecionada(null);
      setRespostaCerta(null);
      responderQuiz(op);
    }, 800);
  }

  function pegarDuasAlternativas(arr) {
    const copy = [...arr];
    const escolhidas = [];
    while (escolhidas.length < 2 && copy.length > 0) {
      const randIndex = Math.floor(Math.random() * copy.length);
      escolhidas.push(copy.splice(randIndex, 1)[0]);
    }
    return escolhidas;
  }

  const alternativas = useMemo(() => {
    const outrasRespostas = jogo.perguntas
      .filter((_, i) => i !== index)
      .map(p => p.correta);

    const alternativasErradas = pegarDuasAlternativas(outrasRespostas);

    return [perguntaAtual.correta, ...alternativasErradas].sort(() => Math.random() - 0.5);
  }, [jogo.perguntas, index, perguntaAtual.correta]);

  return (
    <div className={styles.quizContainer}>
      <h2>{jogo.nome} - Quiz</h2>
      <p>
        Qual tem relação com: <b>{perguntaAtual.pergunta}</b>?
      </p>
      {alternativas.map((op, i) => (
        <button
          key={i}
          onClick={() => handleResposta(op)}
          className={
            respostaSelecionada === op
              ? respostaCerta
                ? styles.correta
                : styles.errada
              : ""
          }
          disabled={respostaSelecionada !== null}
        >
          {op}
        </button>
      ))}

      <audio ref={somFundo} src="/sounds/fundo.mp3.mp3" />
      <audio ref={somAcerto} src="/sounds/acerto.mp3" />
      <audio ref={somErro} src="/sounds/erro.mp3" />
    </div>
  );
}

export default Quiz;
