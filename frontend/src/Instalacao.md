# 🚀 Guia Rápido de Instalação

## Passo 1: Instalar PostgreSQL

### Windows:
1. Baixe em: https://www.postgresql.org/download/windows/
2. Durante instalação, anote a senha do usuário `postgres`
3. Instale também o pgAdmin (vem junto)

### Linux (Ubuntu/Debian):
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### macOS:
```bash
brew install postgresql
brew services start postgresql
```

## Passo 2: Criar o Banco de Dados

### Usando pgAdmin (Recomendado para Iniciantes):

1. Abra o pgAdmin
2. Conecte ao servidor PostgreSQL (senha que você criou)
3. Clique com botão direito em "Databases" → "Create" → "Database"
4. Nome: `app_database`
5. Clique em "Save"
6. Clique com botão direito em `app_database` → "Query Tool"
7. Cole o conteúdo do arquivo `backend/database/init.sql`
8. Clique em "Execute" (ícone de play ▶)

### Usando Terminal (psql):

```bash
# Conectar ao PostgreSQL
psql -U postgres

# Dentro do psql, executar:
CREATE DATABASE app_database;
\c app_database
\i /caminho/completo/para/backend/database/init.sql
\q
```

## Passo 3: Configurar o Backend

```bash
cd backend

# Instalar dependências
npm install

# Criar arquivo de configuração
cp .env.example .env

# Editar .env (use qualquer editor de texto)
# Importante: mudar DB_PASSWORD para a senha do seu PostgreSQL
nano .env
```

Configuração mínima do `.env`:
```
DB_PASSWORD=sua_senha_postgres_aqui
JWT_SECRET=qualquer_texto_secreto_aqui_xyz123
```

## Passo 4: Configurar o Frontend

```bash
cd frontend
npm install
```

## Passo 5: Testar

### Testar Backend:
```bash
cd backend
npm start
```

Se aparecer "✅ Conectado ao PostgreSQL", está tudo certo!
Acesse: http://localhost:5000/health

### Testar Frontend:
```bash
cd frontend
npm start
```

Deve abrir automaticamente no navegador: http://localhost:3000

## 🎉 Pronto!

Agora você pode:
1. Criar uma conta na página de Cadastro
2. Fazer login
3. Ver seu nome na Home

## ❓ Problemas?

**"error: password authentication failed"**
→ Senha incorreta no .env, corrija DB_PASSWORD

**"database 'app_database' does not exist"**
→ Execute o script init.sql no pgAdmin

**"Port 5000 already in use"**
→ Mude PORT no .env do backend

**"Port 3000 already in use"**
→ O React vai perguntar se quer usar outra porta, digite 'y'

## 📝 Comandos Úteis

```bash
# Ver logs do PostgreSQL
# Windows: Ver em Services
# Linux: sudo journalctl -u postgresql
# macOS: brew services list

# Resetar banco (CUIDADO: apaga tudo!)
psql -U postgres -d app_database -c "DROP TABLE usuarios CASCADE;"
# Depois execute init.sql novamente

# Verificar se PostgreSQL está rodando
# Windows: Services → PostgreSQL
# Linux: sudo systemctl status postgresql
# macOS: brew services list
```