import { useEffect, useState } from 'react'

import '../styles/TreinoAtual.css'

export default function TreinoAtual({
  treinoNome = 'TREINO B',
  voltar,
}) {
  const [tempo, setTempo] = useState(0)

  const [exercicios, setExercicios] = useState([
    {
      id: 1,
      nome: 'Supino Máquina',
      categoria: 'Peito',
      aberto: true,
      series: [
        { id: 1, reps: 12, carga: 10, feito: false },
        { id: 2, reps: 12, carga: 10, feito: false },
        { id: 3, reps: 12, carga: 10, feito: false },
      ],
    },
    {
      id: 2,
      nome: 'Crucifixo',
      categoria: 'Peito',
      aberto: false,
      series: [
        { id: 1, reps: 12, carga: 10, feito: false },
        { id: 2, reps: 12, carga: 10, feito: false },
        { id: 3, reps: 12, carga: 10, feito: false },
      ],
    },
    {
      id: 3,
      nome: 'Remada Baixa',
      categoria: 'Costas',
      aberto: false,
      series: [
        { id: 1, reps: 12, carga: 10, feito: false },
        { id: 2, reps: 12, carga: 10, feito: false },
        { id: 3, reps: 12, carga: 10, feito: false },
      ],
    },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setTempo((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  function formatarTempo(segundos) {
    const min = String(Math.floor(segundos / 60)).padStart(2, '0')
    const sec = String(segundos % 60).padStart(2, '0')

    return `${min}:${sec}`
  }

  function toggleExercicio(id) {
    setExercicios((prev) =>
      prev.map((ex) =>
        ex.id === id
          ? { ...ex, aberto: !ex.aberto }
          : ex
      )
    )
  }

  function toggleSerie(exercicioId, serieId) {
    setExercicios((prev) =>
      prev.map((exercicio) => {
        if (exercicio.id !== exercicioId) return exercicio

        return {
          ...exercicio,
          series: exercicio.series.map((serie) =>
            serie.id === serieId
              ? { ...serie, feito: !serie.feito }
              : serie
          ),
        }
      })
    )
  }

  const totalExercicios = exercicios.length

  const exerciciosConcluidos = exercicios.filter((ex) =>
    ex.series.every((serie) => serie.feito)
  ).length

  const totalSeries = exercicios.reduce(
    (acc, ex) => acc + ex.series.length,
    0
  )

  const seriesFeitas = exercicios.reduce(
    (acc, ex) =>
      acc + ex.series.filter((s) => s.feito).length,
    0
  )

  const progresso = totalSeries
    ? Math.round((seriesFeitas / totalSeries) * 100)
    : 0

  return (
    <div className="treino-atual">

      <header className="treino-header">

        <button
          className="treino-back"
          onClick={voltar}
        >
          ←
        </button>

        <h1>{treinoNome}</h1>

        <span className="treino-timer">
          {formatarTempo(tempo)}
        </span>

      </header>

      <section className="progresso-card">

        <div>
          <h2>
            {exerciciosConcluidos}/{totalExercicios}
          </h2>
          <p>Exercícios</p>
        </div>

        <div>
          <h2>
            {seriesFeitas}/{totalSeries}
          </h2>
          <p>Séries</p>
        </div>

        <div>
          <h2>{progresso}%</h2>
          <p>Progresso</p>
        </div>

      </section>

      <section className="lista-exercicios">

        {exercicios.map((exercicio, index) => (

          <div
            key={exercicio.id}
            className="card-exercicio"
          >

            <div
              className="card-header"
              onClick={() =>
                toggleExercicio(exercicio.id)
              }
            >

              <div className="header-left">

                <span className="numero">
                  {index + 1}
                </span>

                <h3>{exercicio.nome}</h3>

              </div>

              <div className="header-right">

                <span className="categoria">
                  {exercicio.categoria}
                </span>

                <span>
                  {exercicio.aberto ? '⌃' : '⌄'}
                </span>

              </div>

            </div>

            {exercicio.aberto && (

              <div className="series-container">

                {exercicio.series.map((serie) => (

                  <div
                    key={serie.id}
                    className="serie-card"
                  >

                    <span className="serie-numero">
                      {serie.id}
                    </span>

                    <div className="campo">

                      <small>Reps</small>

                      <input
                        type="number"
                        value={serie.reps}
                        readOnly
                      />

                    </div>

                    <div className="campo">

                      <small>KG</small>

                      <input
                        type="number"
                        value={serie.carga}
                        readOnly
                      />

                    </div>

                    <button
                      className={
                        serie.feito
                          ? 'check ativo'
                          : 'check'
                      }
                      onClick={() =>
                        toggleSerie(
                          exercicio.id,
                          serie.id
                        )
                      }
                    >
                      ✓
                    </button>

                  </div>

                ))}

              </div>

            )}

          </div>

        ))}

      </section>

      <button
        className="finalizar-btn"
        onClick={voltar}
      >
        FINALIZAR TREINO ✓
      </button>

    </div>
  )
}