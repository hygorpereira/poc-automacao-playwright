# POC de Automação E2E com Playwright + TypeScript

**Autor:** Hygor Pereira  
**Data:** 18 de Setembro de 2026

Este projeto contém uma prova de conceito de automação end-to-end para a loja pública [Sauce Demo](https://sauce-demo.myshopify.com/). A suíte foi construída com **Playwright Test 1.62.1** e **TypeScript** e pode ser executada em **Chromium**, **Firefox** e **WebKit**.

O objetivo deste documento é permitir que qualquer pessoa configure o ambiente, execute os testes e consulte o relatório sem precisar conhecer previamente a estrutura do projeto.

## 1. O que é necessário

Antes de começar, confirme que o computador possui:

- Node.js versão 20 ou superior;
- npm versão 10 ou superior;
- conexão com a internet para acessar o site e baixar os navegadores do Playwright;
- terminal com permissão para instalar dependências no diretório do projeto.

Para verificar Node.js e npm:

```bash
node --version
npm --version
```

No Windows, recomenda-se usar PowerShell ou Windows Terminal. No macOS e Linux, pode ser usado o terminal padrão.

## 2. Obter o projeto

Clone o repositório Git e entre na pasta correspondente:

```bash
git clone https://github.com/hygorpereira/poc-automacao-playwright.git
cd poc-automacao-playwright
```

Caso possua o repositório em .zip (poc-automacao-playwright.zip), basta descompactá-lo e acessar sua pasta correspondente:

```bash
unzip poc-automacao-playwright.zip
cd poc-automacao-playwright
```

Ao final deste passo, o diretório atual deve conter `package.json`, `playwright.config.ts` e a pasta `tests`.

## 3. Instalar as dependências do Node.js

Execute:

```bash
npm install
```

Esse comando lê o `package.json`, instala o Playwright Test na versão 1.62.1, definida pelo projeto, e cria ou atualiza o arquivo `package-lock.json`.

As dependências ficam na pasta `node_modules`.

## 4. Instalar os navegadores

A POC usa três projetos Playwright: Chromium, Firefox e WebKit. Instale os três navegadores:

```bash
npx playwright install chromium firefox webkit
```

Em ambientes Linux nos quais as dependências do sistema ainda não estejam instaladas, use:

```bash
npx playwright install --with-deps chromium firefox webkit
```

A instalação é necessária apenas na primeira configuração do computador ou quando a versão do Playwright for atualizada.

## 5. Executar a suíte completa

Para executar os cinco cenários em Chromium, Firefox e WebKit:

```bash
npm test
```

Cada cenário será executado uma vez por navegador. Portanto, nossa suíte com cinco testes apresentará quinze resultados quando executada com o comando completo.

Os cenários são:

1. validação da estrutura principal da loja;
2. validação do catálogo, nomes e preços;
3. pesquisa de produtos por palavra-chave;
4. validação do detalhe de produto e da ação de compra;
5. acesso ao carrinho e validação do estado inicial.

## 6. Executar apenas um navegador

Para executar somente em Chromium:

```bash
npm run test:chromium
```

Para executar somente em Firefox:

```bash
npm run test:firefox
```
Para executar somente em WebKit:

```bash
npm run test:webkit
```

Esses comandos são úteis para diagnosticar uma diferença específica de navegador.

## 7. Executar com o navegador visível

Por padrão, o Playwright executa em modo headless. Para acompanhar o navegador na tela:

```bash
npm run test:headed
```

Esse comando executa os projetos configurados com a janela do navegador aberta.

Para depurar um teste passo a passo:

```bash
npm run test:debug
```

Para usar a interface interativa do Playwright:

```bash
npm run test:ui
```

## 8. Consultar o relatório HTML

Depois de executar os testes, abra o relatório com:

```bash
npm run report
```

O Playwright abrirá o relatório HTML no navegador. Nele é possível consultar:

- quantidade de testes aprovados e falhos;
- resultado separado por navegador;
- duração de cada teste;
- mensagens de erro;
- screenshots e vídeos gerados para falhas;
- trace da primeira nova tentativa, quando aplicável.

O relatório é salvo na pasta `playwright-report`.

As evidências de execução ficam em `test-results`. Essas pastas são geradas automaticamente e não precisam ser criadas manualmente.

## 9. Comandos disponíveis

| Comando | Finalidade |
| --- | --- |
| `npm install` | Instala as dependências do projeto |
| `npx playwright install chromium firefox webkit` | Instala os três navegadores |
| `npm test` | Executa a suíte em Chromium, Firefox e WebKit |
| `npm run test:chromium` | Executa somente em Chromium |
| `npm run test:firefox` | Executa somente em Firefox |
| `npm run test:webkit` | Executa somente em WebKit |
| `npm run test:headed` | Executa com navegador visível |
| `npm run test:debug` | Abre o modo de depuração |
| `npm run test:ui` | Abre a interface interativa |
| `npm run report` | Abre o relatório HTML com os detalhes da execução |

## 10. Estrutura do projeto

```text
poc-automacao-playwright/
├── e2e/
|   ├── dados/
|   │   └── loja.dados.ts
|   ├── helpers/
|   │   └── loja.helper.ts
|   ├── pages/
|   │   └── home-loja.page.ts
|   └── loja.spec.ts
├── package.json
├── package-lock.json
└── playwright.config.ts
```

e2e/loja.spec.ts `contém os cinco cenários de teste automatizados`.

e2e/dados/loja.dados.ts `contém dados de apoio à execução dos testes, como massas de dados`.

e2e/helpers/loja.helper.ts `concentram funções auxiliares e manipulações de dados que podem ser repetitivas`.

e2e/pages/home-loja.page.ts `concentra a navegação reutilizável da página inicial da loja`.

playwright.config.ts  `define a URL base da aplicação testada neste POC, o formato do relatório de evidências e a execução via Chromium, Firefox e WebKit`.

## 11. Executar em CI

Uma pipeline CI precisa realizar, nesta ordem:

```bash
npm ci
npx playwright install --with-deps chromium firefox webkit
npm test
```
'npm ci' usa exatamente as versões registradas no 'package-lock.json'. O parâmetro '--with-deps' instala também dependências de sistema necessárias em runners Linux limpos.

O relatório HTML pode ser publicado como artefato da pipeline. As pastas 'playwright-report' e 'test-results' devem ser preservadas quando houver falha para permitir investigação.


## 12. Orientações em caso de falhas na execução

### Node.js ou npm não encontrados

Instale o Node.js 20 ou superior e abra um novo terminal. Depois confirme com `node --version` e `npm --version`.

### Navegador não encontrado

Execute novamente:

```bash
npx playwright install chromium firefox webkit
```

Em Linux:

```bash
npx playwright install --with-deps chromium firefox webkit
```

### Site indisponível ou lento

Abra manualmente `https://sauce-demo.myshopify.com` no navegador. Se o site estiver indisponível, os testes não poderão ser concluídos porque dependem da página pública.

### Falha em apenas um navegador

Execute o navegador isoladamente, por exemplo `npm run test:webkit`, e abra o relatório com `npm run report`.

Execute o navegador isoladamente, por exemplo `npm run test:firefox`, e abra o relatório com `npm run report`. Verifique o screenshot, o vídeo e o trace disponíveis em caso de falha.

### Locators não encontrados

O site é público e pode alterar seu HTML sem aviso. Atualize os locators em tests/pages/store.page.ts ou no cenário correspondente e execute novamente npm run lint e npm test.

## 13. Observação

A aplicação-alvo [Sauce Demo](https://sauce-demo.myshopify.com/) é pública e pode alterar seu markup ou sua disponibilidade.

Data da última alteração da POC: `18/09/2026`