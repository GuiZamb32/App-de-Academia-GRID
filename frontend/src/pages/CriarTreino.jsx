import { useState } from 'react'

import '../styles/CriarTreino.css'

import { criarTreino } from '../services/api'

export default function CriarTreino({
  voltar,
}) {
  const [nome, setNome] = useState('')

  const [erro, setErro] = useState('')

  async function handleCriar() {
    try {
      setErro('')

      if (!nome) {
        return setErro('Digite um nome')
      }

      await criarTreino(nome)

      voltar()

    } catch (err) {
      setErro(err.message)
    }
  }

  return (
    <div className="criar">

      <header className="criar__header">

        <button
          className="criar__back"
          onClick={voltar}
        >
          ←
        </button>

        <h1 className="criar__title">
          NOVO TREINO
        </h1>

      </header>

      <div className="criar__content">

        <input
          type="text"
          placeholder="Nome do treino"
          className="criar__input"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        {erro && (
          <p className="criar__erro">
            {erro}
          </p>
        )}

        <button
          className="criar__button"
          onClick={handleCriar}
        >
          CRIAR
        </button>

      </div>

    </div>
  )
}