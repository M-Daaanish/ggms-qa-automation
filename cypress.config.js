const { defineConfig } = require("cypress");
const { allureCypress } = require("allure-cypress/reporter");


module.exports = defineConfig({

  retries: {
    runMode: 2,
    //openMode: 1
  },
  projectId: 'qnni9m',
  
  e2e: {

    setupNodeEvents(on, config) {
     
     
      
      allureCypress(on, config, {
        resultsDir: "allure-results"
       
      });
      return config;
    },
    
      "baseUrl": "https://forge-com.site-dev.ggms.com",
      "viewportWidth": 1920,
      "viewportHeight": 1080,
      "video": true,
      "screenshotsFolder": "cypress/screenshots",
      "videosFolder": "cypress/videos",
      "reporter": "cypress-mochawesome-reporter"
      
      
    
  }
  
 
});
