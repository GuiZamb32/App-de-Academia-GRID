import '../styles/Home.css'

export default function Home({  usuario, sair, navegar, }) {
  return (
    <div className="home">

      <header className="home__header">

        <div>
          <span className="home__logo">
            LISTA_TREINO
          </span>

          <h2 className="home__user">
            Olá, {usuario?.nome}
          </h2>
        </div>

        <button
          className="home__logout"
          onClick={sair}
        >
          SAIR
        </button>

      </header>

      <section className="home__hero">

        <h1 className="home__title">
          SEU <br />
          <span>TREINO</span> <br />
          DIÁRIO
        </h1>

        <p className="home__text">
          Gerencie seus exercícios e acompanhe sua evolução.
        </p>

      </section>

      <section className="home__stats">

        <div className="home__card">
          <h2>15</h2>
          <span>Exercícios</span>
        </div>

        <div className="home__card">
          <h2>8</h2>
          <span>Grupos</span>
        </div>

        <div className="home__card">
          <h2>45</h2>
          <span>Séries</span>
        </div>

      </section>

     <button
      className="home__button"
      onClick={() => navegar('treinos')}
    >
      INICIAR TREINO
    </button>

    </div>
  )
}