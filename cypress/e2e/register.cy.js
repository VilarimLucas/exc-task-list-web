describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
  })
})

describe('Aplicação de Lista de Tarefas', () => {

  it('Deve adicionar uma nova tarefa', () => {
    cy.visit('http://localhost:3000');
    cy.get('input[placeholder="Descreva a Tarefa"]').type('Estudar Cypress');
    cy.get('button[name="add-task-button"]').click();
    cy.contains('Estudar Cypress').should('be.visible');
  });

  it('Deve listar todas as tarefas corretamente', () => {
    cy.visit('http://localhost:3000');
    cy.get('h6').contains('LISTA DE TAREFAS').should('be.visible');
  });

  // it('Deve marcar uma tarefa como concluída', () => {
  //   cy.visit('http://localhost:3000');
  //   cy.get('input[placeholder="Descreva a Tarefa"]').type('Tarefa Concluída');
  //   cy.get('button[name="add-task-button"]').click(); // Seleciona o botão pelo atributo "name"
  //   cy.contains('Tarefa Concluída').should('be.visible');
  //   cy.contains('Tarefa Concluída').parent().find('input[name="check-completed-button"]').check();
  //   cy.contains('Tarefa Concluída').should('have.class', 'task-completed');
  //   cy.contains('Tarefa Concluída').should('have.css', 'text-decoration', 'line-through');

  // });

  it('Deve aplicar estilo para tarefas pendentes', () => {
    cy.visit('http://localhost:3000');
    cy.get('input[placeholder="Descreva a Tarefa"]').type('Tarefa Pendente');
    cy.get('button[name="add-task-button"]').click();
    cy.contains('Tarefa Pendente').should('have.class', 'task-pending');
  });

  // it('Deve editar uma tarefa', () => {
  //   cy.visit('http://localhost:3000');
  //   cy.get('input[placeholder="Descreva a Tarefa"]').type('Tarefa para Editar');
  //   cy.get('button[name="add-task-button"]').click();
  //   cy.contains('Tarefa para Editar').parent().find('button[name="edit-task-button"]').click();
  //   cy.get('input').clear().type('Tarefa Editada');
  //   cy.get('input').blur(); // Salva a edição ao perder o foco
  //   cy.contains('Tarefa Editada').should('be.visible');    
  // });

  // it('Deve deletar uma tarefa', () => {
  //   cy.visit('http://localhost:3000');
  //   cy.get('input[placeholder="Descreva a Tarefa"]').type('Tarefa para Excluir');
  //   cy.get('button[name="add-task-button"]').click();
  //   cy.contains('Tarefa para Excluir').parent().find('button').contains('Times').click();
  //   cy.contains('Tarefa para Excluir').should('not.exist');
  // });

  it('Deve filtrar tarefas pendentes', () => {
    cy.visit('http://localhost:3000');
    cy.get('input[placeholder="Descreva a Tarefa"]').type('Tarefa Pendente');
    cy.get('button[name="add-task-button"]').click();
    cy.contains('PENDENTES').click();
    cy.contains('Tarefa Pendente').should('be.visible');
  });

  // it('Deve filtrar tarefas concluídas', () => {
  //   cy.visit('http://localhost:3000');
  //   cy.get('input[placeholder="Descreva a Tarefa"]').type('Tarefa Concluída');
  //   cy.get('button[name="add-task-button"]').click();
  //   cy.contains('Tarefa Concluída').parent().find('input[type="checkbox"]').check();
  //   cy.contains('CONCLUÍDOS').click();
  //   cy.contains('Tarefa Concluída').should('be.visible');
  // });

});
