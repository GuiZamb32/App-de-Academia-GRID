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

  const [form, setForm] = useState({
    nome: '',
    grupo: '',
    series: '',
    reps: '',
    carga: '',
  })

  useEffect(() => {
    if (treinoId) {
      carregarExercicios()
    }
  }, [treinoId])

  async function carregarExercicios() {
    try {
      const data = await listarExercicios(treinoId)

      setExercicios(Array.isArray(data) ? data : [])

    } catch (err) {
      console.log(err)
    }
  }

  async function handleCriar() {
    try {
      const {
        nome,
        grupo,
        series,
        reps,
        carga,
      } = form

      if (
        !nome ||
        !grupo ||
        !series ||
        !reps
      ) {
        return alert('Preencha os campos obrigatórios')
      }

      await criarExercicio({
        treino_id: treinoId,
        nome,
        grupo,
        series: Number(series),
        reps: Number(reps),
        carga: Number(carga || 0),
      })

      setForm({
        nome: '',
        grupo: '',
        series: '',
        reps: '',
        carga: '',
      })

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
          value={form.nome}
          onChange={(e) =>
            setForm({
              ...form,
              nome: e.target.value,
            })
          }
        />

        <select
          className="exercicios__input"
          value={form.grupo}
          onChange={(e) =>
            setForm({
              ...form,
              grupo: e.target.value,
            })
          }
        >
          <option value="">
            Grupo muscular
          </option>

          <option>Peito</option>
          <option>Costas</option>
          <option>Ombros</option>
          <option>Bíceps</option>
          <option>Tríceps</option>
          <option>Pernas</option>
          <option>Panturrilha</option>
          <option>Abdômen</option>
        </select>

        <input
          type="number"
          placeholder="Séries"
          className="exercicios__input"
          value={form.series}
          onChange={(e) =>
            setForm({
              ...form,
              series: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Repetições"
          className="exercicios__input"
          value={form.reps}
          onChange={(e) =>
            setForm({
              ...form,
              reps: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Carga (kg)"
          className="exercicios__input"
          value={form.carga}
          onChange={(e) =>
            setForm({
              ...form,
              carga: e.target.value,
            })
          }
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

            <div className="exercicio__infos">
              <span className="exercicio__badge">
                {exercicio.grupo}
              </span>

              <span className="exercicio__badge">
                {exercicio.series}x{exercicio.reps}
              </span>

              <span className="exercicio__badge">
                {exercicio.carga}kg
              </span>
            </div>
          </div>
        ))}

      </section>

    </div>
  )
}