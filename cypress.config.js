const { defineConfig } = require("cypress");


module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/results',
      overwrite: false,
      html: false,
      json: true,
    },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },

  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'mocha-junit-reporters, mochawesome',
    mochaJunitReportersReporterOptions: {
      mochaFile: 'test-results/junit/test-results2.[hash].xml',
      toConsole: true,
    },
    mochawesomeReporterOptions: {
      reportDir: 'test-results/mochawesome',
      overwrite: true,
      html: true,
      json: true,
    },
  },
});
