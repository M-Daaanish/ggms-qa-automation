const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    
      "baseUrl": "https://mergestack-com.site-dev.ggms.com/",
      "viewportWidth": 1920,
      "viewportHeight": 1080,
      "video": true,
      "screenshotsFolder": "cypress/screenshots",
      "videosFolder": "cypress/videos"
      
    
  },
});
