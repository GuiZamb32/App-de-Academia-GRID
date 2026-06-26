import './Estatisticas.css'

function Estatisticas({
  estatisticas,
  voltar,
}) {
  return (
    <div className="estatisticas-page">

      <header className="estatisticas-header">
        <button
          className="voltar-btn"
          onClick={voltar}
        >
          ←
        </button>

        <h1>
          Suas <span>Estatísticas</span>
        </h1>
      </header>

      <div className="estatisticas-container">

        <section className="card-estatistica">
          <h2>Resumo Geral</h2>

          <div className="resumo-grid">
            <div>
              <span>
                {estatisticas.totalTreinos}
              </span>
              <p>Treinos</p>
            </div>

            <div>
              <span>
                {estatisticas.totalExercicios}
              </span>
              <p>Exercícios</p>
            </div>

            <div>
              <span>
                {estatisticas.grupoFavorito}
              </span>
              <p>Grupo favorito</p>
            </div>

            <div>
              <span>
                {estatisticas.diaFavorito}
              </span>
              <p>Dia favorito</p>
            </div>
          </div>
        </section>

        <section className="card-estatistica">
          <h2>Frequência Semanal</h2>

          <div className="grafico-barras">
            <div className="barra">
              <div
                style={{
                  height: '50%',
                }}
              />
              <span>S</span>
            </div>

            <div className="barra">
              <div
                style={{
                  height: '80%',
                }}
              />
              <span>T</span>
            </div>

            <div className="barra">
              <div
                style={{
                  height: '65%',
                }}
              />
              <span>Q</span>
            </div>

            <div className="barra">
              <div
                style={{
                  height: '35%',
                }}
              />
              <span>Q</span>
            </div>

            <div className="barra">
              <div
                style={{
                  height: '90%',
                }}
              />
              <span>S</span>
            </div>

            <div className="barra">
              <div
                style={{
                  height: '60%',
                }}
              />
              <span>S</span>
            </div>

            <div className="barra">
              <div
                style={{
                  height: '100%',
                }}
              />
              <span>D</span>
            </div>
          </div>
        </section>

        <section className="card-estatistica">
          <h2>
            Grupos Musculares Populares
          </h2>

          <div className="grupos-lista">
            <div className="grupo">
              <span>Peito</span>
              <div className="linha">
                <div
                  style={{
                    width: '85%',
                  }}
                />
              </div>
            </div>

            <div className="grupo">
              <span>Bíceps</span>
              <div className="linha">
                <div
                  style={{
                    width: '70%',
                  }}
                />
              </div>
            </div>

            <div className="grupo">
              <span>Pernas</span>
              <div className="linha">
                <div
                  style={{
                    width: '60%',
                  }}
                />
              </div>
            </div>

            <div className="grupo">
              <span>Costas</span>
              <div className="linha">
                <div
                  style={{
                    width: '45%',
                  }}
                />
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

export default Estatisticas