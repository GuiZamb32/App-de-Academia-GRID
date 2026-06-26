#  GRID - Sistema de Gerenciamento de Treinos

<p align="center">
  <img src="https://github.com/GuiZamb32/App-de-Academia-GRID/blob/main/frontend/public/Logo_GRID.png?raw=true" width="350" alt="Logo GRID">
</p>

<p align="center">

![React](https://img.shields.io/badge/React-19-blue)
![Node](https://img.shields.io/badge/Node.js-22-green)
![Express](https://img.shields.io/badge/Express-Backend-black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)
![License](https://img.shields.io/badge/license-MIT-green)

</p>

---

##  Sobre o Projeto

O **GRID** é uma aplicação Full Stack desenvolvida para auxiliar praticantes de musculação no gerenciamento de seus treinos.

A plataforma permite:

- Cadastro e autenticação de usuários;
- Criação de treinos personalizados;
- Cadastro de exercícios;
- Organização dos exercícios por grupos musculares;
- Controle de séries, repetições e carga;
- Persistência da sessão do usuário;
- Recuperação automática do último treino acessado.

O projeto foi desenvolvido utilizando **React**, **Node.js**, **Express** e **PostgreSQL**, seguindo uma arquitetura cliente-servidor.

---

#  Funcionalidades

##  Usuários

- Cadastro de conta;
- Login e Logout;
- Autenticação via JWT;
- Atualização de dados do perfil;
- Alteração de foto de perfil;
- Persistência do usuário após atualização da página.

---

##  Treinos

- Criar treinos personalizados;
- Listar treinos do usuário;
- Selecionar treino atual;
- Persistência do treino selecionado;
- Recuperação automática do último treino acessado.

---

##  Exercícios

- Cadastro de exercícios;
- Definição de:
  - Nome;
  - Grupo muscular;
  - Séries;
  - Repetições;
  - Carga.

---

##  Persistência de Dados

A aplicação utiliza o **localStorage** para armazenar:

- Usuário logado;
- Página atual;
- Treino selecionado.

Isso permite que o usuário continue de onde parou mesmo após atualizar o navegador.

---

#  Tecnologias Utilizadas

## Backend

- Node.js
- Express
- PostgreSQL
- JWT
- bcrypt
- dotenv
- CORS

## Frontend

- React
- Vite
- CSS3
- Fetch API
- LocalStorage API

---

#  Arquitetura do Projeto

```text
Frontend (React)
       ↓
    Fetch API
       ↓
Backend (Express)
       ↓
 PostgreSQL
```

---

#  Estrutura do Projeto

```text
App-de-Academia-GRID
│
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── database
│   │   ├── middlewares
│   │   ├── routes
│   │   └── server.js
│   │
│   ├── .env
│   └── package.json
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── pages
│   │   ├── services
│   │   ├── styles
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
└── README.md
```

---

#  Instalação

## 1. Clonar o repositório

```bash
git clone https://github.com/GuiZamb32/App-de-Academia-GRID.git
cd App-de-Academia-GRID
```

---

#  Configuração do Banco de Dados

Crie um banco chamado:

```text
grid_academia
```

Execute:

```sql
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  senha TEXT,
  foto TEXT
);

CREATE TABLE treinos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100),
  usuario_id INTEGER REFERENCES usuarios(id)
);

CREATE TABLE exercicios (
  id SERIAL PRIMARY KEY,
  treino_id INTEGER REFERENCES treinos(id),
  nome VARCHAR(100),
  grupo VARCHAR(100),
  series INTEGER,
  reps INTEGER,
  carga NUMERIC
);
```

---

#  Executando o Backend

```bash
cd backend
npm install
npm install nodemon --save-dev
npm run dev
```

Crie um arquivo `.env`:

```env
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_NAME=grid_academia
JWT_SECRET=grid_secret
```

Servidor:

```text
http://localhost:3001
```

---

#  Executando o Frontend

```bash
cd frontend
npm install
npm run dev
```

Aplicação:

```text
http://localhost:5173
```

---

#  Rotas da API

## Autenticação

### Cadastro

```http
POST /auth/cadastro
```

```json
{
  "nome": "Guilherme",
  "email": "gui@email.com",
  "senha": "123456"
}
```

---

### Login

```http
POST /auth/login
```

---

## Treinos

### Listar Treinos

```http
GET /treinos
```

### Criar Treino

```http
POST /treinos
```

```json
{
  "nome": "Treino A"
}
```

---

## Exercícios

### Listar Exercícios

```http
GET /exercicios/:treinoId
```

### Criar Exercício

```http
POST /exercicios
```

```json
{
  "treino_id": 1,
  "nome": "Supino Reto",
  "grupo": "Peito",
  "series": 4,
  "reps": 12,
  "carga": 30
}
```

---

#  Telas do Sistema

- Login
- Cadastro
- Home
- Perfil
- Treinos
- Exercícios
- Treino Atual

> Recomenda-se adicionar capturas de tela aqui futuramente.

---

#  Próximas Funcionalidades

- [ ] Editar exercícios
- [ ] Excluir exercícios
- [ ] Editar treinos
- [ ] Excluir treinos
- [ ] Histórico de treinos concluídos
- [ ] Dashboard de evolução
- [ ] Gráficos de progressão de carga
- [ ] Timer de descanso
- [ ] Sistema de notificações
- [ ] Dark Mode completo
- [ ] Responsividade para tablets e smartphones

---

#  Autor

**Guilherme Zamboni Menegacio**

GitHub:

https://github.com/GuiZamb32

---

# 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos e de aprendizado.
