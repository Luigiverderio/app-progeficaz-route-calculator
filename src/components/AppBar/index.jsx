import { NavLink, useNavigate } from "react-router-dom";
import { getName, logout } from "../../services/auth";
import "./index.css";

export default function AppBar() {
  const navigate = useNavigate();

  function sair() {
    logout();
    navigate("/login");
  }

  return (
    <header className="appbar">
      <span className="appbar-ola">Olá, {getName()}</span>
      <nav className="appbar-links">
        <NavLink to="/mapa">Mapa</NavLink>
        <NavLink to="/favoritas">Favoritas</NavLink>
        <button onClick={sair} className="appbar-sair">Sair</button>
      </nav>
    </header>
  );
}