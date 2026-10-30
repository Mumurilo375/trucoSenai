# Configurar e publicar o Truco Paulista

Você precisa de um projeto Supabase gratuito e de um repositório GitHub. O aplicativo usa Supabase Auth para identidades anônimas, uma tabela SQL e a API server-side do Next.js.

## 1 — Criar e configurar o Supabase

1. Acesse [supabase.com/dashboard](https://supabase.com/dashboard) e entre ou crie sua conta.
2. Clique em **New project**, escolha uma organização, digite um nome e crie uma senha para o banco. Guarde essa senha em local seguro; o jogo não precisa dela.
3. Escolha a região mais próxima e clique em **Create new project**. Espere o projeto terminar de iniciar.
4. No menu do projeto, abra **Authentication → Sign In / Providers** (em algumas versões o item aparece como **Authentication → Providers**) e ative **Anonymous Sign-Ins** / **Allow anonymous sign-ins**. Salve.
5. Copie as credenciais certas para o aplicativo:
   - **URL e chave pública:** abra **Connect → Framework** e selecione **Next.js**. No exemplo de configuração, copie a **Project URL** e a **Publishable key** (`sb_publishable_...`). Se preferir, esses dois valores também estão em **Project Settings → API Keys**.
   - **Chave secreta:** abra **Project Settings → API Keys**. Na seção **Secret keys**, copie a chave que começa com `sb_secret_`. Se ainda não houver uma, crie uma chave secreta nessa tela e copie-a.

   **Não escolha Direct connection, Transaction pooler ou Session pooler.** Essas opções fornecem uma string de conexão PostgreSQL com senha do banco. Este jogo não usa essa string: conecta-se pela API do Supabase com URL e chaves. As categorias **ORM** e **MCP** também não são necessárias. O Supabase explica a diferença entre [chaves de API](https://supabase.com/docs/guides/getting-started/api-keys) e [conexões PostgreSQL](https://supabase.com/docs/guides/database/connecting-to-postgres).
6. Abra **SQL Editor → New query**.
7. Abra o arquivo `supabase/setup.sql` deste projeto, copie todo o conteúdo e cole na consulta SQL.
8. Clique em **Run**. A tabela `rooms` e o bloqueio de acesso direto ficam prontos; não crie tabelas ou políticas à parte.

## 2 — Rodar no seu computador (opcional)

Esta etapa serve apenas para testar o jogo localmente. **Você pode pulá-la para publicar.** A Vercel instala as dependências e compila o projeto na nuvem depois que você conectar o repositório do GitHub.

1. Na pasta do projeto, copie `.env.example` para um novo arquivo chamado `.env.local`.
2. No `.env.local`, substitua os valores de exemplo:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
   SUPABASE_SECRET_KEY=sb_secret_...
   ```

   Use a URL e as chaves copiadas no passo 1. A chave `SUPABASE_SECRET_KEY` é só para o servidor; não a prefixe com `NEXT_PUBLIC_`.

3. Se quiser testar localmente e puder usar Node.js/npm, abra o terminal dentro da pasta do projeto e rode:

   ```bash
   npm install
   npm run dev
   ```

4. Abra `http://localhost:3000`. Digite um apelido e clique em **CRIAR SALA**.

   Se estiver usando um computador do trabalho onde não pode instalar npm, não instale nada nem rode esses comandos: siga direto para a etapa 3 e publique pela Vercel.

## 3 — Enviar ao GitHub

1. Acesse [github.com](https://github.com), clique em **New repository**, escolha um nome e clique em **Create repository**. Não marque a opção para adicionar README: o projeto já tem um.
2. **Se não puder instalar Git no computador da empresa, envie pelo navegador:**
   - Na página do repositório vazio, clique em **Add file → Upload files**.
   - No Explorador de Arquivos, abra a pasta `truco` do projeto e selecione o conteúdo dela. Arraste os arquivos e pastas selecionados para a área de upload do GitHub; arraste o conteúdo, não a pasta `truco` inteira, para que `package.json` fique na raiz do repositório.
   - Não selecione `node_modules`, `.next` nem `.env.local` (se existir). Inclua `.gitignore`, `.env.example`, `package.json`, `package-lock.json` e as pastas/arquivos do projeto.
   - No GitHub, escreva uma mensagem, por exemplo `Publica o Truco Paulista`, e clique em **Commit changes**. O envio pelo navegador aceita até 100 arquivos de uma vez e 25 MiB por arquivo; este projeto tem cerca de 30 arquivos de código e configuração. Veja o passo a passo oficial de [upload pelo navegador](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository).

3. **Se puder usar Git**, a alternativa pelo terminal é instalar o [Git para Windows](https://git-scm.com/download/win), abrir **Git Bash** na pasta do projeto e seguir os comandos abaixo. Antes, confira que `.env.local` não será enviado:

   ```bash
   git status --short
   ```

   O `.gitignore` exclui `.env.local` e os demais arquivos `.env.*`; `.env.example` contém somente valores fictícios e pode aparecer.

   No terminal, rode os comandos abaixo, substituindo `SEU-USUARIO` e `NOME-DO-REPOSITORIO` pelo endereço do repositório que acabou de criar:

   ```bash
   git init
   git add .
   git commit -m "Publica o Truco Paulista"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/NOME-DO-REPOSITORIO.git
   git push -u origin main
   ```

   Se o Git pedir seu nome e e-mail na primeira execução, use `git config --global user.name "Seu Nome"` e `git config --global user.email "seu@email.com"`, e rode `git commit` novamente.

## 4 — Publicar na Vercel

1. Acesse [vercel.com](https://vercel.com), entre com GitHub e clique em **Add New… → Project**.
2. Encontre o repositório do Truco e clique em **Import**. Mantenha o framework **Next.js** detectado automaticamente.
3. Em **Environment Variables**, adicione as três variáveis, cada uma com o valor correspondente do Supabase. Selecione **Production**, **Preview** e **Development** para cada uma.
4. Clique em **Deploy**. Quando o deploy concluir, clique na URL gerada para abrir o jogo.
5. Se mudar qualquer variável depois, faça um novo deploy para que ela entre em vigor. A Vercel documenta esse fluxo em [variáveis de ambiente](https://vercel.com/docs/environment-variables).

## 5 — Jogar com um amigo

1. Abra o endereço do jogo, digite seu apelido e clique em **CRIAR SALA**.
2. Clique em **COPIAR CONVITE** e mande o link ao amigo.
3. Seu amigo abre o link, informa o apelido e clica em **ENTRAR**. A partida começa quando os dois estão na sala.
4. Jogue em duas janelas ou dispositivos e confirme que cartas e pontuação atualizam automaticamente (normalmente em até 1,5 segundo).
5. Ao terminar, ambos precisam clicar em **JOGAR NOVAMENTE** para iniciar a revanche.

Cada navegador mantém uma identidade anônima. Se apagar os dados do navegador ou perder essa sessão, o Supabase não consegue recuperar automaticamente o assento original; o amigo deve entrar pela sessão que criou ou uma nova sala deve ser aberta. Para verificar a privacidade, a resposta de `GET /api/rooms/CODIGO` contém a sua mão e as jogadas públicas, mas não inclui a mão do oponente nem o baralho restante. A tabela também nega leitura aos clientes públicos.

## Observações

- O login anônimo usa armazenamento local e exige que **Anonymous Sign-Ins** esteja habilitado no Supabase. O Supabase mantém a identidade apenas naquele navegador; a documentação explica esse comportamento [aqui](https://supabase.com/docs/guides/auth/auth-anonymous).
- O SQL protege `rooms` com RLS e concede acesso à chave de serviço usada exclusivamente pelas rotas privadas do Next.js.
- Este pacote não precisa do Supabase Realtime, CLI do Supabase, Docker ou serviços externos além da hospedagem Next.js e do Supabase.
- Salas não expiram automaticamente. Apague salas antigas manualmente no Table Editor se precisar limpar seu projeto.
