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

  // verifica se existe usuario salvo
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

    {/* TREINOS (TELA DE SELEÇÃO PARA INICIAR O TREINO ATUAL) */}
    {pagina === 'treinos' && (
      <Treinos
        voltar={() => setPagina('home')}
        // 🛑 Removemos o botão/propriedade de criar treino daqui se houver no componente
        abrirCriarTreino={null} 

        // 💡 CORRIGIDO: Quando clicar no treino para iniciar, salva o treino selecionado e vai para a EXECUÇÃO (Treino Atual)
        abrirExercicios={(treino) => {
          setTreinoSelecionado(treino)
          setPagina('treinoAtual') // 🔥 Mudado de 'exercicios' para 'treinoAtual'
        }}
      />
    )}

    {/* CRIAR TREINO */}
    {pagina === 'criarTreino' && (
      <CriarTreino
        voltar={() => setPagina('treinos')}
        selecionarTreino={(treino) => {
          setTreinoSelecionado(treino) // Guarda o treino que foi clicado
          setPagina('exercicios')      // Redireciona para a tela de exercícios
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
        />
      )}

      {/* Mude no seu App.jsx para ficar assim: */}
      {pagina === 'treinoAtual' && (
        <TreinoAtual
          treinoId={treinoSelecionado?.id}     // 🔥 PASSANDO O ID REAL
          treinoNome={treinoSelecionado?.nome} // 🔥 PASSANDO O NOME REAL
          voltar={() => setPagina('home')}
        />
      )}

    </div>
  )
}

export default App