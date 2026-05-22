import { useState } from 'react'

import '../styles/Login.css'

import { loginUsuario } from '../services/api'

export default function Login({ irCadastro, entrar }) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const [erro, setErro] = useState('')

  async function handleLogin() {
    try {
      setErro('')

      // valida campos
      if (!email || !senha) {
        return setErro('Preencha todos os campos')
      }

      // login backend
      const data = await loginUsuario({
        email,
        senha,
      })

      // salva token
      localStorage.setItem(
        'token',
        data.token
      )

      // salva usuario
      localStorage.setItem(
        'usuario',
        JSON.stringify(data.usuario)
      )

      // entra home
      entrar()

    } catch (err) {
      setErro(err.message)
    }
  }

  return (
    <div className="login">
      <div className="login__card">

        <span className="login__logo">
          LISTA_TREINO
        </span>

        <h1 className="login__title">
          BEM <br />
          <span>VINDO</span> <br />
          DE VOLTA
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="login__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="login__input"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        {erro && (
          <p className="login__erro">
            {erro}
          </p>
        )}

        <button
          className="login__button"
          onClick={handleLogin}
        >
          ENTRAR
        </button>

        <button
          className="login__link"
          onClick={irCadastro}
        >
          Criar conta
        </button>

      </div>
    </div>
  )
}