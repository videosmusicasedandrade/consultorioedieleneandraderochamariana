# Guia Passo a Passo: Publicar na Vercel com Banco Supabase
## Clínica Edilene Andrade — Mariana, MG

Este guia detalha o processo completo para colocar o site no ar na Vercel com conexão ao banco Supabase.

---

## 📋 Pré-requisitos (Todos Gratuitos)
1. Conta no [GitHub](https://github.com)
2. Conta na [Vercel](https://vercel.com)
3. Conta no [Supabase](https://supabase.com)

---

## 🗄️ PARTE 1: Criar o Projeto no Supabase & Pegar as Chaves

1. Acesse [supabase.com](https://supabase.com) e clique em **"New Project"**.
2. Preencha:
   - **Name:** `clinica-edilene-andrade`
   - **Database Password:** crie uma senha forte e anote.
   - **Region:** `South America (São Paulo)` (para menor latência no Brasil)
   - **Pricing Plan:** `Free` (grátis)
3. Clique em **"Create new project"** e aguarde cerca de 1 minuto até o banco inicializar.

### Executar o Script SQL (Criação de Tabelas)
1. No menu lateral esquerdo do Supabase, clique em **"SQL Editor"**.
2. Clique em **"New query"**.
3. Copie o script completo contido na aba **"🗄️ Supabase & Vercel"** do Painel da Dra. Edilene (ou no arquivo `src/services/db.ts` no `SUPABASE_SQL_SCHEMA`).
4. Cole no editor e clique no botão verde **"Run"**.
5. Todas as 9 tabelas serão criadas com índices:
   - `usuarios`
   - `conversas_chat`
   - `agendamentos`
   - `indicacoes`
   - `promocoes_resgatadas`
   - `quiz_respostas`
   - `artigos_blog`
   - `comentarios_blog`
   - `newsletter_assinantes`

### Copiar suas Chaves da API
1. No menu lateral esquerdo, clique no ícone de engrenagem **"Project Settings"** (Configurações do Projeto).
2. Clique em **"API"**.
3. Você verá:
   - **Project URL:** algo como `https://abcdefghijklmnopqrst.supabase.co`
   - **Project API Keys (anon / public):** algo como `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
4. Deixe essa página aberta ou copie esses dois valores.

---

## 🚀 PARTE 2: Subir o Repositório no GitHub

Abra o terminal na pasta do projeto e execute os comandos:

```bash
# 1. Iniciar o repositório git (caso ainda não esteja iniciado)
git init

# 2. Adicionar todos os arquivos
git add .

# 3. Criar o commit inicial
git commit -m "Site completo Clínica Edilene Andrade com agendamento, blog e newsletter"

# 4. Definir a branch principal
git branch -M main

# 5. Conectar ao seu repositório no GitHub
git remote add origin https://github.com/SEU_USUARIO/clinica-edilene-andrade.git

# 6. Enviar os arquivos
git push -u origin main
```

---

## 🌐 PARTE 3: Configurar o Projeto na Vercel com as Variáveis de Ambiente

1. Acesse [vercel.com](https://vercel.com) e faça login com sua conta do GitHub.
2. Na página inicial do Dashboard, clique em **"Add New..."** ➔ **"Project"**.
3. Localize o repositório `clinica-edilene-andrade` na lista e clique em **"Import"**.
4. Na tela de configuração **"Configure Project"**:
   - **Project Name:** `clinica-edilene-andrade` (ou como preferir)
   - **Framework Preset:** `Vite` (a Vercel reconhece automaticamente)
   - **Root Directory:** `./`
   - **Build and Output Settings:** Deixe os padrões (`npm run build` e diretório `dist`).

### Configurar as Variáveis de Ambiente na Vercel:
Abaixo das configurações de build, clique na seção **"Environment Variables"** para expandi-la e adicione as duas variáveis:

#### Variável 1:
- **Key (Nome):** `VITE_SUPABASE_URL`
- **Value (Valor):** Cole a sua **Project URL** do Supabase (ex: `https://abcdefghij.supabase.co`)
- Clique em **"Add"**.

*(Dica: você também pode adicionar `SUPABASE_URL` com o mesmo valor).*

#### Variável 2:
- **Key (Nome):** `VITE_SUPABASE_ANON_KEY`
- **Value (Valor):** Cole a sua **anon public key** do Supabase (ex: `eyJhbGciOi...`)
- Clique em **"Add"**.

*(Dica: você também pode adicionar `SUPABASE_ANON_KEY` com o mesmo valor).*

---

## 🎉 PARTE 4: Deploy e Verificação

1. Clique no botão azul **"Deploy"** no final da página da Vercel.
2. Aguarde cerca de 45 a 60 segundos enquanto a Vercel compila o TypeScript e o Tailwind CSS.
3. Ao finalizar, você verá a tela de celebração com os confetes:
   **"Congratulations! Your project is deployed."**
4. Clique no print do site ou no botão **"Visit"** para abrir o site em produção!
5. Teste:
   - Navegue pelos tratamentos e comparadores antes/depois.
   - Faça um agendamento online de teste.
   - Assine a newsletter no rodapé.
   - Acesse o painel com login `edilenerocha@gmail.com` e senha `edilene55@` e confira a aba **"🗄️ Supabase & Vercel"** com o status em tempo real.

---

## 🔄 Como atualizar o site no futuro?
Sempre que você fizer alterações no código, basta rodar:
```bash
git add .
git commit -m "Nova melhoria"
git push
```
A Vercel recompilará e atualizará o site no ar automaticamente em menos de 1 minuto, sem queda no serviço!
