
import { useState } from 'react';
import { login } from '../../services/auth.js'
import { useNavigate } from 'react-router-dom';


function TelaLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate()

  async function entrar(event) {
    event.preventDefault();
    try {
      await login(email, senha)
      navigate('/mapa')
    } catch (error) {
      console.log(error)
    }
  }
    return (
      <div className="auth-card">
        <h1>Faça seu Login</h1>
        <form onSubmit={entrar}>
          <label htmlFor="email">Email:</label>
          <input value={email} name="email" onChange={(event) => setEmail(event.target.value)} type='email' />
          <label htmlFor="senha">Senha:</label>
          <input value={senha} name="senha" onChange={(event) => setSenha(event.target.value)} type='password' />
          <button type="submit">Entrar</button>
        </form>
      </div>
    )
  }


  export default TelaLogin