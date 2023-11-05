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

      // Function to check if the string is valid UTF-8
      function isUTF8(str) {
        try {
          new TextDecoder('utf-8').decode(new TextEncoder().encode(str))
          return true
        } catch (error) {
          return false
        }
      }

      // Check if the entire page's text content is in valid UTF-8 encoding
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
            // Trigger the 'ajouterVoiture' function by clicking on the 'Ajouter' button
            cy.get('#nouvelleVoiture').click();
            cy.get('#nouvelle').should('be.visible')
        });
      // Check form inputs
      cy.get('#marque').should('exist')
      cy.get('#modele').should('exist')
      // ... add similar checks for other form inputs

      // Check buttons
      cy.get('#nouvelleVoiture').should('exist').and('contain', 'Ajouter')


      // Check sidebar content
      //cy.get('#logo').should('be.visible')
      //cy.contains('#nav', 'Accueil').should('be.visible')
      //cy.contains('#nav', 'Ajouter une voiture').should('be.visible')

      // Check the search form
      //cy.get('#saisieRecherche').should('exist')
      //cy.get('.rechercher').should('exist').and('contain', 'Go')

      // Check if the snackbar elements exist
      //cy.get('.snackbar').should('have.length', 4)
    })
  })

  it('Simulates user actions', () => {
    // Perform actions, for example, click on a link to simulate navigation
    cy.contains('#nav', 'Accueil').click()

    // Validate the change or resulting content after the action
    // Example: Check if the content after navigating to Accueil is visible
    cy.get('#content').should('be.visible')
  })

  // Add more test cases for different interactions, validations, and edge cases as needed
})
describe('Car Management Application - Responsive Testing', () => {
  const viewports = ['iphone-6', 'ipad-2', 'macbook-13', 'macbook-15'] // Updated with a larger screen

  viewports.forEach((viewport) => {
    it(`Adapts well to ${viewport}`, () => {
      cy.viewport(viewport)
      cy.visit('http://localhost:8080/esieaFront/') // Replace with the path to your HTML file

      // Perform assertions based on the responsiveness
      // Check elements and layout as per the specific viewport
      switch (viewport) {
        case 'iphone-6':
          cy.get('#logo').should('exist')
          cy.contains('#nav', 'Accueil').should('exist')
          // Add specific assertions for iPhone 6
          break
        case 'ipad-2':
          cy.get('#content').should('exist')
          // Add specific assertions for iPad 2
          break
        case 'macbook-13':
          cy.get('.pagination').should('exist')
          // Add specific assertions for 13" MacBook
          break
        case 'macbook-15':
          cy.get('#conteneurSection').should('exist')
          // Add specific assertions for 15" MacBook
          break

        default:
          // Default assertions
          break
      }
    })
  })
})
