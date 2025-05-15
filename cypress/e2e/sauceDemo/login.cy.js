
import LoginPage from "/Users/mashaqa/Desktop/Frameworks/mqa_cypress/cypress/support/pages/loginPage.cy.js"
describe('Login Functionality',()=>{
    const loginPage = new LoginPage()

    it('Login Positive Test',()=>{
        cy.visit(Cypress.env('sauce_url'))
        loginPage.getLoginLogo().should('be.visible')
        loginPage.getLoginUsername().should('be.visible').type(Cypress.env('sauce_username'))
        loginPage.getLoginPassword().should('be.visible').type(Cypress.env('sauce_password'))
        loginPage.getLoginBtn().should('be.visible').click()
        cy.url().should('include','/inventory.html')
        loginPage.getShoppingCart().should('be.visible')
        loginPage.getProductsTitle().should('be.visible').should('contain','Products')

    })
})