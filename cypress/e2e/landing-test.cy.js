
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

   

 // Verify sees advance search widget 

 it('Verify user can see advance search widget on landing page', () => {
    landingPage.advanceSearchWidget().should('be.visible')
 })

    // Verify navigation of user to the listing page on location selection
    it("Verify user navigation on location selection", () => {
        landingPage.typeLocation(landingPageTestData.propertyLocation);
        cy.url().should('include', `/listings/city/${landingPageTestData.propertyLocation}`);
    });



})
