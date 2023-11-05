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
