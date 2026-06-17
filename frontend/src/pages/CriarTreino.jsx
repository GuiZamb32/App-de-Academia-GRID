import { useState, useEffect } from 'react'
import '../styles/CriarTreino.css'
import { criarTreino, listarTreinos, excluirTreino } from '../services/api'

export default function CriarTreino({ voltar, selecionarTreino }) {
  const [nome, setNome] = useState('')
  const [erro, setErro] = useState('')
  const [treinos, setTreinos] = useState([])

  useEffect(() => {
    carregarTreinos()
  }, [])

  async function carregarTreinos() {
    try {
      const data = await listarTreinos()
      setTreinos(Array.isArray(data) ? data : [])
    } catch (err) {
      console.log('Erro ao carregar treinos:', err)
      setTreinos([]) 
    }
  }

  async function handleCriar() {
    try {
      setErro('')
      if (!nome) {
        return setErro('Digite um nome para o treino')
      }

      await criarTreino(nome)
      setNome('')
      carregarTreinos()
    } catch (err) {
      setErro(err.message || 'Erro ao criar o treino')
    }
  }

  function obterLetraTreino(nomeTreino) {
    const partes = nomeTreino.toUpperCase().trim().split(' ')
    return partes[partes.length - 1] || '?'
  }

  function obterImagensMusculos(nomeTreino) {
    const nomeMinusculo = nomeTreino.toLowerCase()
    const caminhosImagens = []

    const mapaMusculos = {
      biceps: '/grupos_musculares/biceps.png',
      triceps: '/grupos_musculares/triceps.png',
      peito: '/grupos_musculares/peitoral.png',
      peitoral: '/grupos_musculares/peitoral.png',
      costa: '/grupos_musculares/grande_dorsal.png',
      dorsal: '/grupos_musculares/grande_dorsal.png',
      perna: '/grupos_musculares/quadriceps.png',
      quadriceps: '/grupos_musculares/quadriceps.png',
      ombro: '/grupos_musculares/deltoide_anterior.png',
      deltoide: '/grupos_musculares/deltoide_anterior.png',
      gluteo: '/grupos_musculares/gluteos.png',
      abdome: '/grupos_musculares/abdomen_reto.png',
      abdominal: '/grupos_musculares/abdomen_reto.png',
    }

    Object.keys(mapaMusculos).forEach((chave) => {
      if (nomeMinusculo.includes(chave)) {
        caminhosImagens.push(mapaMusculos[chave])
      }
    })

    if (caminhosImagens.length === 0) {
      caminhosImagens.push('/grupos_musculares/braco_antibraco_superior.png')
    }

    return caminhosImagens
  }

  return (
    <div className="criar">
      <div className="criar__container">

        {/* HEADER */}
        <header className="criar__header">
          <button className="criar__back" onClick={voltar}>
            ←
          </button>
          <h1>SEUS TREINOS SALVOS</h1>
        </header>

        {/* BANNER CENTRAL HERO */}
        <div className="criar__banner">
          <h2>SEUS TREINOS</h2>
        </div>

        {/* COMPONENTE DE INPUT INTEGRADO */}
        <div className="criar__form-inline">
          <input
            type="text"
            placeholder="Novo Treino (Ex: Treino Biceps e Peito)"
            className="criar__input"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <button className="criar__button" onClick={handleCriar}>
            +
          </button>
        </div>
        {erro && <p className="criar__erro">{erro}</p>}

        {/* LISTAGEM DE TREINOS TOTALMENTE DINÂMICA COM OPÇÃO DE EXCLUIR */}
        <div className="criar__list">
          {treinos.length === 0 ? (
            <p className="criar__vazio">Nenhum treino salvo. Adicione um treino acima!</p>
          ) : (
            treinos.map((treino) => {
              const letra = obterLetraTreino(treino.nome)
              const imagens = obterImagensMusculos(treino.nome)

              async function handleExcluir(e, id) {
                e.stopPropagation() 
                
                if (window.confirm('Tem certeza que deseja excluir este treino e todos os seus exercícios?')) {
                  try {
                    await excluirTreino(id)
                    carregarTreinos() 
                  } catch (err) {
                    alert(err.message || 'Erro ao deletar treino')
                  }
                }
              }

              return (
                <div 
                  key={treino.id} 
                  className="criar__card-treino"
                  onClick={() => selecionarTreino && selecionarTreino(treino)}
                  style={{ position: 'relative' }} 
                >
                  <div className="criar__card-meta">
                    <span className="criar__card-label">TREINO</span>
                    <strong className="criar__card-letra">{letra}</strong>
                  </div>

                  <div className="criar__card-detalhes">
                    <span className="criar__card-sub">{treino.nome.toUpperCase()}</span>
                    <div className="criar__card-badges">
                      {imagens.map((url, idx) => (
                        <div key={idx} className="criar__badge-musculo-img">
                          <img 
                            src={url} 
                            alt="Grupo Muscular" 
                            style={{ width: '28px', height: '28px', objectFit: 'contain' }} 
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 🗑️ BOTÃO DE EXCLUIR */}
                  <button 
                    className="criar__btn-deletar"
                    onClick={(e) => handleExcluir(e, treino.id)}
                    style={{
                      position: 'absolute',
                      top: '15px',
                      right: '15px',
                      background: 'transparent',
                      border: 'none',
                      color: '#ff3b30',
                      fontSize: '18px',
                      cursor: 'pointer',
                      padding: '5px'
                    }}
                  >
                    🗑️
                  </button>
                </div>
              )
            })
          )}
        </div>

      </div>
    </div>
  )
}