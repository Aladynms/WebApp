describe('Testy E2E: Zarządzanie projektami', () => {
  const admin = { login: 'admin', password: 'admin123' };
  const project = { name: 'Testowy projekt', description: 'Opis testowego projektu' };
  const story = { name: 'Testowa historyjka', description: 'Opis historyjki' };
  const task = { name: 'Testowe zadanie', description: 'Opis zadania', priority: "Wysoki", hours: '4', dev: "Michał Kowalski (developer)" };

  beforeEach(() => {
    cy.visit('/login');
    cy.get('input[placeholder="Login"]').type(admin.login);
    cy.get('input[placeholder="Hasło"]').type(admin.password);
    cy.contains('Zaloguj się').click();
    cy.url().should('not.include', '../');
  });

  it('Dodaje nowy projekt', () => {
    cy.contains('📁 Zarządzanie projektami');
    cy.get('input[placeholder="Nazwa projektu"]').type(project.name);
    cy.get('textarea[placeholder="Opis projektu"]').type(project.description);
    cy.contains('Dodaj projekt').click();
    cy.contains(project.name);
  });

  it('Dodaje nową historyjkę', () => {
    cy.contains('li', project.name)
      .should('exist')
      .within(() => {
        cy.contains('Wejdź').click();
      });
    cy.contains('🧩 Zarządzanie historyjkami');
    cy.get('input[placeholder="Nazwa"]').type(story.name);
    cy.get('textarea[placeholder="Opis"]').type(story.description);
    cy.contains('Dodaj').click();
    cy.contains(story.name);
  });
  
  it('Dodaje nowe zadanie do usunięcia', () => {
    cy.contains(story.name).parent().contains('Wejdź').click();
    cy.get('input[placeholder="Nazwa"]').type(task.name);
    cy.get('textarea[placeholder="Opis"]').type(task.description);
    cy.contains('form', '➕ Dodaj zadanie').within(() => {
      cy.get('select').select(task.priority);
    });
    cy.get('input[type="number"]').type(task.hours);
    cy.contains('button', 'Dodaj zadanie').click();
    cy.contains(task.name);
  });

  it('Usuwa zadanie', () => {
    cy.contains(story.name).parent().contains('Wejdź').click();
    cy.contains('.p-4', task.name).as('taskCard');
    cy.get('@taskCard').within(() => {
      cy.contains('button', 'Usuń').click();
    }); 
    cy.on('window:confirm', () => true);
    cy.contains('.p-4', task.name).should('not.exist');
  });

  it('Dodaje nowe zadanie', () => {
    cy.contains(story.name).parent().contains('Wejdź').click();
    cy.get('input[placeholder="Nazwa"]').type(task.name);
    cy.get('textarea[placeholder="Opis"]').type(task.description);
    cy.contains('form', '➕ Dodaj zadanie').within(() => {
      cy.get('select').select(task.priority);
    });
    cy.get('input[type="number"]').type(task.hours);
    cy.contains('button', 'Dodaj zadanie').click();
    cy.contains(task.name);
  });

  it('Zmienia status zadania z todo → doing → done', () => {
    cy.contains(story.name).parent().contains('Wejdź').click();
    cy.contains('.p-4', task.name).within(() => {
      cy.contains('Status: todo').should('exist');
      cy.get('select').select(task.dev);
      cy.contains('button', 'Przypisz i rozpocznij').click();
    });
    cy.contains('.p-4', task.name).within(() => {
      cy.contains('Status: doing').should('exist');
      cy.contains('button', 'Zakończ').click();
    });
    cy.contains('.p-4', task.name).within(() => {
      cy.contains('Status: done').should('exist');
      cy.contains('Start:').should('exist');
      cy.contains('Koniec:').should('exist');
    });
  });

  it('Usuwa historyjkę', () => {
    cy.contains(story.name)
    .parents('li')
    .within(() => {
      cy.contains('Usuń').click();
    });
    cy.on('window:confirm', () => true);
    cy.contains(story.name).should('not.exist');
  });

  it('Usuwa projekt', () => {
    cy.contains('Projekty').click();
    cy.contains('li', project.name)
      .should('exist')
      .within(() => {
        cy.contains('Usuń').click();
      });
    cy.on('window:confirm', () => true);
    cy.contains(project.name).should('not.exist');
  });
});
