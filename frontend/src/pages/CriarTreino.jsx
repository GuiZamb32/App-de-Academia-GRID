import { useState, useEffect } from 'react'
import '../styles/CriarTreino.css'
import { criarTreino, listarTreinos } from '../services/api'

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
      // ✅ CORRIGIDO: Removemos os mocks estáticos de Fallback. Se não houver dados, fica vazio.
      setTreinos(Array.isArray(data) ? data : [])
    } catch (err) {
      console.log('Erro ao carregar treinos:', err)
      setTreinos([]) // Sem dados mockados poluindo a tela
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

  // Extrai a última letra ou palavra curta para a identificação do card (Ex: "Treino A" -> "A")
  function obterLetraTreino(nomeTreino) {
    const partes = nomeTreino.toUpperCase().trim().split(' ')
    return partes[partes.length - 1] || '?'
  }

  // ✅ NOVO: Varre o nome do treino e retorna o caminho das imagens corretas da pasta public
  function obterImagensMusculos(nomeTreino) {
    const nomeMinusculo = nomeTreino.toLowerCase()
    const caminhosImagens = []

    // Dicionário mapeando termos comuns aos seus arquivos físicos reais na pasta public
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

    // Procura por correspondências no nome do treino
    Object.keys(mapaMusculos).forEach((chave) => {
      if (nomeMinusculo.includes(chave)) {
        caminhosImagens.push(mapaMusculos[chave])
      }
    })

    // Ícone padrão/fallback caso ele crie um nome genérico como "Treino 1"
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

        {/* LISTAGEM DE TREINOS TOTALMENTE DINÂMICA */}
        <div className="criar__list">
          {treinos.length === 0 ? (
            <p className="criar__vazio">Nenhum treino salvo. Adicione um treino acima!</p>
          ) : (
            treinos.map((treino) => {
              const letra = obterLetraTreino(treino.nome)
              const imagens = obterImagensMusculos(treino.nome) // ✅ Busca as fotos reais

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
                </div>
              )
            })
          )}
        </div>

      </div>
    </div>
  )
}