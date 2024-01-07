const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.goodreads.com",
    watchForFileChanges: false,
  },
});
