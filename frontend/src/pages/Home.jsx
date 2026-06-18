import { useState, useEffect } from 'react'
import '../styles/Home.css'
import { buscarEstatisticasUsuario } from '../services/api'

export default function Home({ usuario, sair, navegar }) {
  const [stats, setStats] = useState({
    totalTreinos: 0,
    totalGrupos: 0,
    totalSeries: 0
  })

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
            {/* 💡 CLIQUE EM INICIAR: Vai para a tela de escolher qual treino executar */}
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
            {/* 💡 BLINDADO: Se vier do Login usa 'foto_perfil', se vier do Update do Perfil usa 'foto' */}
            <img 
              src={usuario?.foto || usuario?.foto_perfil || '/icons/avatar_01.png'} 
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

        {/* 💡 BOTÃO FLUTUANTE DE ADICIONAR: Agora vai direto para a tela de Gerenciar/Criar Treinos */}
        <button 
          className="home__fab" 
          onClick={() => navegar('criarTreino')}
          title="Adicionar Novo Treino"
        >
          +
        </button>

        {/* ESTATÍSTICAS INFERIORES */}
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