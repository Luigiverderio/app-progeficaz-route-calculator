import { useState } from 'react';
import { login } from '../../services/auth.js'
import { Link, useNavigate } from 'react-router-dom';

function TelaLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate()

  async function entrar(event) {
    event.preventDefault();
    setErro("");

    if (!email.trim() || !senha) {
      setErro("Preencha o e-mail e a senha.");
      return;
    }

    try {
      await login(email, senha)
      navigate('/mapa')
    } catch (error) {
      if (error.response?.status === 401) {
        setErro("E-mail ou senha incorretos.");
      } else {
        setErro("Não foi possível entrar. Tente novamente.");
      }
    }
  }

  return (
    <div className="auth-card">
      <h1>Faça seu Login</h1>
      <form onSubmit={entrar}>
        <label htmlFor="email">Email:</label>
        <input id="email" value={email} name="email" onChange={(event) => setEmail(event.target.value)} type='email' />
        <label htmlFor="senha">Senha:</label>
        <input id="senha" value={senha} name="senha" onChange={(event) => setSenha(event.target.value)} type='password' />
        <button type="submit">Entrar</button>
      </form>

      {erro && <p style={{ color: "red" }}>{erro}</p>}

      <p>
        Não tem conta? <Link to="/cadastro">Cadastre-se</Link>
      </p>
    </div>
  )
}

export default TelaLogin