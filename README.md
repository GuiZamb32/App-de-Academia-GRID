# 🚀 MeuApp - Aplicação Full Stack

Sistema completo com backend Node.js, frontend React e PostgreSQL.

## 📋 Tecnologias

### Backend
- Node.js + Express
- PostgreSQL (com pg)
- JWT para autenticação
- bcrypt para criptografia de senhas

### Frontend
- React 18
- React Router DOM
- Axios
- Context API para gerenciamento de estado

## 🔧 Instalação

### 1. Pré-requisitos
- Node.js (v14+)
- PostgreSQL (v12+)
- pgAdmin (opcional, para gerenciar o banco)

### 2. Configurar o Banco de Dados

#### Usando pgAdmin:
1. Abra o pgAdmin
2. Crie um novo banco de dados chamado `app_database`
3. Abra o Query Tool
4. Execute o conteúdo do arquivo `backend/database/init.sql`

#### Usando psql (linha de comando):
```bash
# Conectar ao PostgreSQL
psql -U postgres

# Criar banco
CREATE DATABASE app_database;

# Conectar ao banco
\c app_database

# Executar script (dentro do psql)
\i /caminho/completo/para/backend/database/init.sql
```

### 3. Configurar Backend

```bash
cd backend

# Instalar dependências
npm install

# Copiar arquivo de configuração
cp .env.example .env

# Editar .env e configurar suas credenciais do PostgreSQL
# Especialmente: DB_PASSWORD e JWT_SECRET
nano .env
```

### 4. Configurar Frontend

```bash
cd frontend

# Instalar dependências
npm install
```

## 🚀 Executar o Projeto

### Opção 1: Manual (2 terminais)

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# ou para desenvolvimento com auto-reload:
npm run dev
```

O backend estará rodando em: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

O frontend estará rodando em: http://localhost:3000

### Opção 2: Script Automatizado

```bash
# Na raiz do projeto
chmod +x start-dev.sh
./start-dev.sh
```

## 📚 Estrutura do Projeto

```
app-projeto/
├── backend/
│   ├── config/
│   │   └── database.js          # Configuração PostgreSQL
│   ├── controllers/
│   │   └── authController.js    # Lógica de autenticação
│   ├── database/
│   │   └── init.sql             # Script de inicialização do BD
│   ├── middleware/
│   │   └── auth.js              # Middleware JWT
│   ├── routes/
│   │   └── auth.js              # Rotas de autenticação
│   ├── .env.example             # Exemplo de configuração
│   ├── package.json
│   └── server.js                # Servidor Express
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── contexts/
    │   │   └── AuthContext.js   # Context de autenticação
    │   ├── pages/
    │   │   ├── Home.js
    │   │   ├── Home.css
    │   │   ├── Login.js
    │   │   ├── Cadastro.js
    │   │   └── Auth.css
    │   ├── services/
    │   │   └── api.js           # Configuração Axios
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    ├── .env
    └── package.json
```

## 🔐 API Endpoints

### Autenticação

**POST /api/auth/registrar**
```json
{
  "nome": "Nome Completo",
  "email": "email@exemplo.com",
  "senha": "senha123",
  "telefone": "(48) 99999-9999"
}
```

**POST /api/auth/login**
```json
{
  "email": "email@exemplo.com",
  "senha": "senha123"
}
```

**GET /api/auth/perfil** (requer token)
- Header: `Authorization: Bearer {token}`

## 🌐 Preparando para Produção

### Backend (Heroku, Railway, Render)

1. Configure as variáveis de ambiente
2. Use um banco PostgreSQL em produção
3. Configure CORS adequadamente
4. Use HTTPS

### Frontend (Vercel, Netlify)

1. Faça build: `npm run build`
2. Configure a variável `REACT_APP_API_URL` para apontar para o backend em produção
3. Configure redirecionamentos para SPA

### Banco de Dados

Opções gratuitas:
- **ElephantSQL** (PostgreSQL hospedado)
- **Supabase** (PostgreSQL com recursos extras)
- **Neon** (PostgreSQL serverless)

## 🧪 Testando a API

### Usando cURL:

```bash
# Registrar
curl -X POST http://localhost:5000/api/auth/registrar \
  -H "Content-Type: application/json" \
  -d '{"nome":"Teste","email":"teste@email.com","senha":"123456"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@email.com","senha":"123456"}'
```

## 📝 Próximos Passos

- [ ] Adicionar recuperação de senha
- [ ] Implementar perfil de usuário editável
- [ ] Adicionar validações mais robustas
- [ ] Implementar refresh tokens
- [ ] Adicionar testes automatizados
- [ ] Implementar rate limiting
- [ ] Adicionar logs estruturados

## 🆘 Problemas Comuns

**Erro de conexão com PostgreSQL:**
- Verifique se o PostgreSQL está rodando
- Confirme as credenciais no `.env`
- Verifique se o banco `app_database` existe

**Erro CORS no frontend:**
- Verifique se o backend está rodando
- Confirme a URL da API no `.env` do frontend

**Token inválido:**
- Verifique se o `JWT_SECRET` é o mesmo no backend
- O token expira em 7 dias

## 📄 Licença

MIT

## 👨‍💻 Autor

Guilherme Zamboni Menegacio