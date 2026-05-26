import '../styles/Perfil.css'

export default function Perfil({
  usuario,
  voltar,
  sair,
}) {
  return (
    <div className="perfil">

      <header className="perfil__header">
        <button
          className="perfil__back"
          onClick={voltar}
        >
          ←
        </button>

        <h1>PERFIL</h1>
      </header>

      <section className="perfil__top">

        <div className="perfil__foto">
          <img
            src="https://i.imgur.com/Pr8L6F4.jpeg"
            alt="perfil"
          />
        </div>

        <h2>
          {usuario?.nome || 'Usuário'}
        </h2>

        <p>
          {usuario?.email}
        </p>

      </section>

      <section className="perfil__card">

        <h3>ESTATÍSTICAS</h3>

        <div className="perfil__stats">

          <div>
            <strong>12</strong>
            <span>Treinos</span>
          </div>

          <div>
            <strong>28</strong>
            <span>Dias</span>
          </div>

          <div>
            <strong>154</strong>
            <span>Séries</span>
          </div>

        </div>

      </section>

      <section className="perfil__card">

        <h3>SEUS TREINOS</h3>

        <div className="perfil__treinos">

          <div className="perfil__treino">A</div>
          <div className="perfil__treino">B</div>
          <div className="perfil__treino">C</div>

        </div>

      </section>

      <button className="perfil__button">
        EDITAR PERFIL
      </button>

      <button
        className="perfil__logout"
        onClick={sair}
      >
        SAIR
      </button>

    </div>
  )
}