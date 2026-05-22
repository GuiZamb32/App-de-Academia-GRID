import { useEffect, useState } from 'react'

import '../styles/Exercicios.css'

import {
  listarExercicios,
  criarExercicio,
} from '../services/api'

export default function Exercicios({
  treinoId,
  treinoNome,
  voltar,
}) {
  const [exercicios, setExercicios] = useState([])

  const [nome, setNome] = useState('')

  useEffect(() => {
    carregarExercicios()
  }, [])

  async function carregarExercicios() {
    try {
      const data = await listarExercicios(treinoId)

      setExercicios(data)

    } catch (err) {
      console.log(err)
    }
  }

  async function handleCriar() {
    try {
      if (!nome) return

      await criarExercicio({
        treino_id: treinoId,
        nome,
        grupo: 'Peito',
        series: 3,
        reps: 12,
        carga: 0,
      })

      setNome('')

      carregarExercicios()

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="exercicios">

      <header className="exercicios__header">

        <button
          className="exercicios__back"
          onClick={voltar}
        >
          ←
        </button>

        <h1 className="exercicios__title">
          {treinoNome}
        </h1>

      </header>

      <div className="exercicios__create">

        <input
          type="text"
          placeholder="Nome do exercício"
          className="exercicios__input"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <button
          className="exercicios__button"
          onClick={handleCriar}
        >
          ADICIONAR
        </button>

      </div>

      <section className="exercicios__list">

        {exercicios.map((exercicio) => (
          <div
            key={exercicio.id}
            className="exercicio__card"
          >
            <h2>{exercicio.nome}</h2>

            <p>
              {exercicio.series}x{exercicio.reps}
            </p>
          </div>
        ))}

      </section>

    </div>
  )
}