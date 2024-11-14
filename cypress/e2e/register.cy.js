describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
  })
})

describe('Aplicação de Lista de Tarefas', () => {

  it('Deve adicionar uma nova tarefa', () => {
    cy.visit('http://localhost:3000');
    cy.get('input[placeholder="Descreva a Tarefa (Máx. 24 Caracteres)"]').type('Estudar Cypress');
    cy.get('button[name="add-task-button"]').click();
    cy.contains('Estudar Cypress').should('be.visible');

    // Clica no botão excluir da tarefa
    // cy.get('button[name="delete-task-button"]').first().click();
  });

  it('Deve listar todas as tarefas corretamente', () => {
    cy.visit('http://localhost:3000');
    cy.get('h6').contains('LISTA DE TAREFAS').should('be.visible');
  });

  it('Deve marcar uma tarefa como concluída', () => {
    // Acessa a aplicação
    cy.visit('http://localhost:3000');

    // Adiciona uma nova tarefa para garantir que temos uma para marcar como concluída
    cy.get('input[placeholder="Descreva a Tarefa (Máx. 24 Caracteres)"]').type('Estudar Cypress');
    cy.get('button[name="add-task-button"]').click();

    // Verifica se a tarefa foi adicionada com sucesso
    cy.contains('Estudar Cypress').should('be.visible');

    // Marca a tarefa como concluída
    cy.get('input[name="check-completed-button"]').first().check();

    // Verifica se a tarefa está marcada como concluída (texto tachado)
    cy.contains('Estudar Cypress')
      .should('have.css', 'text-decoration');
    // .and('include', 'line-through');

    // Clica no botão excluir da tarefa
    // cy.get('button[name="delete-task-button"]').first().click();
  });


  it('Deve aplicar estilo para tarefas pendentes', () => {
    cy.visit('http://localhost:3000');
    cy.get('input[placeholder="Descreva a Tarefa (Máx. 24 Caracteres)"]').type('Tarefa Pendente');
    cy.get('button[name="add-task-button"]').click();
    cy.contains('Tarefa Pendente').should('have.class', 'task-pending');

    // Clica no botão excluir da tarefa
    // cy.get('button[name="delete-task-button"]').first().click();
  });




  it('Deve editar uma tarefa existente', () => {
    // Visita a aplicação
    cy.visit('http://localhost:3000');

    // Adiciona uma nova tarefa para garantir que há algo para editar
    cy.get('input[placeholder="Descreva a Tarefa (Máx. 24 Caracteres)"]').type('Estudar Cypress');
    cy.get('button[name="add-task-button"]').click();

    // Verifica se a tarefa foi adicionada
    cy.contains('Estudar Cypress').should('be.visible');

    // Clica no botão de editar da tarefa
    cy.get('button[name="edit-task-button"]').first().click();

    // Verifica que o campo de edição apareceu
    cy.get('input[name="input-edit-task"]').should('be.visible').clear().type('Estudar Cypress Avançado');

    // Confirma a edição clicando em "Atualizar"
    cy.get('button[name="edit-task-button"]').contains('Atualizar').click();

    // Verifica se o texto foi atualizado
    cy.contains('Estudar Cypress Avançado').should('be.visible');

    // Clica no botão excluir da tarefa
    // cy.get('button[name="delete-task-button"]').first().click();
  });


  it('Deve adicionar e depois excluir uma tarefa da lista', () => {
    cy.visit('http://localhost:3000');

    // Adiciona uma nova tarefa
    cy.get('input[placeholder="Descreva a Tarefa (Máx. 24 Caracteres)"]').type('Tarefa para deletar');
    cy.get('button[name="add-task-button"]').click();

    // Verifica se a tarefa foi adicionada
    cy.contains('Estudar Cypress').should('be.visible');

    // Verifica se a tarefa foi adicionada
    cy.contains('Tarefa para deletar').should('be.visible');

    // Clica no botão excluir da tarefa
    cy.get('button[name="delete-task-button"]').first().click();

    // Verifica se a tarefa foi removida da lista
    cy.contains('Tarefa para deletar').should('not.exist');
  });

  it('Deve filtrar tarefas pendentes', () => {
    cy.visit('http://localhost:3000');
    cy.get('input[placeholder="Descreva a Tarefa (Máx. 24 Caracteres)"]').type('Tarefa Pendente');
    cy.get('button[name="add-task-button"]').click();
    cy.contains('PENDENTES').click();
    cy.contains('Tarefa Pendente').should('be.visible');
  });

  it('Deve filtrar tarefas concluídas', () => {
    cy.visit('http://localhost:3000');
    
    // Adiciona uma nova tarefa
    cy.get('input[placeholder="Descreva a Tarefa (Máx. 24 Caracteres)"]').type('Tarefa Concluída');
    cy.get('button[name="add-task-button"]').click();
  
    // Marca a tarefa como concluída
    cy.get('input[name="check-completed-button"]').first().check();

  
    // Clica no filtro de concluídas
    cy.contains('CONCLUÍDOS').click();
  
    // Verifica se a tarefa concluída está visível
    cy.contains('Tarefa Concluída').should('be.visible');
    
    // Verifica se as tarefas pendentes não estão visíveis na lista de concluídas
    cy.contains('Tarefa Pendente').should('not.exist');
  });
  

});
