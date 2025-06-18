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
let listingLocation;

// Test Suite: Guest User
describe("Saved Searches - Guest User Access", () => {
  it("Should redirect guest user to Sign-In page when accessing Saved Searches", () => {
    cy.visit("/saved-searches");
    cy.url().should("include", "/sign-in");
  });
});

// Test Suite: Authenticated User
describe("Saved Searches - Authenticated User Functionality", () => {
  beforeEach(() => {
    cy.visitSignIn();
    cy.fixture("sign-in").then((data) => {
      cy.login(data.emailAddress, data.password);
    });
    cy.fixture("location").then((data) => {
      listingLocation = data;
    });
    cy.visit("/listings");
  });

  // Ensure that user is able to see saved search in saved search page

  it("Should allow user to save a search and view it in Saved Searches page", () => {
    sharedElements.typeLocation(listingLocation.orlando);
    sharedElements.saveSearch();
    cy.visit("/saved-searches");
    savedSearchPage.savedSearchTitle().then((text) => {
      const normalized = text.replace(/\s+/g, " ").trim();
      expect(normalized).to.include(listingLocation.orlando);
    });
  });

  // Ensure that user can delete the saved searches
  it.only("Should allow user to delete the saved search", () => {
    cy.visit("/saved-searches");

    savedSearchPage.deleteSavedSearch("Property Type: House");
    savedSearchPage.deleteConfirmationButton();
  });
});
