// ==========================================
// 1. ARQUIVO: Login.jsx
// ==========================================
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

      if (!email || !senha) {
        return setErro('Preencha todos os campos')
      }

      const data = await loginUsuario({ email, senha })

      localStorage.setItem('token', data.token)
      localStorage.setItem('usuario', JSON.stringify(data.usuario))
      
      entrar()
    } catch (err) {
      setErro(err.message || 'Erro ao realizar login')
    }
  }

  return (
    <div className="login">
      <div className="login__container">
        
        {/* LOGO SUPERIOR */}
        <div className="login__logo">
          LISTA<span> . TREINO</span>
        </div>

        {/* TÍTULO HERO */}
        <header className="login__hero">
          <h1 className="login__title">
            BEM <br />
            <span className="login__title--highlight">VINDO</span> <br />
            DE VOLTA
          </h1>
          <p className="login__subtitle">
            REGISTRE-SE E MONTE SEUS TREINOS PERSONALIZADOS
          </p>
        </header>

        {/* SELETOR DE ABAS (TABS) */}
        <div className="login__tabs">
          <button className="login__tab-btn login__tab-btn--active">ENTRAR</button>
          <button className="login__tab-btn" onClick={irCadastro}>CADASTRAR</button>
        </div>

        {/* FORMULÁRIO DE ENTRADA */}
        <div className="login__form">
          <div className="login__field">
            <label>EMAIL</label>
            <input
              type="email"
              placeholder="SEU@EMAIL.COM"
              className="login__input"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim().toLowerCase())}
            />
          </div>

          <div className="login__field">
            <label>SENHA</label>
            <input
              type="password"
              placeholder="MINIMO 6 CARACTERES"
              className="login__input"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <div className="login__forgot-wrapper">
            <button type="button" className="login__forgot-link">
              Esqueceu a Senha ?
            </button>
          </div>

          {erro && <p className="login__erro">{erro}</p>}

          <button className="login__button" onClick={handleLogin}>
            ENTRAR
          </button>
        </div>

        {/* DIVISOR INTEGRADOR */}
        <div className="login__divider">
          <span>OU</span>
        </div>

        {/* AUTENTICAÇÃO SOCIAL GOOGLE */}
        <button 
          type="button" 
          className="login__google-btn"
          onClick={() => alert('Integração com Google em desenvolvimento.')}
        >
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_活跃徽标.svg" 
            alt="Google Logo" 
          />
          Continuar com Google
        </button>

      </div>
    </div>
  )
}

