// linha antiga:
// const API_URL = 'http://localhost:3001'

// URL do backend que está no Render:
const API_URL = 'https://app-de-academia-grid-api.onrender.com'


export async function cadastrarUsuario(dados) {
  const response = await fetch(`${API_URL}/auth/cadastro`, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(dados),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.erro)
  }

  return data
}

export async function loginUsuario(dados) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(dados),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.erro)
  }

  return data
}

export async function listarTreinos() {
  const token = localStorage.getItem('token')

  const response = await fetch(`${API_URL}/treinos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const data = await response.json()

  return data
}

export async function criarTreino(nome) {
  const token = localStorage.getItem('token')

  const response = await fetch(`${API_URL}/treinos`, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({
      nome,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.erro)
  }

  return data
}

export async function listarExercicios(treinoId) {
  const token = localStorage.getItem('token')

  const response = await fetch(
    `${API_URL}/exercicios/${treinoId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  const data = await response.json()

  return data
}

export async function criarExercicio(dados) {
  const token = localStorage.getItem('token')

  const response = await fetch(
    `${API_URL}/exercicios`,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(dados),
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.erro)
  }

  return data
}

export async function buscarPerfil() {
  const token =
    localStorage.getItem('token')

  const response = await fetch(
    `${API_URL}/usuario/perfil`,
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  )

  return await response.json()
}

export async function atualizarPerfil(
  dados
) {
  const token =
    localStorage.getItem('token')

  const response = await fetch(
    `${API_URL}/usuario/perfil`,
    {
      method: 'PUT',

      headers: {
        'Content-Type':
          'application/json',

        Authorization:
          `Bearer ${token}`,
      },

      body: JSON.stringify(dados),
    }
  )

  const data =
    await response.json()

  if (!response.ok) {
    throw new Error(data.erro)
  }

  return data
}

export async function buscarEstatisticasUsuario() {
  const token = localStorage.getItem('token')

  const response = await fetch(
    `${API_URL}/usuario/estatisticas`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  if (!response.ok) {
    throw new Error('Falha ao carregar os dados do painel.')
  }

  return await response.json()
}

export async function excluirTreino(id) {
  const token = localStorage.getItem('token')

  const response = await fetch(
    `${API_URL}/treinos/${id}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.erro || 'Erro ao deletar treino')
  }

  return await response.json()
}

export async function excluirExercicio(id) {
  const token = localStorage.getItem('token')

  const response = await fetch(
    `${API_URL}/exercicios/${id}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.erro || 'Erro ao deletar exercício')
  }

  return await response.json()
}