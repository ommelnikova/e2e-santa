const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const createEsbuildPlugin =
  require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
const addCucumberPreprocessorPlugin =
  require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
  const allureWriter = require('@shelex/cypress-allure-plugin/writer');


module.exports = defineConfig({
  projectId: "f8rude",
  e2e: {
    baseUrl: "https://santa-secret.ru",
    testIsolation: false,
    setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });
      on("file:preprocessor", bundler);
      addCucumberPreprocessorPlugin(on, config);
      allureWriter(on, config);
      return config;
    },
    specPattern: "cypress/**/*.feature",
    chromeWebSecurity: false,
    pageLoadTimeout: 300000,
    requestTimeout: 60000,
    responseTimeout: 60000,
    viewportWidth: 1366,
    viewportHeight: 768,
  },
});
