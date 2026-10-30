# Truco Paulista

Jogo online de Truco Paulista para duas pessoas, feito com Next.js, TypeScript, Supabase Auth anônimo e PostgreSQL. A API do Next.js guarda o estado oficial; o navegador recebe apenas as próprias cartas e informações públicas da mesa.

## Começar

1. Siga [CONFIGURACAO.md](CONFIGURACAO.md) para criar o projeto Supabase, executar `supabase/setup.sql` e configurar as três variáveis.
2. Execute `npm install` e `npm run dev`.
3. Abra `http://localhost:3000`, crie a sala e compartilhe o convite.

Com as variáveis ausentes, a página mostra o aviso de configuração. Consulte [CONFIGURACAO.md](CONFIGURACAO.md) para publicação e teste com outra pessoa.

## Comandos

- `npm run dev` — desenvolvimento local.
- `npm run lint` — análise estática.
- `npm test` — testes automatizados do motor de regras.
- `npm run build` — build de produção.

## Variações cobertas

Manilhas seguem a vira e o desempate de naipes paus, copas, espadas e ouros. A mão vale 1; Truco, Seis, Nove e Doze elevam a aposta. Com onze pontos, o jogador decide entre jogar por três ou correr; 11 a 11 joga-se mão de ferro por um ponto, às cegas. Regionalmente há diferenças de regra para cartas cobertas, empate e decisão com onze; esta implementação segue as opções descritas no prompt do projeto.
