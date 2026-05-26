// ==========================================
// 1. ARQUIVO: CriarTreino.jsx
// ==========================================
import { useState, useEffect } from 'react'
import '../styles/CriarTreino.css'
import { criarTreino, listarTreinos } from '../services/api'

export default function CriarTreino({ voltar, selecionarTreino }) {
  const [nome, setNome] = useState('')
  const [erro, setErro] = useState('')
  const [treinos, setTreinos] = useState([])

  // Mock de ícones/músculos simulando as imagens em destaque da foto para os treinos cadastrados
  const musculosMock = {
    A: ['🫁', '💪', '🛡️', '🏋️'],
    B: ['🦵', '🏃', '🍑', '🧦']
  }

  useEffect(() => {
    carregarTreinos()
  }, [])

  async function carregarTreinos() {
    try {
      const data = await listarTreinos()
      setTreinos(Array.isArray(data) ? data : [])
    } catch (err) {
      console.log('Erro ao carregar treinos:', err)
      // Fallback caso a API ainda não possua dados cadastrados para popular o print
      setTreinos([{ id: 1, nome: 'Treino A' }, { id: 2, nome: 'Treino B' }])
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

  // Extrai a letra do treino (ex: "Treino A" -> "A") para encaixar perfeitamente na estilização
  function obterLetraTreino(nomeTreino) {
    const partes = nomeTreino.toUpperCase().split(' ')
    return partes[partes.length - 1] || 'A'
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

        {/* COMPONENTE DE INPUT INTEGRADO PARA CRIAR RAPIDAMENTE */}
        <div className="criar__form-inline">
          <input
            type="text"
            placeholder="Novo Treino (Ex: Treino C)"
            className="criar__input"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <button className="criar__button" onClick={handleCriar}>
            +
          </button>
        </div>
        {erro && <p className="criar__erro">{erro}</p>}

        {/* LISTAGEM DE TREINOS - EXATAMENTE IGUAL À IMAGEM */}
        <div className="criar__list">
          {treinos.map((treino) => {
            const letra = obterLetraTreino(treino.nome)
            const icones = musculosMock[letra] || ['💪', '🏋️']

            return (
              <div 
                key={treino.id} 
                className="criar__card-treino"
                onClick={() => selecionarTreino && selecionarTreino(treino)}
              >
                <div className="criar__card-meta">
                  <span className="criar__card-label">TREINO</span>
                  <strong className="criar__card-letra">{letra}</strong>
                </div>

                <div className="criar__card-detalhes">
                  <span className="criar__card-sub">MUSCULOS EM DESTAQUE</span>
                  <div className="criar__card-badges">
                    {icones.map((icon, idx) => (
                      <div key={idx} className="criar__badge-musculo">
                        {icon}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}

