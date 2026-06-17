import { useState, useEffect } from 'react'
import '../styles/Home.css'
import { buscarEstatisticasUsuario } from '../services/api'

export default function Home({ usuario, sair, navegar }) {
  // Estado para guardar os números do painel
  const [stats, setStats] = useState({
    totalTreinos: 0,
    totalGrupos: 0,
    totalSeries: 0
  })

  // Carrega as estatísticas reais do banco assim que o componente monta na tela
  useEffect(() => {
    async function carregarPainel() {
      try {
        const dados = await buscarEstatisticasUsuario()
        setStats(dados)
      } catch (err) {
        console.error('Não foi possível atualizar as estatísticas:', err)
      }
    }
    
    carregarPainel()
  }, [])

  return (
    <div className="home">
      <div className="home__container">
        
        {/* HEADER DA HOME */}
        <header className="home__header">
          <div className="home__logo">
            LISTA<span> . TREINO</span>
          </div>
          
          <div className="home__actions">
            <button 
              className="home__btn-iniciar" 
              onClick={() => navegar('treinos')}
            >
              ▶ INICIAR
            </button>
            
            <button 
              className="home__profile-avatar" 
              onClick={() => navegar('perfil')}
              title="Ir para o Perfil"
            >
              <img 
                src={usuario?.foto_perfil || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=150'} 
                alt="Perfil" 
              />
            </button>
          </div>
        </header>

        {/* HERO SECTION */}
        <section className="home__hero">
          <h1 className="home__title">
            SEU <br />
            <span className="home__title--highlight">TREINO</span> <br />
            Diario
          </h1>

          <p className="home__text">
            Gerencie seus exercícios, acompanhe cargas e evolua a cada sessão
          </p>
        </section>

        {/* BOTÃO FLUTUANTE DE ADICIONAR */}
        <button 
          className="home__fab" 
          onClick={() => navegar('treinos')}
          title="Adicionar Novo Treino"
        >
          +
        </button>

        {/* ESTATÍSTICAS INFERIORES DINÂMICAS */}
        <section className="home__stats">
          <div className="home__stat-item">
            <strong className="home__stat-number">{stats.totalTreinos}</strong>
            <span className="home__stat-label">TREINOS</span>
          </div>

          <div className="home__stat-item">
            <strong className="home__stat-number">{stats.totalGrupos}</strong>
            <span className="home__stat-label">GRUPOS</span>
          </div>

          <div className="home__stat-item">
            <strong className="home__stat-number">{stats.totalSeries}</strong>
            <span className="home__stat-label">SÉRIES</span>
          </div>
        </section>

      </div>
    </div>
  )
}