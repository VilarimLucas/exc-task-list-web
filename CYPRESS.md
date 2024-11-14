# ![Cypress](https://img.shields.io/badge/-Cypress-17202C?style=for-the-badge&labelColor=black&logo=cypress&logoColor=white) DOCUMENTAÇÃO


Este documento fornece instruções para configurar, executar e entender os testes automatizados do projeto usando Cypress.

## Pré-requisitos

- Node.js (versão 12 ou superior)
- Cypress (instalado via `npm` ou `yarn`)

## Instalação

Se você ainda não tem o Cypress instalado, execute o seguinte comando para instalar todas as dependências, incluindo o Cypress:

```bash
npm install
```

## Estrutura dos Testes

Os testes do Cypress estão localizados na pasta `cypress/e2e`. Cada arquivo nesta pasta corresponde a uma suíte de testes para uma funcionalidade específica do aplicativo.

### Principais Arquivos e Pastas

- **`cypress/e2e/`**: Contém todos os arquivos de teste end-to-end.
- **`cypress/fixtures/`**: Contém arquivos JSON com dados de teste estáticos (opcional).
- **`cypress/support/`**: Inclui configurações e comandos personalizados para o Cypress.

## Executando os Testes

Existem duas maneiras de executar os testes do Cypress:

### 1. Executar em Modo Interativo

Para abrir o Cypress no modo interativo (útil para desenvolvimento e depuração de testes), use:

```bash
npx cypress open
```

1. Após abrir o Cypress, selecione o navegador desejado.
2. Clique no teste que deseja executar ou execute todos os testes de uma vez.

## Executando os Testes em Modo Headless (Linha de Comando)

Para executar todos os testes em modo headless (sem interface gráfica), use o comando:

```bash
npx cypress run
```
Isso executará todos os testes e exibirá os resultados diretamente no terminal.

## Criando um Novo Teste

Para adicionar um novo teste:

1. Crie um arquivo `.spec.js` dentro da pasta `cypress/e2e/`.
2. Escreva os testes usando a sintaxe do Cypress.

Exemplo de um teste básico para verificar o carregamento da página:

```javascript
describe('Exemplo de Teste Básico', () => {
  it('Deve carregar a página inicial com sucesso', () => {
    cy.visit('http://localhost:3000');
    cy.contains('LISTA DE TAREFAS').should('be.visible');
  });
});
```

## Exemplos de Testes

Aqui estão alguns exemplos de testes implementados:

### Adicionar uma Tarefa

```javascript
it('Deve adicionar uma nova tarefa', () => {
  cy.get('input[placeholder="Descreva a Tarefa (Máx. 24 Caracteres)"]').type('Estudar Cypress');
  cy.get('button[name="add-task-button"]').click();
  cy.contains('Estudar Cypress').should('be.visible');
});
```

### Marcar Tarefa como Concluída

```javascript
it('Deve marcar uma tarefa como concluída', () => {
  cy.get('input[placeholder="Descreva a Tarefa (Máx. 24 Caracteres)"]').type('Concluir projeto');
  cy.get('button[name="add-task-button"]').click();
  cy.contains('Concluir projeto').siblings('input[name="check-completed-button"]').check();
  cy.contains('Concluir projeto').should('have.class', 'task-completed');
});
```
### Excluir uma Tarefa

```javascript
it('Deve excluir uma tarefa da lista', () => {
  cy.contains('Tarefa para deletar').parent().find('button[name="delete-task-button"]').click();
  cy.contains('Tarefa para deletar').should('not.exist');
});
```

## Personalizando o Cypress

Você pode personalizar as configurações do Cypress no arquivo `cypress.config.js`. Nesse arquivo, você pode alterar opções como o tempo limite de comandos, viewport, entre outras configurações.

Exemplo de configurações personalizadas:

```javascript
// cypress.config.js
module.exports = {
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 8000, // Define o tempo limite padrão para comandos
    retries: {
      runMode: 2,      // Número de tentativas em modo headless
      openMode: 0      // Número de tentativas em modo interativo
    },
    setupNodeEvents(on, config) {
      // configure event listeners here
    },
  },
};
```

### Explicação das Opções

- **baseUrl**: Define a URL base usada em `cy.visit()`, simplificando o acesso a diferentes páginas do aplicativo.
- **viewportWidth** e **viewportHeight**: Configuram a largura e altura da janela de visualização, útil para testes responsivos.
- **defaultCommandTimeout**: Define o tempo máximo (em milissegundos) que o Cypress espera por um comando antes de falhar.
- **retries**: Configura o número de tentativas em caso de falha de um teste, tanto no modo headless quanto no modo interativo.

## Documentação Adicional

Para mais informações sobre o uso e configuração do Cypress, consulte a [documentação oficial do Cypress](https://docs.cypress.io/).

---

Este guia fornece informações essenciais para que qualquer desenvolvedor possa configurar, entender e executar testes do Cypress no projeto. Caso precise de mais instruções, consulte o `README.md` principal ou entre em contato com o mantenedor do projeto.