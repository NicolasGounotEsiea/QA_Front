describe('Car Inventory App Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/esieaFront/'); // Replace 'http://your-app-url' with your application's URL
  });

  it('Should display the list of cars on the homepage', () => {
    cy.intercept('GET', 'http://localhost:8080/esieaBack/rest/voiture/get/all*').as('getCarList');

    cy.wait('@getCarList').then(({ response }) => {
      expect(response.statusCode).to.eq(200);
      expect(response.body).to.have.property('voitures').and.to.be.an('array');
      // Add assertions based on the response received
      // Example: assert the presence of certain elements on the page
      cy.get('#listeVoitureTable').should('be.visible');
    });
  });

  it('Should add a new car to the inventory', () => {
    const newCar = {
      marque: 'Toyota',
      modele: 'Camry',
      finition: 'LE',
      carburant: 'Gasoline',
      km: '10000',
      annee: '2022',
      prix: '25000'
    };

    cy.intercept('POST', 'http://localhost:8080/esieaBack/rest/voiture/add').as('addCar');

    cy.get('#marque').type(newCar.marque);
    cy.get('#modele').type(newCar.modele);
    // Fill in other input fields

    cy.get('#submit-button').click(); // Replace with your submit button selector

    cy.wait('@addCar').then(({ response }) => {
      expect(response.statusCode).to.eq(200);
      expect(response.body).to.have.property('succes').and.to.be.true;
      // Add assertions based on the response received or the behavior after adding a car
      // Example: assert the presence of the newly added car in the list
    });
  });