import { useEffect, useState } from 'react'
import '../styles/Perfil.css'
import { buscarPerfil, atualizarPerfil, buscarEstatisticasUsuario, listarTreinos } from '../services/api'

export default function Perfil({ voltar, sair }) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [foto, setFoto] = useState('')
  const [editando, setEditando] = useState(false)
  
  // 💡 NOVOS ESTADOS: Estatísticas e treinos reais do banco
  const [stats, setStats] = useState({ totalTreinos: 0, totalGrupos: 0, totalSeries: 0 })
  const [treinos, setTreinos] = useState([])

  useEffect(() => {
    carregarPerfil()
    carregarDadosAdicionais()
  }, [])

  async function carregarPerfil() {
    try {
      const data = await buscarPerfil()
      setNome(data.nome || '')
      setEmail(data.email || '')
      setFoto(data.foto || '')
    } catch (err) {
      console.log('Erro ao carregar dados do perfil:', err)
    }
  }

  // 💡 NOVA FUNÇÃO: Busca as estatísticas e treinos do usuário em paralelo
  async function carregarDadosAdicionais() {
    try {
      const [dadosStats, dadosTreinos] = await Promise.all([
        buscarEstatisticasUsuario(),
        listarTreinos()
      ])
      
      setStats(dadosStats)
      setTreinos(Array.isArray(dadosTreinos) ? dadosTreinos : [])
    } catch (err) {
      console.log('Erro ao carregar dados adicionais:', err)
    }
  }

  function handleImagem(e) {
    if (!editando) return 
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      setFoto(reader.result) // Salva em Base64 para enviar ao backend de forma simples
    }
    reader.readAsDataURL(file)
  }

  async function handleAcaoBotao() {
    if (!editando) {
      setEditando(true)
      return
    }

    try {
      await atualizarPerfil({ nome, email, foto })
      alert('Perfil atualizado com sucesso!')
      setEditando(false)
    } catch (err) {
      console.log('Erro ao atualizar perfil:', err)
      alert('Não foi possível salvar as alterações.')
    }
  }

  // Helper para pegar o sufixo/letra identificadora do treino (Ex: "Treino Superior A" -> "A")
  function obterLetraTreino(nomeTreino) {
    const partes = nomeTreino.toUpperCase().trim().split(' ')
    return partes[partes.length - 1] || '?'
  }

  return (
    <div className="perfil">
      <header className="perfil__header">
        <button className="perfil__back" onClick={voltar}>
          ←
        </button>
        <h1>Perfil</h1>
      </header>

      <div className="perfil__content">
        <div className="perfil__logo">
          LISTA<span>.TREINO</span>
        </div>

        <section className="perfil__hero">
          <div className="perfil__title">
            <h2>
              SEU <br />
              <span>PERFIL</span>
            </h2>
          </div>

          <label className={`perfil__foto ${editando ? 'perfil__foto--editavel' : ''}`}>
            <img
              src={foto || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=150'}
              alt="Foto de perfil"
            />
            {editando && (
              <div className="perfil__foto-overlay">
                <span>Alterar</span>
              </div>
            )}
            <input
              hidden
              type="file"
              accept="image/*"
              disabled={!editando}
              onChange={handleImagem}
            />
          </label>
        </section>

        <div className="perfil__form">
          <div className="perfil__field">
            <label>Nome Completo</label>
            <input
              className={`perfil__input ${editando ? 'perfil__input--foco' : ''}`}
              value={nome}
              readOnly={!editando}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome"
            />
          </div>

          <div className="perfil__field">
            <label>Email</label>
            <input
              className={`perfil__input ${editando ? 'perfil__input--foco' : ''}`}
              value={email}
              readOnly={!editando}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu.email@exemplo.com"
            />
          </div>
        </div>

        {/* 📊 PAINEL DE ESTATÍSTICAS REAIS */}
        <div className="perfil__card">
          <div className="perfil__card-header">
            <h3>ESTATÍSTICAS ATUAIS</h3>
            <button className="perfil__dot-btn">•••</button>
          </div>
          <div className="perfil__stats">
            <div>
              <strong>{stats.totalTreinos}</strong>
              <span>Treinos Salvos</span>
            </div>
            <div>
              <strong>{stats.totalGrupos}</strong>
              <span>Grupos Ativos</span>
            </div>
            <div>
              <strong>{stats.totalSeries}</strong>
              <span>Séries Totais</span>
            </div>
          </div>
        </div>

        {/* 📋 LISTAGEM DE TREINOS SALVOS REAIS */}
        <div className="perfil__card">
          <div className="perfil__card-header">
            <h3>SEUS TREINOS SALVOS</h3>
            <button className="perfil__dot-btn">•••</button>
          </div>
          <div className="perfil__treinos">
            {treinos.length === 0 ? (
              <p style={{ color: '#636366', fontSize: '13px', padding: '10px 0' }}>
                Nenhum treino salvo encontrado.
              </p>
            ) : (
              treinos.map((treino) => (
                <div key={treino.id} className="perfil__treino">
                  <small>Treino</small>
                  <strong>{obterLetraTreino(treino.nome)}</strong>
                </div>
              ))
            )}
          </div>
        </div>

        <button 
          className={`perfil__button ${editando ? 'perfil__button--salvar' : ''}`} 
          onClick={handleAcaoBotao}
        >
          {editando ? 'SALVAR ALTERAÇÕES' : 'EDITAR'}
        </button>

        <button className="perfil__logout" onClick={sair}>
          Sair da Conta
        </button>
      </div>
    </div>
  )
}