import { useEffect, useState } from 'react'

import '../styles/Treinos.css'

import { listarTreinos } from '../services/api'

export default function Treinos({
  voltar,
  abrirCriarTreino,
  abrirExercicios,
}) {
  const [treinos, setTreinos] = useState([])

  useEffect(() => {
    carregarTreinos()
  }, [])

  async function carregarTreinos() {
    try {
      const data = await listarTreinos()

      setTreinos(data)

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="treinos">

      <header className="treinos__header">

        <button
          className="treinos__back"
          onClick={voltar}
        >
          ←
        </button>

        <h1 className="treinos__title">
          TREINOS
        </h1>

      </header>

      <section className="treinos__list">

        {treinos.map((treino) => (
          <div
            key={treino.id}
            className="treino__card"
            onClick={() => abrirExercicios(treino)}
          >
            <h2>{treino.nome}</h2>

            <p>
              Treino #{treino.id}
            </p>
          </div>
        ))}

      </section>

      <button
        className="treinos__button"
        onClick={abrirCriarTreino}
      >
        NOVO TREINO
      </button>

    </div>
  )
}