import LoginPage from "/Users/mashaqa/Documents/Frameworks/mqa-cypressE2E/cypress/support/pages/loginPage.cy.js"
describe('Login Functionality',()=>{
    const loginPage = new LoginPage()
    let users = ['standard_user',
        'problem_user',
        'performance_glitch_user',
        'error_user',
        'visual_user']
    let passwords = ['onlyString',
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
        cy.log("Test Passed!")
    })

    for(let i in users)
    it('Login Positive Test - with different users',()=>{
        cy.visit(Cypress.env('sauce_url'))
        loginPage.getLoginLogo().should('be.visible')
        loginPage.getLoginUsername().should('be.visible').type(users[i])
        loginPage.getLoginPassword().should('be.visible').type(Cypress.env('sauce_password'))
        loginPage.getLoginBtn().should('be.visible').click()
        cy.url().should('include','/inventory.html')
        loginPage.getShoppingCart().should('be.visible')
        loginPage.getProductsTitle().should('be.visible').should('contain','Products')
    })

    for(let i in passwords)
    it('Login Negative Test',()=>{
        cy.visit(Cypress.env('sauce_url'))
        loginPage.getLoginLogo().should('be.visible')
        loginPage.getLoginUsername().should('be.visible').type(Cypress.env('sauce_username'))
        loginPage.getLoginPassword().should('be.visible').type(passwords[i])
        loginPage.getLoginBtn().should('be.visible').click()
        loginPage.getLoginErrorMsg().should('be.visible').should('contain','Epic sadface: Username and password do not match any user in this service')
    })


    it('Login Positive Test - dynamic password',()=>{
        cy.visit(Cypress.env('sauce_url'))
        loginPage.getLoginLogo().should('be.visible')
        loginPage.getLoginPasswordValue().should('be.visible').invoke('text').then((value)=>{
            cy.log("Value: "+ value)
            cy.log(value.match("(?<="+"Password for all users:"+").*")[0]) //command to get value from string that you need with REGEX
            cy.wrap(value.match("(?<="+"Password for all users:"+").*")[0]).as("password")
        })
        cy.get('@password').then((pass)=>{
            cy.log("Password: "+ pass)
            loginPage.getLoginUsername().should('be.visible').type(Cypress.env('sauce_username'))
            loginPage.getLoginPassword().should('be.visible').type(pass)
            loginPage.getLoginBtn().should('be.visible').click()
            cy.url().should('include','/inventory.html')
            loginPage.getShoppingCart().should('be.visible')
            loginPage.getProductsTitle().should('be.visible').should('contain','Products')
        })
    })

})