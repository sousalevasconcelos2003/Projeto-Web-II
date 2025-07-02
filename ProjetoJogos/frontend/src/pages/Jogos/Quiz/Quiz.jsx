import { useMemo } from "react";
import styles from './Quiz.module.css';

function Quiz({ jogo, index, responderQuiz }) {
  const perguntaAtual = jogo.perguntas[index];

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
        <button key={i} onClick={() => responderQuiz(op)}>
          {op}
        </button>
      ))}
    </div>
  );
}

export default Quiz;
