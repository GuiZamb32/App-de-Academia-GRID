import { useEffect, useState } from 'react'
import '../styles/TreinoAtual.css'
import { listarExercicios } from '../services/api'

export default function TreinoAtual({
  treinoId,
  treinoNome = 'TREINO',
  voltar,
}) {
  const [tempo, setTempo] = useState(0)
  const [exercicios, setExercicios] = useState([])
  const [carregando, setCarregando] = useState(true)

  // Recupera o tempo salvo
  useEffect(() => {
    const tempoSalvo = localStorage.getItem(
      `treino_tempo_${treinoId}`
    )

    if (tempoSalvo) {
      setTempo(Number(tempoSalvo))
    }
  }, [treinoId])

  // Cronômetro
  useEffect(() => {
    const interval = setInterval(() => {
      setTempo((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Salva o tempo
  useEffect(() => {
    if (treinoId) {
      localStorage.setItem(
        `treino_tempo_${treinoId}`,
        tempo
      )
    }
  }, [tempo, treinoId])

  // Carrega os exercícios
  useEffect(() => {
    async function buscarDados() {
      if (!treinoId) return

      try {
        setCarregando(true)

        const progressoSalvo = localStorage.getItem(
          `treino_progresso_${treinoId}`
        )

        if (progressoSalvo) {
          setExercicios(JSON.parse(progressoSalvo))
          setCarregando(false)
          return
        }

        const dadosBanco = await listarExercicios(treinoId)

        const dadosFormatados = dadosBanco.map((ex, index) => {
          const listaSeries = []

          for (let i = 1; i <= (ex.series || 3); i++) {
            listaSeries.push({
              id: i,
              reps: ex.repeticoes || 12,
              carga: ex.carga || 10,
              feito: false,
            })
          }

          return {
            id: ex.id,
            nome: ex.nome,
            categoria:
              ex.grupo_muscular || 'Categoria',
            aberto: index === 0,
            series: listaSeries,
          }
        })

        setExercicios(dadosFormatados)
      } catch (err) {
        console.error(
          'Erro ao carregar treino atual:',
          err
        )
      } finally {
        setCarregando(false)
      }
    }

    buscarDados()
  }, [treinoId])

  // Salva o progresso
  useEffect(() => {
    if (treinoId && exercicios.length > 0) {
      localStorage.setItem(
        `treino_progresso_${treinoId}`,
        JSON.stringify(exercicios)
      )
    }
  }, [exercicios, treinoId])

  function formatarTempo(segundos) {
    const min = String(
      Math.floor(segundos / 60)
    ).padStart(2, '0')

    const sec = String(
      segundos % 60
    ).padStart(2, '0')

    return `${min}:${sec}`
  }

  function toggleExercicio(id) {
    setExercicios((prev) =>
      prev.map((ex) =>
        ex.id === id
          ? {
              ...ex,
              aberto: !ex.aberto,
            }
          : ex
      )
    )
  }

  function toggleSerie(exercicioId, serieId) {
    setExercicios((prev) =>
      prev.map((exercicio) => {
        if (exercicio.id !== exercicioId)
          return exercicio

        return {
          ...exercicio,
          series: exercicio.series.map((serie) =>
            serie.id === serieId
              ? {
                  ...serie,
                  feito: !serie.feito,
                }
              : serie
          ),
        }
      })
    )
  }

  function alterarCarga(
    exercicioId,
    serieId,
    novaCarga
  ) {
    setExercicios((prev) =>
      prev.map((exercicio) => {
        if (exercicio.id !== exercicioId)
          return exercicio

        return {
          ...exercicio,
          series: exercicio.series.map((serie) =>
            serie.id === serieId
              ? {
                  ...serie,
                  carga: novaCarga,
                }
              : serie
          ),
        }
      })
    )
  }

  function finalizarTreino() {
    localStorage.removeItem(
      `treino_progresso_${treinoId}`
    )

    localStorage.removeItem(
      `treino_tempo_${treinoId}`
    )

    voltar()
  }

  const totalExercicios = exercicios.length

  const exerciciosConcluidos =
    exercicios.filter(
      (ex) =>
        ex.series.length > 0 &&
        ex.series.every(
          (serie) => serie.feito
        )
    ).length

  const totalSeries = exercicios.reduce(
    (acc, ex) => acc + ex.series.length,
    0
  )

  const seriesFeitas = exercicios.reduce(
    (acc, ex) =>
      acc +
      ex.series.filter((s) => s.feito)
        .length,
    0
  )

  const progresso = totalSeries
    ? Math.round(
        (seriesFeitas / totalSeries) * 100
      )
    : 0

  if (carregando) {
    return (
      <div
        className="treino-atual"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <p
          style={{
            color: '#8e8e93',
            fontWeight: 'bold',
          }}
        >
          Carregando treino...
        </p>
      </div>
    )
  }

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
            {exerciciosConcluidos}/
            {totalExercicios}
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
        {exercicios.map(
          (exercicio, index) => (
            <div
              key={exercicio.id}
              className={`card-exercicio ${
                exercicio.aberto
                  ? 'card-exercicio--aberto'
                  : ''
              }`}
            >
              <div
                className="card-header"
                onClick={() =>
                  toggleExercicio(
                    exercicio.id
                  )
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

                  <span className="seta-toggle">
                    {exercicio.aberto
                      ? '▲'
                      : '▼'}
                  </span>
                </div>
              </div>

              {exercicio.aberto && (
                <div className="series-container">
                  {exercicio.series.map(
                    (serie) => (
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
                          <small>(KG)</small>
                          <input
                            type="number"
                            value={serie.carga}
                            onChange={(e) =>
                              alterarCarga(
                                exercicio.id,
                                serie.id,
                                e.target.value
                              )
                            }
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
                          {serie.feito
                            ? '✓'
                            : 'O'}
                        </button>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          )
        )}
      </section>

      <button
        className="finalizar-btn"
        onClick={finalizarTreino}
      >
        FINALIZAR TREINO <span>✓</span>
      </button>
    </div>
  )
}