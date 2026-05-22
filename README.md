# 🏋️ GRID Academy

Sistema Full Stack para gerenciamento de treinos de academia. O projeto permite o cadastro de usuários, criação de rotas de treino customizadas e organização de exercícios por grupo muscular com controle de carga.



## 🚀 Tecnologias

### Backend
* **Node.js** (Ambiente de execução)
* **Express** (Framework web)
* **PostgreSQL** (Banco de dados relacional)
* **JWT** (Autenticação baseada em tokens)
* **bcrypt** (Criptografia de senhas)
* **dotenv** (Gerenciamento de variáveis de ambiente)

### Frontend
* **React** (Biblioteca UI)
* **Vite** (Build tool rápida)
* **CSS Modules** (Estilização escopada)
* **Fetch API** (Consumo da API)



## 📂 Estrutura do Projeto
```
App-de-Academia-GRID/
│
├── backend/
│   ├── src/
│   ├── controllers/
│   ├── db/
│   ├── middleware/
│   ├── routes/
│   ├── server.js
│   └── app.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│
└── README.md
```


## ⚙️ Instalação e Configuração
### 1. Clonar o Repositório
```
git clone https://github.com/seu-usuario/App-de-Academia-GRID.git
cd App-de-Academia-GRID


```
### 2. Configuração do Banco de Dados (PostgreSQL)
```
Abra o pgAdmin (ou seu SGBD de preferência), crie um banco de dados chamado grid_academia e execute as seguintes queries para criar as tabelas:

CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  senha TEXT
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
### 3. Configuração do Backend
```
Entre na pasta correspondente, instale as dependências e configure o ambiente:

cd backend
npm install
npm install nodemon --save-dev
```

Crie um arquivo .env na raiz da pasta backend/ com as seguintes variáveis:

```
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_NAME=grid_academia
JWT_SECRET=grid_secret
```

Para iniciar o servidor de desenvolvimento:
npm run dev

> Servidor rodando em: http://localhost:3001


### 4. Configuração do Frontend
Abra um novo terminal, navegue até a pasta do frontend e inicie a aplicação:

cd frontend
npm install
npm run dev

> Frontend rodando em: http://localhost:5173




## 🔐 Funcionalidades Atuais

* **Usuário:** Cadastro, Login e Logout (com privacidade e segurança via JWT).
* **Treinos:** Criação e listagem de treinos personalizados por usuário.
* **Exercícios:** Vínculo de exercícios aos treinos, com controle de séries, repetições e peso.




## 📡 Rotas da API

### Autenticação (/auth)

* POST /auth/cadastro - Registra um novo usuário
* POST /auth/login - Autentica o usuário e retorna o token JWT
```
Exemplo de Body (Cadastro):
{
  "nome": "Guilherme",
  "email": "gui@email.com",
  "senha": "123456"
}
```
### Treinos (/treinos)

* GET /treinos - Lista todos os treinos do usuário autenticado
* POST /treinos - Cria um novo treino
```
Exemplo de Body (Criar Treino):
{
  "nome": "Treino A"
}
```
### Exercícios (/exercicios)

* GET /exercicios/:treinoId - Lista os exercícios vinculados a um treino específico
* POST /exercicios - Adiciona um novo exercício ao treino
```
Exemplo de Body (Criar Exercício):
{
  "treino_id": 1,
  "nome": "Supino",
  "grupo": "Peito",
  "series": 3,
  "reps": 12,
  "carga": 20
}
```


## 📌 Próximas Features

- [ ] Editar e excluir exercícios/treinos
- [ ] Dashboard com gráficos de evolução
- [ ] Histórico de treinos concluídos
- [ ] Gráfico de progressão de carga
- [ ] Timer integrado para descanso entre séries
- [ ] Tela de gerenciamento do perfil do usuário
- [ ] Dark mode avançado



## 👨‍💻 Autor

Desenvolvido por Guilherme Zamboni Menegacio.