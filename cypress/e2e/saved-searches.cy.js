/*
 * 
 * Test Scenarios:
 * 
 * 1. Guest users should be redirected to Sign-In on accessing Saved Searches.
 * 2. Authenticated users should be able to save a search (try multiple combinations).
 * 3. Saved searches should appear correctly on the Saved Searches page.
 * 4. No duplicate saved searches should be allowed.
 * 5. Users should be able to navigate to listings using a saved search.
 * 
 */

import PropertySharedElements from "../support/pages/property-shared-elements";
import SavedSearchesPage from "../support/pages/saved-searches-page";
import Dashboard from "../support/pages/dashboard-page";

const sharedElements = new PropertySharedElements();
const savedSearchPage = new SavedSearchesPage();
const dashboardPage = new Dashboard();

// Test Suite: Guest User
describe('Saved Searches - Guest User Access', () => {

  it('Should redirect guest user to Sign-In page when accessing Saved Searches', () => {
    cy.visit('/saved-searches');
    cy.url().should('include', '/sign-in');
  });

});

// Test Suite: Authenticated User
describe('Saved Searches - Authenticated User Functionality', () => {

  beforeEach(() => {
    cy.visitSignIn();
    cy.fixture("sign-in").then((data) => {
      cy.login(data.emailAddress, data.password);
    });
  });

  it.only('Should allow user to save a search and view it in Saved Searches page', () => {
    cy.visit('/listings');
    sharedElements.typeLocation("Orlando");
    sharedElements.saveSearch();

    cy.visit('/saved-searches');
   savedSearchPage.savedSearchTitle().then((text) => {
        const normalized = text.replace(/\s+/g, ' ').trim();
        expect(normalized).to.include('Orlando'); 

   });
       
    
});

  it('Should prevent duplicate saved searches from appearing in Saved Searches page', () => {
    cy.visit('/listings');
    sharedElements.typeLocation("Orlando");
    sharedElements.saveSearch();

    cy.visit('/saved-searches');
    savedSearchPage.savedSearchTitle().then(($titles) => {
      const titlesText = [...$titles].map(el => el.textContent?.trim()).filter(Boolean);
      const duplicates = titlesText.filter((title, index, self) =>
        self.indexOf(title) !== index
      );
      expect(duplicates.length, `Duplicate saved search titles found: ${duplicates}`).to.eq(0);
    });
  });




 

});
