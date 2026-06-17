import { useEffect, useState } from 'react'
import '../styles/Exercicios.css'
// 💡 Importado o excluirExercicio aqui na linha abaixo:
import { listarExercicios, criarExercicio, excluirExercicio } from '../services/api'

export default function Exercicios({ treinoId, treinoNome, voltar }) {
  const [exercicios, setExercicios] = useState([])
  const [mensagemSucesso, setMensagemSucesso] = useState('') 
  const [erro, setErro] = useState('') 
  const [form, setForm] = useState({
    nome: '',
    grupo: '',
    series: '',
    reps: '',
  })

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
      setErro('')
      setMensagemSucesso('')
      const { nome, group = form.grupo, series, reps } = form

      if (!nome || !form.grupo || !series || !reps) {
        return setErro('Preencha todos os campos obrigatórios (*)')
      }

      await criarExercicio({
        treino_id: treinoId,
        nome,
        grupo: form.grupo,
        series: Number(series),
        reps: Number(reps),
        carga: 0,
      })

      setForm({
        nome: '',
        grupo: '',
        series: '',
        reps: '',
      })

      carregarExercicios()
      setMensagemSucesso(`"${nome.toUpperCase()}" adicionado com sucesso!`)

      setTimeout(() => {
        setMensagemSucesso('')
      }, 3000)

    } catch (err) {
      console.log(err)
      setErro('Não foi possível salvar o exercício. Tente novamente.')
    }
  }

  // 💡 Nova função para lidar com a exclusão do exercício individual
  async function handleDeletarExercicio(id, nomeEx) {
    if (window.confirm(`Deseja realmente remover o exercício "${nomeEx.toUpperCase()}"?`)) {
      try {
        await excluirExercicio(id)
        carregarExercicios() // Recarrega a listagem na hora
        setMensagemSucesso('Exercício removido com sucesso!')
        setTimeout(() => setMensagemSucesso(''), 3000)
      } catch (err) {
        setErro(err.message || 'Erro ao remover exercício')
      }
    }
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
          <p>Preencha os dados para adicionar à lista de treinos.</p>
        </div>

        {/* FEEDBACKS VISUAIS */}
        {mensagemSucesso && (
          <div className="exercicios__sucesso-alert" style={{ background: '#00cc6622', border: '1px solid #00cc66', color: '#00cc66', padding: '12px', borderRadius: '10px', fontSize: '12px', fontWeight: 'bold', marginBottom: '15px', textAlign: 'center' }}>
            ✓ {mensagemSucesso}
          </div>
        )}

        {erro && (
          <div className="exercicios__erro-alert" style={{ background: '#ff3b3022', border: '1px solid #ff3b30', color: '#ff3b30', padding: '12px', borderRadius: '10px', fontSize: '12px', fontWeight: 'bold', marginBottom: '15px', textAlign: 'center' }}>
            ⚠️ {erro}
          </div>
        )}

        {/* FORMULÁRIO */}
        <div className="exercicios__form">
          
          {/* CAMPO NOME */}
          <div className="exercicios__field">
            <label>Nome do Exercício *</label>
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
            <label>Grupo Muscular *</label>
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

          {/* CAMPOS MATRIZ LINEAR */}
          <div className="exercicios__row">
            <div className="exercicios__field">
              <label>SÉRIES *</label>
              <input
                type="number"
                placeholder="0"
                className="exercicios__input-small"
                value={form.series}
                onChange={(e) => setForm({ ...form, series: e.target.value })}
              />
            </div>

            <div className="exercicios__field">
              <label>REPS *</label>
              <input
                type="number"
                placeholder="0"
                className="exercicios__input-small"
                value={form.reps}
                onChange={(e) => setForm({ ...form, reps: e.target.value })}
              />
            </div>
          </div>

          {/* AÇÕES FIXAS DO FORMULÁRIO */}
          <div className="exercicios__actions">
            <button className="exercicios__btn-cancelar" onClick={voltar}>
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
            {exercicios.map((ex) => {
              
              const mapaImagens = {
                'Peito': '/grupos_musculares/peitoral.png',
                'Bíceps': '/grupos_musculares/biceps.png',
                'Costas': '/grupos_musculares/grande_dorsal.png',
                'Ombros': '/grupos_musculares/deltoide_anterior.png',
                'Glúteos': '/grupos_musculares/gluteos.png',
                'Tríceps': '/grupos_musculares/triceps.png',
                'Pernas': '/grupos_musculares/quadriceps.png',
                'Abdômen': '/grupos_musculares/abdomen_reto.png',
                'Panturrilha': '/grupos_musculares/panturrilha_gastrocnemio.png'
              }

              const urlImagem = mapaImagens[ex.grupo_muscular] || '/grupos_musculares/braco_antibraco_superior.png'

              return (
                <div key={ex.id} className="exercicio__card" style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px', position: 'relative' }}>
                  
                  <img 
                    src={urlImagem} 
                    alt={ex.grupo_muscular || "Músculo"} 
                    style={{ width: '40px', height: '40px', objectFit: 'contain', background: '#141414', borderRadius: '50%', padding: '4px', border: '1px solid #222' }}
                  />
                  
                  <div style={{ flex: 1, paddingRight: '30px' }}>
                    <h2>{ex.nome.toUpperCase()}</h2>
                    <div className="exercicio__infos">
                      <span className="exercicio__badge">{ex.grupo_muscular?.toUpperCase()}</span>
                      <span className="exercicio__badge">{ex.series}X{ex.repeticoes} REPS</span>
                    </div>
                  </div>

                  {/* 🗑️ BOTÃO DE EXCLUIR EXERCÍCIO INDIVIDUAL */}
                  <button
                    onClick={() => handleDeletarExercicio(ex.id, ex.nome)}
                    style={{
                      position: 'absolute',
                      right: '15px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'transparent',
                      border: 'none',
                      color: '#ff3b30',
                      fontSize: '16px',
                      cursor: 'pointer',
                      padding: '5px'
                    }}
                  >
                    🗑️
                  </button>
                </div>
              )
            })}
          </section>
        )}

      </div>
    </div>
  )
}