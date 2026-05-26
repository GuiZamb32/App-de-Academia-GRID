// ==========================================
// 1. ARQUIVO: Home.jsx
// ==========================================
import '../styles/Home.css'

export default function Home({ usuario, sair, navegar }) {
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
            
            {/* Foto de perfil funcionando como botão */}
            <button 
              className="home__profile-avatar" 
              onClick={() => navegar('perfil')}
              title="Ir para o Perfil"
            >
              <img 
                src={usuario?.foto || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=150'} 
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

        {/* ESTATÍSTICAS INFERIORES */}
        <section className="home__stats">
          <div className="home__stat-item">
            <strong className="home__stat-number">15</strong>
            <span className="home__stat-label">EXERCÍCIOS</span>
          </div>

          <div className="home__stat-item">
            <strong className="home__stat-number">8</strong>
            <span className="home__stat-label">GRUPOS</span>
          </div>

          <div className="home__stat-item">
            <strong className="home__stat-number">45</strong>
            <span className="home__stat-label">SÉRIES</span>
          </div>
        </section>

      </div>
    </div>
  )
}
