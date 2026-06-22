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
  const [treinoSelecionado, setTreinoSelecionado] =
    useState(null)
  const [carregando, setCarregando] =
    useState(true)

  // Restaura dados do localStorage
  useEffect(() => {
    const usuarioSalvo =
      localStorage.getItem('usuario')

    const paginaSalva =
      localStorage.getItem('paginaAtual')

    const treinoSalvo =
      localStorage.getItem('treinoSelecionado')

    if (usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo))
    }

    if (paginaSalva) {
      setPagina(paginaSalva)
    }

    if (treinoSalvo) {
      setTreinoSelecionado(
        JSON.parse(treinoSalvo)
      )
    }

    setCarregando(false)
  }, [])

  // Salva a página atual
  useEffect(() => {
    if (!carregando) {
      localStorage.setItem(
        'paginaAtual',
        pagina
      )
    }
  }, [pagina, carregando])

  // Salva o treino selecionado
  useEffect(() => {
    if (treinoSelecionado) {
      localStorage.setItem(
        'treinoSelecionado',
        JSON.stringify(
          treinoSelecionado
        )
      )
    }
  }, [treinoSelecionado])

  function mudarPagina(novaPagina) {
    setPagina(novaPagina)
  }

  // Login
  function handleEntrar() {
    const usuarioSalvo =
      localStorage.getItem('usuario')

    if (usuarioSalvo) {
      setUsuario(
        JSON.parse(usuarioSalvo)
      )
    }

    mudarPagina('home')
  }

  // Logout
  function handleSair() {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    localStorage.removeItem('paginaAtual')
    localStorage.removeItem(
      'treinoSelecionado'
    )

    setUsuario(null)
    setTreinoSelecionado(null)
    mudarPagina('login')
  }

  // Atualiza usuário
  function handleAtualizarUsuarioLocal(
    novosDados
  ) {
    setUsuario((prev) => {
      const usuarioAtualizado = {
        ...prev,
        ...novosDados,
      }

      localStorage.setItem(
        'usuario',
        JSON.stringify(
          usuarioAtualizado
        )
      )

      return usuarioAtualizado
    })
  }

  if (carregando) {
    return null
  }

  return (
    <div className="app">

      {pagina === 'login' && (
        <Login
          irCadastro={() =>
            mudarPagina('cadastro')
          }
          entrar={handleEntrar}
        />
      )}

      {pagina === 'cadastro' && (
        <Cadastro
          voltar={() =>
            mudarPagina('login')
          }
          criarConta={() =>
            mudarPagina('login')
          }
        />
      )}

      {pagina === 'home' && (
        <Home
          usuario={usuario}
          sair={handleSair}
          navegar={mudarPagina}
        />
      )}

      {pagina === 'treinos' && (
        <Treinos
          voltar={() =>
            mudarPagina('home')
          }
          abrirCriarTreino={null}
          abrirExercicios={(treino) => {
            setTreinoSelecionado(
              treino
            )

            localStorage.setItem(
              'treinoSelecionado',
              JSON.stringify(treino)
            )

            mudarPagina('treinoAtual')
          }}
        />
      )}

      {pagina === 'criarTreino' && (
        <CriarTreino
          voltar={() =>
            mudarPagina('treinos')
          }
          selecionarTreino={(
            treino
          ) => {
            setTreinoSelecionado(
              treino
            )
            mudarPagina('exercicios')
          }}
        />
      )}

      {pagina === 'exercicios' && (
        <Exercicios
          treinoId={
            treinoSelecionado?.id
          }
          treinoNome={
            treinoSelecionado?.nome
          }
          voltar={() =>
            mudarPagina('treinos')
          }
        />
      )}

      {pagina === 'perfil' && (
        <Perfil
          usuario={usuario}
          voltar={() =>
            mudarPagina('home')
          }
          sair={handleSair}
          aoAtualizarPerfil={
            handleAtualizarUsuarioLocal
          }
        />
      )}

      {pagina === 'treinoAtual' && (
        <TreinoAtual
          treinoId={
            treinoSelecionado?.id
          }
          treinoNome={
            treinoSelecionado?.nome
          }
          voltar={() =>
            mudarPagina('home')
          }
        />
      )}
    </div>
  )
}

export default App