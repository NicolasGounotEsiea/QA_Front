// cypress/integration/integration.spec.js

var timestamp
const config = {
  urlBack: "http://localhost:8080/esieaBack/rest",
  ligneParPage: 5,
};

describe('Tests d\'intégration', () => {
  beforeEach(() => {
    cy.visit('https://cours-qualite.groupe-esiea.fr/esieaFront/');
    cy.viewport(1024, 768)
  });

  it('Fonction accueil', () => {
    // Utiliser la fonction accueil
    cy.window().invoke('accueil');

    // Vérifier que les éléments attendus sont présents ou cachés
    cy.get('#saisieRecherche').should('have.value', '');
    cy.get('#nouvelle').should('be.hidden');
    cy.get('#listeVoitureTable').should('exist');
  });

  it('Fonction afficherTableauListeVoitures', () => {
    // Intercepter la requête
    cy.intercept('GET', config.urlBack + '/voiture/get/all/0/5').as('getVoitures');
  
    // Utiliser la fonction afficherTableauListeVoitures
    cy.window().then((win) => {
      win.afficherTableauListeVoitures(1);
    });
  
    // Attendre que la requête interceptée se produise
    cy.wait('@getVoitures', { timeout: 5000 }).should('have.property', 'response');
  
    // Vérifier que les éléments attendus sont présents
    cy.get('#listeVoitureTable').should('exist');
    cy.get('#nouvelle').should('be.hidden');
  });

  it('Affiche correctement le tableau avec les données reçues de l\'API', () => {
    cy.intercept('GET', config.urlBack + '/voiture/get/all/0/5', { fixture: 'voitures.json' }).as('getVoitures');
    
    cy.visit('http://localhost:8080/esieaFront/');
    cy.wait('@getVoitures').then(() => {
      // Vérification que le tableau est affiché avec les bonnes données après le premier chargement
      cy.get('#listeVoitureTable').should('exist');
      
      // Ajouter une pause pour déboguer après le premier chargement
      
  
      // Visite de nouveau la même URL
      cy.visit('http://localhost:8080/esieaFront/');
      cy.wait('@getVoitures').then(() => {
        // Vérification que le tableau est affiché avec les bonnes données après le deuxième chargement
        cy.get('#listeVoitureTable').should('exist');
  
        // Ajouter une autre pause pour déboguer après le deuxième chargement
        
      });
    });
  });

  it('Effectue une recherche de voitures', () => {
    cy.visit('http://localhost:8080/esieaFront/');
    
    // Scroll vers le champ de saisie de recherche
    cy.get('#saisieRecherche').scrollIntoView().type('to');
    cy.get('.rechercher.button').click();

  
    // Assure-toi que des résultats sont affichés dans le tableau des voitures
    cy.get('#listeVoitureTable tbody tr').should('have.length.greaterThan', 0);
  });

  it('Ajout d\'une voiture via l\'interface', () => {
    // Se rendre sur la page d'accueil
    cy.visit('http://localhost:8080/esieaFront/');
    
    cy.window().then((win) => {
      win.afficherFormulaireCreation();
    });
    cy.wait(1000);
    // Afficher le formulaire d'ajout d'une voiture
    cy.get('#nouvelle').invoke('show');
    timestamp = Date.now();
    // Remplir le formulaire d'ajout d'une voiture
   
    cy.get('#marque').type(timestamp);
    cy.get('#modele').type(timestamp);
    cy.get('#finition').type('Sport');
    cy.get('#carburant').select('Essence');
    cy.get('#km').type('50000');
    cy.get('#annee').type('2020');
    cy.get('#prix').type('15000');

    // Envoyer le formulaire
    cy.get('#nouvelleVoiture').click();

    // Vérifier le message de confirmation
    cy.get('#snackbar_ajout').should('exist');

    

    // Vérifier que la voiture ajoutée apparaît dans la liste
    

    cy.get('#saisieRecherche').scrollIntoView().type(timestamp);

    cy.get('.rechercher.button').click();


    cy.get('#listeVoitureTable tbody tr').should('have.length.greaterThan', 0);
    

    
    cy.contains('#listeVoitureTable tbody tr td', timestamp).should('exist');
   
    
  });


  it('Supprime une voiture de la liste', () => {
    cy.visit('http://localhost:8080/esieaFront/');

    cy.get('#saisieRecherche').scrollIntoView().type(timestamp);

    cy.get('.rechercher.button').click();
    // Trouver une voiture existante et supprimer
    cy.contains('#listeVoitureTable tbody tr', timestamp)
      .find('td')
      .contains('a', 'Détails')
      .click();

    cy.get('#divSupprimer button').click();
      

    // Vérifier le message de confirmation
    cy.get('#snackbar_suppression').should('contain', 'La voiture a été supprimée');

    // Vérifier que la voiture n'est plus dans la liste
    cy.contains('.voiture-item', timestamp).should('not.exist');
  });
});
  
  
  




  



