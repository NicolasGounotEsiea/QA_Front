describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:8080/esieaFront/')
  })
})
describe('UTF-8 Encoding Test', () => {
  it('Verifies page content is UTF-8 encoded', () => {
    cy.visit('http://localhost:8080/esieaFront/') // Replace with the URL of the page you want to test

    cy.document().then((doc) => {
      const textContent = doc.body.innerText

      function isUTF8(str) {
        try {
          new TextDecoder('utf-8').decode(new TextEncoder().encode(str))
          return true
        } catch (error) {
          return false
        }
      }

      expect(isUTF8(textContent)).to.equal(true)
    })
  })
})
describe('Car Management Application E2E Tests', () => {
  beforeEach(() => {
    cy.viewport(1800, 800)
    cy.visit('http://localhost:8080/esieaFront/') // Replace with the path to your HTML file
  })

  it('Loads the application', () => {
    // Check if the title exists and contains the expected text
    cy.title().should('eq', 'Stock car')

    // Check if the header is present
    cy.contains('h2', 'Liste des voitures en stock').should('be.visible')

    // Check the initial content after page load
    cy.get('#conteneurSection').within(() => {
      // Check if different sections are present
      cy.get('#recherche').should('be.visible')
      it('Simulates user actions', () => {
          // Perform actions, for example, click on the 'Détails' link
          cy.contains(a[onclick="afficherVoiture(5)"]).click();

          // Validate the change or resulting content after the action
          // Example: Check if the content after clicking 'Détails' is visible
          cy.get('#fiche').should('be.visible');
          cy.get('#infos').should('be.visible');
          cy.get('#divSupprimer').should('be.visible');
        });
      it('Simulates user actions', () => {

            cy.get('#nouvelleVoiture').click();
            cy.get('#nouvelle').should('be.visible')
        });

      cy.get('#marque').should('exist')
      cy.get('#modele').should('exist')

      cy.get('#nouvelleVoiture').should('exist').and('contain', 'Ajouter')



    })
  })

  it('Simulates user actions', () => {

    cy.contains('#nav', 'Accueil').click()
    cy.get('#content').should('be.visible')
  })

   it('Displays car details after clicking on "Détails"', () => {
     // Click on the "Détails" link for a specific car (replace 5 with the actual car ID)
     cy.contains('a', 'Détails').click();

     // Validate that the car details section is visible
     cy.get('#fiche').should('be.visible');
     cy.get('#infos').should('be.visible');
     cy.get('#divSupprimer').should('be.visible');
   });
     it('Searches for a car and displays results', () => {

       cy.get('#saisieRecherche').type('Toyota');
       cy.get('.rechercher').click();
       cy.get('#listeVoiture').should('be.visible');

     });


     it('Navigates to "Ajouter une voiture" page', () => {

      cy.contains('#nav', 'Ajouter une voiture').click();
      cy.get('#nouvelle').invoke('removeAttr', 'style');
      cy.get('#nouvelleVoiture').click({ force: true });
  });
  it('Adds a new car', () => {

    cy.contains('#nav', 'Ajouter une voiture').click();
    cy.get('#nouvelle').invoke('removeAttr', 'style');

    cy.get('#marque').type('Toyota', { force: true });
    cy.get('#modele').type('Camry', { force: true });
    cy.get('#finition').type('LE', { force: true });
    cy.get('#carburant').select('E', { force: true });
    cy.get('#km').type('50000', { force: true });
    cy.get('#annee').type('2022', { force: true });
    cy.get('#prix').type('25000', { force: true });
    cy.get('#nouvelleVoiture').click({ force: true });
  });


})
describe('Car Management Application - Responsive Testing', () => {
  const viewports = ['iphone-6', 'ipad-2', 'macbook-13', 'macbook-15']

  viewports.forEach((viewport) => {
    it(`Adapts well to ${viewport}`, () => {
      cy.viewport(viewport)
      cy.visit('http://localhost:8080/esieaFront/')


      switch (viewport) {
        case 'iphone-6':
          cy.get('#logo').should('exist')
          cy.contains('#nav', 'Accueil').should('exist')
          cy.get('#logo').should('be.visible')

          break
        case 'ipad-2':
          cy.get('#content').should('exist')
          cy.get('#saisieRecherche').should('be.visible');
          cy.get('.rechercher').should('be.visible');

          break
        case 'macbook-13':
          cy.get('.pagination').should('exist')
          cy.get('.rechercher').should('be.visible');

          break
        case 'macbook-15':
          cy.get('#conteneurSection').should('exist')
          cy.get('#logo').should('be.visible')

          break

        default:
          // Default assertions
          break
      }
    })
  })
})


