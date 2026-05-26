// ==========================================
// 1. ARQUIVO: Cadastro.jsx
// ==========================================
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

      if (!nome || !email || !senha || !confirmarSenha) {
        return setErro('Preencha todos os campos')
      }

      if (senha !== confirmarSenha) {
        return setErro('As senhas não coincidem')
      }

      await cadastrarUsuario({ nome, email, senha })
      alert('Conta criada com sucesso!')
      criarConta()
    } catch (err) {
      setErro(err.message || 'Erro ao realizar o cadastro')
    }
  }

  return (
    <div className="cadastro">
      <div className="cadastro__container">
        
        {/* LOGO SUPERIOR */}
        <div className="cadastro__logo">
          LISTA<span> . TREINO</span>
        </div>

        {/* TÍTULO HERO */}
        <header className="cadastro__hero">
          <h1 className="cadastro__title">
            CRIE SUA <br />
            <span className="cadastro__title--highlight">CONTA</span>
          </h1>
          <p className="cadastro__subtitle">
            REGISTRE-SE E MONTE SEUS TREINOS PERSONALIZADOS
          </p>
        </header>

        {/* SELETOR DE ABAS (TABS) */}
        <div className="cadastro__tabs">
          <button type="button" className="cadastro__tab-btn" onClick={voltar}>ENTRAR</button>
          <button type="button" className="cadastro__tab-btn cadastro__tab-btn--active">CADASTRAR</button>
        </div>

        {/* FORMULÁRIO DE CADASTRO */}
        <div className="cadastro__form">
          <div className="cadastro__field">
            <label>NOME</label>
            <input
              type="text"
              placeholder="SEU NOME"
              className="cadastro__input"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="cadastro__field">
            <label>EMAIL</label>
            <input
              type="email"
              placeholder="SEU@EMAIL.COM"
              className="cadastro__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="cadastro__field">
            <label>SENHA</label>
            <input
              type="password"
              placeholder="MINIMO 6 CARACTERES"
              className="cadastro__input"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <div className="cadastro__field">
            <label>CONFIRMAR SENHA</label>
            <input
              type="password"
              placeholder="REPITA A SENHA"
              className="cadastro__input"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
          </div>

          {erro && <p className="cadastro__erro">{erro}</p>}

          <button className="cadastro__button" onClick={handleCadastro}>
            CRIAR CONTA
          </button>
        </div>

        {/* DIVISOR "OU" */}
        <div className="cadastro__divider">
          <span>OU</span>
        </div>

        {/* AUTENTICAÇÃO SOCIAL GOOGLE */}
        <button 
          type="button" 
          className="cadastro__google-btn"
          onClick={() => alert('Integração com Google em desenvolvimento.')}
        >
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_活跃徽标.svg" 
            alt="Google Logo" 
          />
          Continuar com Google
        </button>

        {/* LINKS DE TERMOS LEGAIS DO RODAPÉ */}
        <footer className="cadastro__footer-links">
          Ao criar conta você concorda com os <a href="#termos">Termos de Uso</a> e <a href="#politica">Política de Privacidade</a>
        </footer>

      </div>
    </div>
  )
}

