# 🌐 Guia de Deploy - Colocar Online

## Opção 1: Deploy Gratuito Recomendado

### Backend: Railway.app
### Frontend: Vercel
### Banco: Supabase (PostgreSQL gratuito)

---

## 📦 Passo 1: Banco de Dados (Supabase)

1. Acesse: https://supabase.com
2. Crie uma conta (pode usar GitHub)
3. Clique em "New Project"
4. Preencha:
   - Nome: meuapp
   - Senha do banco: (crie uma senha forte)
   - Região: South America (São Paulo)
5. Aguarde criar (~2 minutos)
6. Vá em "Settings" → "Database"
7. Role até "Connection string" → "URI"
8. Copie a string de conexão (algo como: `postgresql://postgres:senha@...`)
9. Vá em "SQL Editor" → "New query"
10. Cole o conteúdo de `backend/database/init.sql`
11. Clique em "Run"

✅ Banco criado e online!

---

## 🚂 Passo 2: Backend (Railway)

1. Acesse: https://railway.app
2. Login com GitHub
3. Clique em "New Project" → "Deploy from GitHub repo"
4. Conecte seu GitHub e selecione o repositório
5. Clique na pasta `backend`
6. Vá em "Variables" e adicione:

```
NODE_ENV=production
PORT=5000
DB_HOST=db.xxxxx.supabase.co
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha_supabase
DB_NAME=postgres
JWT_SECRET=crie_uma_chave_secreta_segura_aqui_123xyz
```

**IMPORTANTE:** Pegue os dados de conexão do Supabase:
- DB_HOST: está na string de conexão (após @)
- DB_PASSWORD: a senha que você criou no Supabase
- DB_NAME: geralmente é `postgres`

7. Railway vai fazer deploy automaticamente
8. Clique em "Settings" → "Generate Domain"
9. Copie a URL gerada (ex: `https://backend-production-xxxx.up.railway.app`)

✅ Backend online!

---

## ⚛️ Passo 3: Frontend (Vercel)

1. Acesse: https://vercel.com
2. Login com GitHub
3. Clique em "Add New" → "Project"
4. Importe seu repositório
5. Configure:
   - Framework Preset: Create React App
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`

6. Em "Environment Variables" adicione:
```
REACT_APP_API_URL=https://backend-production-xxxx.up.railway.app/api
```
(Use a URL do Railway do passo anterior)

7. Clique em "Deploy"
8. Aguarde ~2 minutos

✅ Frontend online!

---

## 🧪 Testar

1. Acesse a URL do Vercel (ex: `https://meuapp.vercel.app`)
2. Clique em "Cadastre-se"
3. Crie uma conta
4. Faça login
5. Se funcionou, parabéns! 🎉

---

## Opção 2: Outras Alternativas

### Backend:
- **Render.com** (gratuito, mais lento)
- **Fly.io** (gratuito com limites)
- **Heroku** (pago após trial)

### Frontend:
- **Netlify** (gratuito, similar ao Vercel)
- **GitHub Pages** (gratuito, requer configuração extra)
- **Cloudflare Pages** (gratuito)

### Banco:
- **ElephantSQL** (PostgreSQL, plano gratuito de 20MB)
- **Neon** (PostgreSQL serverless, gratuito)
- **PlanetScale** (MySQL, mas precisaria adaptar)

---

## 🔧 Deploy Railway - Detalhado

### Preparar o código:

1. Adicione ao `backend/package.json`:
```json
"engines": {
  "node": "18.x"
}
```

2. Crie `backend/railway.json`:
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE"
  }
}
```

### Se der erro de CORS:

Adicione no `backend/server.js`, antes das rotas:
```javascript
app.use(cors({
  origin: ['https://seuapp.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
```

---

## 🔧 Deploy Vercel - Detalhado

### Configurar redirects para SPA:

Crie `frontend/public/_redirects`:
```
/*    /index.html   200
```

Ou `frontend/vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 🔐 Segurança em Produção

### Backend `.env` (Railway):
```env
# NUNCA usar valores padrão em produção!
JWT_SECRET=use_um_valor_aleatorio_muito_longo_e_seguro_aqui

# SEMPRE usar HTTPS em produção
NODE_ENV=production

# Configurar CORS adequadamente (sem *)
# Adicione no server.js os domínios permitidos
```

### Checklist de Segurança:
- [ ] JWT_SECRET único e forte (30+ caracteres aleatórios)
- [ ] Senha do PostgreSQL forte
- [ ] CORS configurado apenas para seus domínios
- [ ] HTTPS ativado (Vercel/Railway já fazem isso)
- [ ] Variáveis sensíveis apenas em .env (nunca no código)

---

## 📊 Monitoramento

### Railway:
- Veja logs em tempo real no dashboard
- Configure alertas de downtime

### Vercel:
- Analytics gratuito disponível
- Logs de build e runtime

### Supabase:
- Dashboard mostra uso do banco
- Plano gratuito: 500MB storage, 2GB transferência

---

## 💰 Custos

### Plano Gratuito Completo:
- Railway: 500 horas/mês ($5 grátis)
- Vercel: Ilimitado
- Supabase: 500MB banco

**Total: R$ 0/mês** para começar!

### Quando pagar?
- Muitos usuários simultâneos
- Banco > 500MB
- Mais de 500h/mês de backend

---

## 🆘 Problemas Comuns

**"Application failed to respond"**
→ Verifique variáveis de ambiente no Railway

**"502 Bad Gateway"**
→ Backend demorou muito para iniciar, aguarde 1-2min

**"CORS error" no frontend**
→ Configure CORS no backend com domínio do Vercel

**"Database connection failed"**
→ Verifique credenciais do Supabase nas variáveis do Railway

**Frontend funciona local mas não online**
→ Verifique REACT_APP_API_URL nas variáveis do Vercel

---

## 📝 Manutenção

### Atualizar o app:

1. Faça commit das mudanças no GitHub
2. Vercel e Railway fazem deploy automático!

### Ver logs:

**Railway:** Dashboard → View Logs
**Vercel:** Dashboard → Deployments → View Function Logs

---

## 🎓 Próximos Passos

Após deploy:
1. Configure domínio customizado (ex: meuapp.com.br)
2. Adicione Google Analytics
3. Configure backups do banco
4. Implemente monitoring (Sentry, LogRocket)
5. Adicione CI/CD com testes automatizados

---

## 📚 Links Úteis

- Railway Docs: https://docs.railway.app
- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.com/docs
- PostgreSQL Connection String: https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING