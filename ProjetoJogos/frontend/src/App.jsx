import { useState } from "react";
import Cadastro from "./pages/Cadastro/Cadastro";
import Login from "./pages/Login/Login";
import Menu from "./pages/Menu/Menu";
import CriarJogo from "./pages/CriarJogo/CriarJogo";
import Jogar from "./pages/Jogar/Jogar";
import Ranking from "./pages/Ranking/Ranking";

function App() {
  const [pagina, setPagina] = useState("login");

  const renderizarPagina = () => {
    switch (pagina) {
      case "cadastro":
        return <Cadastro onMudarPagina={setPagina} />;
      case "login":
        return <Login onMudarPagina={setPagina} />;
      case "menu":
        return <Menu onMudarPagina={setPagina} />;
      case "criar":
        return <CriarJogo onVoltar={() => setPagina("menu")} />;
      case "jogar":
        return <Jogar onVoltar={() => setPagina("menu")} />;
      case "ranking":
        return <Ranking onVoltar={() => setPagina("menu")} />;
      default:
        return <Login onMudarPagina={setPagina} />;
    }
  };

  return <div className="app-container">{renderizarPagina()}</div>;
}

export default App;
