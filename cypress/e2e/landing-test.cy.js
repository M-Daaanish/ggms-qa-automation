import { execPath, hasUncaughtExceptionCaptureCallback } from "process";
import LandingPage from "../support/pages/landing-page";

describe('Landing page test suite', () => {
    const landingPage = new LandingPage();
    let landingPageTestData;

    beforeEach(() => {
        // Visit the landing page before running tests
        landingPage.visit();
        
        // Load test data from fixture file
        cy.fixture("landing-page-data").then((testData) => {
            landingPageTestData = testData;
        });
    });

   

    // Verify navigation of user to the listing page on location selection
    it("Verify user navigation on location selection", () => {
        landingPage.typeLocation(landingPageTestData.propertyLocation);
        cy.url().should('include', `/listings/city/${landingPageTestData.propertyLocation}`);
    });

    // Verify user can select property type filter and apply it
    it('Verify property type filter selection', () => {
        landingPage.typeLocation(landingPageTestData.propertyLocation);
        landingPage.getPropertyTypeFilter();
        landingPage.getPropertyTypeOption(landingPageTestData.propertyType);
       
        cy.url({ timeout: 10000 }).should('include', `/filter/property-type=${landingPageTestData.propertyType}`);
    });

    // Verify user can set a price range filter
    it("Verify property price filter selection", () => {
        landingPage.typeLocation(landingPageTestData.propertyLocation);
        landingPage.getPriceFilter();
        landingPage.getMinPriceRange(landingPageTestData.minimumPrice);
        landingPage.getPriceFilter();
        landingPage.getMaxPriceRange(landingPageTestData.maximumPrice);
        


        // Verify URL parameters based on user input
            cy.url({ timeout: 10000 }).should('include', `/filter/min-price=${landingPageTestData.minimumPrice},max-price=${landingPageTestData.maximumPrice}`);
        
    })
    // Verify user can select property specifications like number of beds and baths
    it("Verify property specs (beds/baths)", () => {
        landingPage.typeLocation(landingPageTestData.propertyLocation);
        landingPage.getBedAndBathFilter();
        landingPage.getBedOption(landingPageTestData.numberOfBed);
        landingPage.getBedAndBathFilter();
        landingPage.getBathOption(landingPageTestData.numberOfBath);
  
        
      

        // Verify URL parameters based on selected beds/baths
      
            cy.url({ timeout: 10000 }).should('include', `/filter/min-beds=${landingPageTestData.numberOfBed},min-baths=${landingPageTestData.numberOfBath}`);
      
    });

    // Verify user cannot navigate to listing page without location selection
    it("Verify user cannot go to listing page without selecting location", () => {
        landingPage.search()
        landingPage.getLocation().should('have.class', 'alert')
        landingPage.toastWarning().should('include', ' This field is required')
    })


})
