// ==========================================
// 1. ARQUIVO: Exercicios.jsx
// ==========================================
import { useEffect, useState } from 'react'
import '../styles/Exercicios.css'
import { listarExercicios, criarExercicio } from '../services/api'

export default function Exercicios({ treinoId, treinoNome, voltar }) {
  const [exercicios, setExercicios] = useState([])
  const [form, setForm] = useState({
    nome: '',
    grupo: '',
    series: '',
    reps: '',
    carga: '',
  })

  // Lista de grupos musculares correspondente aos botões da imagem
  const gruposMusculares = [
    'Peito', 'Bíceps', 'Costas',
    'Ombros', 'Glúteos', 'Tríceps',
    'Pernas', 'Abdômen', 'Panturrilha'
  ]

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

  function selecionarGrupo(grupo) {
    setForm({ ...form, grupo })
  }

  async function handleCriar() {
    try {
      const { nome, grupo, series, reps, carga } = form

      if (!nome || !grupo || !series || !reps) {
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
      alert('Exercício adicionado com sucesso!')
    } catch (err) {
      console.log(err)
    }
  }

  function handleLimpar() {
    setForm({ nome: '', grupo: '', series: '', reps: '', carga: '' })
  }

  return (
    <div className="exercicios">
      <div className="exercicios__container">
        
        {/* HEADER */}
        <header className="exercicios__header">
          <button className="exercicios__back" onClick={voltar}>
            ←
          </button>
          <h1>NOVO EXERCICIO</h1>
        </header>

        {/* HERO CARD ADICIONAR */}
        <div className="exercicios__hero-card">
          <h2>ADICIONAR EXERCICIO</h2>
          <p>Preencha os dados para adicionar á lista de treinos.</p>
        </div>

        {/* FORMULÁRIO */}
        <div className="exercicios__form">
          
          {/* CAMPO NOME */}
          <div className="exercicios__field">
            <label>Nome:</label>
            <input
              type="text"
              placeholder="EX: Supino Reto"
              className="exercicios__input"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
            />
          </div>

          {/* SELEÇÃO GRUPO MUSCULAR GRID */}
          <div className="exercicios__field">
            <label>Grupo Muscular</label>
            <div className="exercicios__groups-grid">
              {gruposMusculares.map((g) => (
                <button
                  key={g}
                  type="button"
                  className={`exercicios__group-btn ${form.grupo === g ? 'exercicios__group-btn--active' : ''}`}
                  onClick={() => selecionarGrupo(g)}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* CAMPOS MATRIZ LINEAR (SÉRIES, REPS, CARGA) */}
          <div className="exercicios__row">
            <div className="exercicios__field">
              <label>SÉRIES</label>
              <input
                type="number"
                className="exercicios__input-small"
                value={form.series}
                onChange={(e) => setForm({ ...form, series: e.target.value })}
              />
            </div>

            <div className="exercicios__field">
              <label>REPS</label>
              <input
                type="number"
                className="exercicios__input-small"
                value={form.reps}
                onChange={(e) => setForm({ ...form, reps: e.target.value })}
              />
            </div>

            <div className="exercicios__field">
              <label>CARGA(KG)</label>
              <input
                type="number"
                className="exercicios__input-small"
                value={form.carga}
                onChange={(e) => setForm({ ...form, carga: e.target.value })}
              />
            </div>
          </div>

          {/* AÇÕES FIXAS DO FORMULÁRIO */}
          <div className="exercicios__actions">
            <button className="exercicios__btn-cancelar" onClick={handleLimpar}>
              Cancelar
            </button>
            <button className="exercicios__btn-salvar" onClick={handleCriar}>
              Salvar
            </button>
          </div>
        </div>

        {/* LISTAGEM DOS EXERCÍCIOS ADICIONADOS LOGO ABAIXO */}
        {exercicios.length > 0 && (
          <section className="exercicios__list">
            <h3 className="exercicios__list-title">Exercícios Cadastrados ({treinoNome})</h3>
            {exercicios.map((ex) => (
              <div key={ex.id} className="exercicio__card">
                <h2>{ex.nome}</h2>
                <div className="exercicio__infos">
                  <span className="exercicio__badge">{ex.grupo}</span>
                  <span className="exercicio__badge">{ex.series}x{ex.reps}</span>
                  <span className="exercicio__badge">{ex.carga}kg</span>
                </div>
              </div>
            ))}
          </section>
        )}

      </div>
    </div>
  )
}

