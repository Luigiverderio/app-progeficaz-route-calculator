import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function TelaCadastro() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setErro("");

    if (!name || !email || !password) {
      setErro("Preencha nome, e-mail e senha.");
      return;
    }

    try {
      await api.post("/auth/register", { name, email, password });
      navigate("/login");
    } catch (error) {
      const status = error.response?.status;
      if (status === 409) {
        setErro("Esse e-mail já está cadastrado.");
      } else if (status === 400) {
        setErro("Preencha nome, e-mail e senha.");
      } else {
        setErro("Não foi possível cadastrar. Tente novamente.");
      }
    }
  }

  return (
    <div>
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </form>

      {erro && <p style={{ color: "red" }}>{erro}</p>}

      <p>
        Já tem conta? <Link to="/login">Entrar</Link>
      </p>
    </div>
  );
}