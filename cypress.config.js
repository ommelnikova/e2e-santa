const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const allureWriter = require('@shelex/cypress-allure-plugin/writer');




module.exports = defineConfig({
  e2e: {
    baseUrl: "https://santa-secret.ru",
    testIsolation: false,
    setupNodeEvents(on, config) { 
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)], 
      });
      on("file:preprocessor", bundler);
      addCucumberPreprocessorPlugin(on, config);
      allureWriter(on, config, { resultsDir: "allure-results" });
            return config;
    },
    env: {
      allureReuseAfterSpec: true,
    },
    specPattern: "cypress/**/santaBox-create.copy.feature",
    chromeWebSecurity: false,
    pageLoadTimeout: 120000,
    requestTimeout: 60000,
    responseTimeout: 60000,
  },
});
// module.exports = defineConfig({
//   e2e: {
//     baseUrl: "https://santa-secret.ru",
//     testIsolation: false,
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },
// });
