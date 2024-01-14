const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;


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
      return config;
    },
    specPattern: "cypress/**/*.feature"
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
