// ==========================================
// 1. ARQUIVO: Perfil.jsx
// ==========================================
import { useEffect, useState } from 'react'
import '../styles/Perfil.css'
import { buscarPerfil, atualizarPerfil } from '../services/api'

export default function Perfil({ voltar, sair }) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [foto, setFoto] = useState('')
  const [editando, setEditando] = useState(false)

  useEffect(() => {
    carregarPerfil()
  }, [])

  async function carregarPerfil() {
    try {
      const data = await buscarPerfil()
      setNome(data.nome)
      setEmail(data.email)
      setFoto(data.foto)
    } catch (err) {
      console.log(err)
    }
  }

  function handleImagem(e) {
    if (!editando) return // Só muda a foto se estiver em modo de edição
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      setFoto(reader.result)
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
      console.log(err)
    }
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

        <div className="perfil__card">
          <div className="perfil__card-header">
            <h3>ESTATÍSTICAS</h3>
            <button className="perfil__dot-btn">•••</button>
          </div>
          <div className="perfil__stats">
            <div>
              <strong>124</strong>
              <span>Treinos Feitos</span>
            </div>
            <div>
              <strong>45</strong>
              <span>Dias Treinados</span>
            </div>
            <div>
              <strong>1.3K</strong>
              <span>Repetições</span>
            </div>
          </div>
        </div>

        <div className="perfil__card">
          <div className="perfil__card-header">
            <h3>SEUS TREINOS SALVOS</h3>
            <button className="perfil__dot-btn">•••</button>
          </div>
          <div className="perfil__treinos">
            <div className="perfil__treino">
              <small>Treino</small>
              <strong>A</strong>
            </div>
            <div className="perfil__treino">
              <small>Treino</small>
              <strong>B</strong>
            </div>
            <div className="perfil__treino">
              <small>Treino</small>
              <strong>C</strong>
            </div>
            <div className="perfil__treino">
              <small>Treino</small>
              <strong>D</strong>
            </div>
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

