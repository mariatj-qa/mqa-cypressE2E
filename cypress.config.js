const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        env:{
            sauce_url: "https://www.saucedemo.com/",
            sauce_username:process.env.SAUCE_USERNAME,
            sauce_password:process.env.SAUCE_PASSWORD
        }
    },
});
