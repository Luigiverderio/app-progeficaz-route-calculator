import { useState, useEffect } from 'react'
import { listarFavoritas, apagarFavorita } from '../../services/api'

const estiloCartao = {
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: "12px",
  padding: "16px",
  textAlign: "left",
}

function TelaFavoritas() {
  const [favoritas, setFavoritas] = useState([])
  const [erro, setErro] = useState("")

  useEffect(() => {
    listarFavoritas()
      .then((lista) => setFavoritas(lista))
      .catch(() => setErro("Não foi possível carregar as favoritas."))
  }, [])

  function apagar(id) {
    setErro("")
    apagarFavorita(id)
      .then(() => {
        setFavoritas(favoritas.filter((fav) => fav.id !== id))
      })
      .catch(() => setErro("Não foi possível apagar a favorita."))
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h1>Minhas Favoritas</h1>

      {erro && <p style={{ color: "red" }}>{erro}</p>}

      {favoritas.length === 0 && !erro && (
        <p>Você não possui favoritas cadastradas!</p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {favoritas.map((fav) => (
          <div key={fav.id} style={estiloCartao}>
            <h2 style={{ margin: "0 0 8px", fontSize: "1.2rem" }}>{fav.nome}</h2>
            <p>{fav.origem} → {fav.destino}</p>
            <p>Caminho a pé: <strong>{Number(fav.ultima_duracao_min)} min</strong></p>
            <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
              <button onClick={() => apagar(fav.id)} style={{ background: "#ff6b6b" }}>
                Apagar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TelaFavoritas