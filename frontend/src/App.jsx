import { useEffect, useState } from 'react'

import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Home from './pages/Home'

import Treinos from './pages/Treinos'
import CriarTreino from './pages/CriarTreino'
import Exercicios from './pages/Exercicios'

import Perfil from './pages/Perfil'
import TreinoAtual from './pages/TreinoAtual'

import './styles/App.css'

function App() {
  const [pagina, setPagina] = useState('login')
  const [usuario, setUsuario] = useState(null)
  const [treinoSelecionado, setTreinoSelecionado] = useState(null)

  // verifica se existe usuario salvo ao iniciar
  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('usuario')

    if (usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo))
      setPagina('home')
    }
  }, [])

  // login
  function handleEntrar() {
    const usuarioSalvo = localStorage.getItem('usuario')

    if (usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo))
    }

    setPagina('home')
  }

  // logout
  function handleSair() {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    setUsuario(null)
    setPagina('login')
  }

  // 💡 NOVA FUNÇÃO: Sincroniza as alterações do Perfil no Estado e no LocalStorage
  function handleAtualizarUsuarioLocal(novosDados) {
    setUsuario((prev) => {
      const usuarioAtualizado = { ...prev, ...novosDados }
      // Atualiza o localStorage para manter salvo mesmo se atualizar a página (F5)
      localStorage.setItem('usuario', JSON.stringify(usuarioAtualizado))
      return usuarioAtualizado
    })
  }

  return (
    <div className="app">

      {/* LOGIN */}
      {pagina === 'login' && (
        <Login
          irCadastro={() => setPagina('cadastro')}
          entrar={handleEntrar}
        />
      )}

      {/* CADASTRO */}
      {pagina === 'cadastro' && (
        <Cadastro
          voltar={() => setPagina('login')}
          criarConta={() => setPagina('login')}
        />
      )}

      {/* HOME */}
      {pagina === 'home' && (
        <Home
          usuario={usuario}
          sair={handleSair}
          navegar={setPagina}
        />
      )}

      {/* TREINOS */}
      {pagina === 'treinos' && (
        <Treinos
          voltar={() => setPagina('home')}
          abrirCriarTreino={null} 
          abrirExercicios={(treino) => {
            setTreinoSelecionado(treino)
            setPagina('treinoAtual')
          }}
        />
      )}

      {/* CRIAR TREINO */}
      {pagina === 'criarTreino' && (
        <CriarTreino
          voltar={() => setPagina('treinos')}
          selecionarTreino={(treino) => {
            setTreinoSelecionado(treino)
            setPagina('exercicios')
          }}
        />
      )}

      {/* EXERCICIOS */}
      {pagina === 'exercicios' && (
        <Exercicios
          treinoId={treinoSelecionado?.id}
          treinoNome={treinoSelecionado?.nome}
          voltar={() => setPagina('treinos')}
        />
      )}

      {/* PERFIL */}
      {pagina === 'perfil' && (
        <Perfil
          usuario={usuario}
          voltar={() => setPagina('home')}
          sair={handleSair}
          // 💡 Sincronização em tempo real ativada aqui!
          aoAtualizarPerfil={handleAtualizarUsuarioLocal}
        />
      )}

      {/* TREINO ATUAL */}
      {pagina === 'treinoAtual' && (
        <TreinoAtual
          treinoId={treinoSelecionado?.id}
          treinoNome={treinoSelecionado?.nome}
          voltar={() => setPagina('home')}
        />
      )}

    </div>
  )
}

export default App