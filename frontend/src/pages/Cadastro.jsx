import { useState } from 'react'

import '../styles/Cadastro.css'

import { cadastrarUsuario } from '../services/api'

export default function Cadastro({ voltar, criarConta }) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')

  const [erro, setErro] = useState('')

  async function handleCadastro() {
    try {
      setErro('')

      // valida campos vazios
      if (
        !nome ||
        !email ||
        !senha ||
        !confirmarSenha
      ) {
        return setErro('Preencha todos os campos')
      }

      // valida senha
      if (senha !== confirmarSenha) {
        return setErro('As senhas não coincidem')
      }

      // envia backend
      await cadastrarUsuario({
        nome,
        email,
        senha,
      })

      alert('Conta criada com sucesso!')

      criarConta()

    } catch (err) {
      setErro(err.message)
    }
  }

  return (
    <div className="cadastro">
      <div className="cadastro__card">

        <span className="cadastro__logo">
          LISTA_TREINO
        </span>

        <h1 className="cadastro__title">
          CRIE SUA <br />
          <span>CONTA</span>
        </h1>

        <input
          type="text"
          placeholder="Nome"
          className="cadastro__input"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="cadastro__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="cadastro__input"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirmar senha"
          className="cadastro__input"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
        />

        {erro && (
          <p className="cadastro__erro">
            {erro}
          </p>
        )}

        <button
          className="cadastro__button"
          onClick={handleCadastro}
        >
          CRIAR CONTA
        </button>

        <button
          className="cadastro__link"
          onClick={voltar}
        >
          Voltar
        </button>

      </div>
    </div>
  )
}