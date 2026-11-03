import { useState, useEffect } from 'react'
import { listarFavoritas } from '../../services/api'

function TelaFavoritas() {
  const [favoritas, setFavoritas] = useState([])


  useEffect(() => {
    listarFavoritas().then((lista) => {
      setFavoritas(lista)
    })
  }, [])

  if(favoritas.length <= 0){
    return (
      <div>
      <h1>Tela de Favoritas</h1>
      <p>Você não possui favoritas cadastradas!</p>
    </div>
    )
  }

  



  return (
    <div>
      <h1>Tela de Favoritas</h1>
      <ul>
        {favoritas.map((fav) => (
          <li key={fav.id}>
            Nome: {fav.nome} <br />
            Origem: {fav.origem} <br />
            Destino: {fav.destino} <br />
            Caminho a pé: {Number(fav.ultima_duracao_min)} min
          </li>
        ))}
      </ul>
    </div>
  )

}
export default TelaFavoritas