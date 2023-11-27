// cypress/integration/integration.spec.js
const config = {
    urlBack: "http://localhost:8080/esieaBack/rest",
    ligneParPage: 5,
  };
  
  describe('Tests d\'intégration', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080/esieaFront/');
    });
  
    it('Fonction accueil', () => {
      // Utiliser la fonction accueil
      cy.window().invoke('accueil');
  
      // Vérifier que les éléments attendus sont présents ou cachés
      cy.get('#saisieRecherche').should('have.value', '');
      cy.get('#formulaireCreation').should('be.hidden');
      cy.get('#listeVoitureTable').should('exist');
    });
  
    it('Fonction afficherTableauListeVoitures', () => {
      // Simuler l'appel à fetch
      cy.intercept('GET', config.urlBack + '/voiture/get/all/*').as('getVoitures');
      
      // Utiliser la fonction afficherTableauListeVoitures
      cy.window().invoke('afficherTableauListeVoitures', 1);
  
      // Vérifier que l'appel à fetch a été effectué
      cy.wait('@getVoitures').should('have.property', 'response');
  
      // Vérifier que les éléments attendus sont présents
      cy.get('#listeVoitureTable').should('exist');
      cy.get('#formulaireCreation').should('be.hidden');
    });
  
    // it('Fonction effacerFormulaire', () => {
    //   // Remplir le formulaire avec des valeurs
    //   cy.get('#marque').type('TestMarque');
    //   cy.get('#modele').type('TestModele');
    //   // ... (remplir d'autres champs)
  
    //   // Utiliser la fonction effacerFormulaire
    //   cy.window().invoke('effacerFormulaire');
  
    //   // Vérifier que les champs du formulaire sont vides
    //   cy.get('#marque').should('have.value', '');
    //   cy.get('#modele').should('have.value', '');
    //   // ... (vérifier d'autres champs)
    // });
  });
  describe('Affichage du tableau de voitures', () => {
    it('Affiche correctement le tableau avec les données reçues de l\'API', () => {
      cy.intercept('GET', config.urlBack + '/voiture/get/all/0/5', { fixture: 'voitures.json' }).as('getVoitures');
  
      cy.visit('http://localhost:8080/esieaFront/');
      cy.wait('@getVoitures').then(() => {
        // Vérification que le tableau est affiché avec les bonnes données
        cy.get('#listeVoitureTable').should('exist');
        cy.get('#listeVoitureTable tbody tr').should('have.length', 5); // Assurez-vous d'ajuster cela selon le contenu du fichier JSON des voitures
        // ... Autres vérifications nécessaires selon la structure du tableau et des données
      });
    });
  });
  