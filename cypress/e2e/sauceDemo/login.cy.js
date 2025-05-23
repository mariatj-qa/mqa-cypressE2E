import LoginPage from "/Users/mashaqa/Documents/Frameworks/mqa-cypressE2E/cypress/support/pages/loginPage.cy.js"
describe('Login Functionality',()=>{
    const loginPage = new LoginPage()
    let users = ['standard_user',
        'problem_user',
        'performance_glitch_user',
        'error_user',
        'visual_user']
    let badPasswords = ['onlyString',
        '1',
        'alllowercase',
        'small'
    ]

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

    for(let i in users)
    it('Login Positive Test',()=>{
        cy.visit(Cypress.env('sauce_url'))
        loginPage.getLoginLogo().should('be.visible')
        loginPage.getLoginUsername().should('be.visible').type(users[i])
        loginPage.getLoginPassword().should('be.visible').type(Cypress.env('sauce_password'))
        loginPage.getLoginBtn().should('be.visible').click()
        cy.url().should('include','/inventory.html')
        loginPage.getShoppingCart().should('be.visible')
        loginPage.getProductsTitle().should('be.visible').should('contain','Products')
    })

    for(let i in badPasswords)
    it.only('Login Negative Test',()=>{
        cy.visit(Cypress.env('sauce_url'))
        loginPage.getLoginLogo().should('be.visible')
        loginPage.getLoginUsername().should('be.visible').type(Cypress.env('sauce_username'))
        loginPage.getLoginPassword().should('be.visible').type(badPasswords[i])
        loginPage.getLoginBtn().should('be.visible').click()
        loginPage.getLoginErrorMsg().should('be.visible').should('contain','Epic sadface: Username and password do not match any user in this service')
    })

})