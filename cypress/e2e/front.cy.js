var timestamp
const config = {
  urlBack: "http://localhost:8080/esieaBack/rest",
  ligneParPage: 5,
};
describe('Affichage de la page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080/esieaFront/');
      cy.viewport(1024, 768)
    });

    it('Element titre et sous titre doivent s\'afficher correctement', () => {
      
      // Vérifier la présence du titre et sous-titre
      cy.get('h2').should('contain', 'Liste des voitures en stock');
      cy.get('p').should('contain', 'Cette page recence les voitues disponibles dans la base');
    
    });
    it('Le bouton "Ajouter voiture" doit être clickable et afficher le formulaire de nouvelle voiture', () => {
      // Clique sur le lien du formulaire
      cy.contains('Ajouter une voiture').click();
  
      // Vérifie que la liste
      cy.get('form').should('be.visible');
      
    });

    it('Lancement recherche', () => {
      // Faire une recherche
      cy.get('#saisieRecherche').type('Nom de la voiture');
  
      // Cliquez sur le bouton de recherche
      cy.get('.rechercher').click();
  
      
    });

    it('Le bouton page précédente doit etre clickable', () => {
      
      cy.get('.pagination .button.previous').click();
  
      
    });

    it('Le bouton page suivante doit etre clickable', () => {
      
      cy.get('.pagination .button.next').click();
  
      
    });

    it('Le logo doit être présent', () => {
      cy.get('#logo').should('exist');
  
      cy.get('#logo img').should('have.attr', 'src', 'logo.jpg');
  
    });


    it('Le menu acceuil doit être clickable et envoyer vers la page acceuil', () => {
      cy.contains('Accueil').click();
  
      cy.url().should('include', '/#');
  
    });
});

