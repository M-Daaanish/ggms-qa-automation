const { defineConfig } = require("cypress");
const { allureCypress } = require("allure-cypress/reporter");

module.exports = defineConfig({
  projectId: 'qp4x8d',
  
  e2e: {

    setupNodeEvents(on, config) {
      // implement node event listeners here
     
      
      allureCypress(on, config, {
        resultsDir: "allure-results"
       
      });
      return config;
    },
    
      "baseUrl": "https://mergestack-com.site-dev.ggms.com/",
      "viewportWidth": 1920,
      "viewportHeight": 1080,
      "video": true,
      "screenshotsFolder": "cypress/screenshots",
      "videosFolder": "cypress/videos"
      
      
    
  }
  
 
});
