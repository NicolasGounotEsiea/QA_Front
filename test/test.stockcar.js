const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');
const { JSDOM } = require('jsdom');

// Create a simulated DOM environment using jsdom
const { window } = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = window.document;


const stockcar = require('../src/main/webapp/stockcar');
const sampleVoiture = JSON.stringify({
    marque: 'Toyota',
    modele: 'Camry',
    finition: 'LE',
    carburant: { char: 'E' },
    km: 50000,
    annee: 2020,
    prix: 25000,
    id: 1,
});


describe ("Stockcar", function(){
    describe('accueil', function () {

    });
    describe("afficherTableauListeVoitures", function(){
        let fetchStub;

        before(() => {
            fetchStub = sinon.stub(global, 'fetch');
        });

        after(() => {
            fetchStub.restore();
        });

        it('should fetch and display the table of cars', async () => {
            // Mock response data
            const responseData = {
                voitures: [sampleVoiture],
                volume: 1
            };

            fetchStub.returns(Promise.resolve({
                ok: true,
                json: () => Promise.resolve(responseData)
            }));

            document.body.innerHTML = '<div id="listeVoiture"></div>';

            await stockcar.afficherTableauListeVoitures(1);

            const tableElement = document.getElementById('listeVoiture');


            assert.exists(tableElement);


        it('should handle errors when fetching car data', async () => {
            fetchStub.returns(Promise.resolve({
                ok: false
            }));

            // Clear any existing table element
            document.body.innerHTML = '<div id="listeVoiture"></div>';

            await stockcar.afficherTableauListeVoitures(1);

            // Assert that error handling logic is triggered (e.g., snackbar for API errors)
            const snackbarErrorApi = document.getElementById('snackbar_erreur_api');
            assert.notExists(snackbarErrorApi);
            // Add assertions based on how errors are handled in your code
        });
    });

    describe("effacerFormulaire", function(){
    } );



    describe("calculerNbPages", function(){

    it('should calculate the correct number of pages for a given number of lines', function() {
        // Test case 1: 10 lines with 5 lines per page should result in 2 pages
        const result1 = stockcar.calculerNbPages(10, 5);
        assert.strictEqual(result1, 2);

        // Test case 2: 15 lines with 4 lines per page should result in 3 pages
        const result2 = stockcar.calculerNbPages(15, 5);
        assert.strictEqual(result2, 3);

        // Test case 3: 7 lines with 10 lines per page should result in 2 page
        const result3 = stockcar.calculerNbPages(7, 5);
        assert.strictEqual(result3, 2);

        // Test case 4: 0 lines with 5 lines per page should result in 0 pages
        const result4 = stockcar.calculerNbPages(0, 5);
        assert.strictEqual(result4, 0);
    });
    });

    describe("cacherFormulaireCreation", function() {



    });
    describe('paginer', function () {

    });
    describe('afficherBlocVoiture', () => {
        let document;

        beforeEach(() => {
            // Create a new JSDOM instance and set it as the global document
            const dom = new JSDOM('<!DOCTYPE html><html><body><div id="infos"></div></body></html>');
            document = dom.window.document;
            global.document = document;
        });

        afterEach(() => {
            // Clean up and reset the global document
            global.document = undefined;
        });


        it('should create a "Supprimer" button with the correct onclick attribute', () => {
            stockcar.afficherBlocVoiture(sampleVoiture);

            // Verify the presence of the "Supprimer" button and its onclick attribute
            const supprimerButton = document.querySelector('button');
            assert.exists(supprimerButton);
            assert.equal(supprimerButton.getAttribute('onclick'), 'supprimerVoiture(1)');
        });
    });
    describe('genererPagination', function () {

        });
    describe('supprimerVoiture', () => {
        let fetchStub;

        beforeEach(() => {
            fetchStub = sinon.stub(global, 'fetch');
        });

        afterEach(() => {
            fetchStub.restore();
        });


        it('should handle errors when deleting a car', async () => {
            fetchStub.returns(Promise.resolve({ ok: false }));

            const expectedId = 123; // Mock an ID for testing

            await stockcar.supprimerVoiture(expectedId);


        });


    });

/*
    describe('afficherFormulaireCreation', () => {
        it('should display the "nouvelle" element and hide other elements', () => {
            // Create a dummy HTML structure to simulate the elements
            document.body.innerHTML = `
      <div id="nouvelle" style="display: none;"></div>
      <div id="fiche" style="display: block;"></div>
      <div id="recherche" style="display: block;"></div>
      <div class="pagination" style="display: block;"></div>
    `;

            // Call the function
            stockcar.afficherFormulaireCreation();

            // Check if the 'nouvelle' element is displayed
            const nouvelleElement = document.getElementById('nouvelle');
            assert.equal(nouvelleElement.style.display, 'block');

            // Check if the other elements are hidden
            const ficheElement = document.getElementById('fiche');
            assert.equal(ficheElement.style.display, 'none');

            const rechercheElement = document.getElementById('recherche');
            assert.equal(rechercheElement.style.display, 'none');

            const paginationElement = document.querySelector('div.pagination');
            assert.equal(paginationElement.style.display, 'none');
        });
    });

*/
});