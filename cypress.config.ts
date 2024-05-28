const { defineConfig } = require('cypress');
const dotenvPlugin = require('cypress-dotenv');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(config) {
      config = dotenvPlugin(config, 'cypress.env.json');
      return config;
    },
  },
});
