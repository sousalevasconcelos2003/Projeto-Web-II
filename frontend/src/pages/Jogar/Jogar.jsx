import { useState, useEffect } from "react";
import axios from "axios";

import Memoria from "../Jogos/Memoria/Memoria";
import Quiz from "../Jogos/Quiz/Quiz";
import Associacao from "../Jogos/Associacao/Associacao";
import VerdadeiroFalso from "../Jogos/VerdadeiroFalso/VerdadeiroFalso";

import styles from "./Jogar.module.css";

function Jogar({ onVoltar }) {
  const [jogos, setJogos] = useState([]);
  const [modo, setModo] = useState("");
  const [jogo, setJogo] = useState(null);
  const [index, setIndex] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [erros, setErros] = useState(0);
  const [inicio, setInicio] = useState(null);
  const [tempoJogo, setTempoJogo] = useState(0);
  const [paresMemoria, setParesMemoria] = useState([]);
  const [selecionados, setSelecionados] = useState([]);
  const [acertados, setAcertados] = useState([]);
  const [revelando, setRevelando] = useState(false);

  const usuario = JSON.parse(sessionStorage.getItem("usuario"));

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/jogos")
      .then((res) => setJogos(res.data))
      .catch(() => alert("Erro ao carregar jogos"));
  }, []);

  useEffect(() => {
    if (!inicio || !modo) return;
    const interval = setInterval(() => {
      setTempoJogo(Math.floor((Date.now() - inicio) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [inicio, modo]);

  function shuffle(array) {
    let arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function iniciar(jogoSelecionado, modoSelecionado) {
    setJogo(jogoSelecionado);
    setModo(modoSelecionado);
    setIndex(0);
    setAcertos(0);
    setErros(0);
    setInicio(Date.now());
    setTempoJogo(0);
    setSelecionados([]);
    setAcertados([]);
    setRevelando(false);

    if (modoSelecionado === "memoria") {
      const pares = jogoSelecionado.perguntas.map((p) => ({
        item: p.pergunta,
        categoria: p.correta,
      }));
      let cards = [];
      pares.forEach((p) => {
        cards.push({ texto: p.item, id: Math.random(), tipo: "item" });
        cards.push({ texto: p.categoria, id: Math.random(), tipo: "categoria" });
      });
      cards = shuffle(cards);
      setParesMemoria(cards);

      setRevelando(true);
      setTimeout(() => {
        setRevelando(false);
      }, 5000);
    } else {
      setParesMemoria([]);
    }
  }

  function finalizarJogo() {
    if (!usuario || !usuario._id) {
      alert("Erro: usuário não identificado");
      return;
    }
    axios
      .post("http://localhost:3001/api/ranking", {
        jogoId: jogo._id,
        nome: usuario.nome,
        usuarioId: usuario._id,
        modo,
        pontos: acertos,
        erros,
        tempo: tempoJogo,
      })
      .catch(() => alert("Erro ao salvar ranking"));

    alert(
      `Fim do jogo!\nAcertos: ${acertos}\nErros: ${erros}\nTempo: ${tempoJogo}s`
    );
    setModo("");
    setJogo(null);
  }

  function selecionarMemoria(i) {
    if (revelando) return; 
    if (
      selecionados.length === 2 ||
      selecionados.includes(i) ||
      acertados.includes(i)
    )
      return;

    const novosSelecionados = [...selecionados, i];
    setSelecionados(novosSelecionados);

    if (novosSelecionados.length === 2) {
      const primeiro = paresMemoria[novosSelecionados[0]];
      const segundo = paresMemoria[novosSelecionados[1]];

      if (primeiro.texto === segundo.texto) {
        setAcertos((a) => a + 1);
        setAcertados((prev) => [...prev, novosSelecionados[0], novosSelecionados[1]]);
        setTimeout(() => {
          setSelecionados([]);
          if (acertados.length + 2 === paresMemoria.length) {
            finalizarJogo();
          }
        }, 1000);
      } else {
        setErros((e) => e + 1);
        setTimeout(() => setSelecionados([]), 1000);
      }
    }
  }

  if (!modo) {
    return (
      <div className={styles.jogarContainer}>
        <h2>Escolha um jogo</h2>
        {jogos.map((j) => (
          <div key={j._id} className={styles.jogoCard}>
            <h3>{j.nome}</h3>
            <button onClick={() => iniciar(j, "quiz")}>Jogar Quiz</button>
            <button onClick={() => iniciar(j, "memoria")}>Jogo da Memória</button>
            <button onClick={() => iniciar(j, "associacao")}>Jogo de Associação</button>
            <button onClick={() => iniciar(j, "verdadeiroFalso")}>Jogar Verdadeiro ou Falso</button>
          </div>
        ))}
        <button className={styles.voltarBtn} onClick={onVoltar}>
          Voltar
        </button>
      </div>
    );
  }

  if (modo === "quiz") {
    return (
      <Quiz
        jogo={jogo}
        index={index}
        responderQuiz={(opcao) => {
          const perguntaAtual = jogo.perguntas[index];
          const acerto = opcao === perguntaAtual.correta;
          if (acerto) setAcertos((a) => a + 1);
          else setErros((e) => e + 1);
          if (index + 1 < jogo.perguntas.length) setIndex((i) => i + 1);
          else finalizarJogo();
        }}
      />
    );
  }

  if (modo === "memoria") {
    return (
      <>
        <div style={{ textAlign: "center", fontWeight: "bold", marginBottom: 10 }}>
          Tempo: {tempoJogo}s
        </div>
        <Memoria
          jogo={jogo}
          paresMemoria={paresMemoria}
          selecionados={selecionados}
          selecionarMemoria={selecionarMemoria}
          acertados={acertados}
          onVoltar={onVoltar}
          revelando={revelando}
        />
      </>
    );
  }

  if (modo === "associacao") {
    return (
      <Associacao
        jogo={jogo}
        finalizarJogo={finalizarJogo}
        setAcertos={setAcertos}
        setErros={setErros}
        onVoltar={onVoltar}
      />
    );
  }

  if (modo === "verdadeiroFalso") {
  return (
    <VerdadeiroFalso
      jogo={jogo}
      finalizarJogo={finalizarJogo}
      setAcertos={setAcertos}
      setErros={setErros}
      onVoltar={() => {
        setModo("");
        setJogo(null);
      }}
    />
  );
}


  return null;
}

export default Jogar;
