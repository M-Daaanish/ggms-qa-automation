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

import PropertySharedElements from "../../support/pages/publicPages/property-shared-elements";
import SavedSearchesPage from "../../support/pages/privatePages/saved-searches-page";
import Dashboard from "../../support/pages/privatePages/dashboard-page";

const sharedElements = new PropertySharedElements();
const savedSearchPage = new SavedSearchesPage();
const dashboardPage = new Dashboard();
let listingLocation;

// Test Suite: Guest User
describe("Saved Searches - Guest User Access", () => {
  it("Should redirect guest user to Sign-In page when accessing Saved Searches", () => {
    cy.visit("/saved-searches");
    cy.url().then((url) => {
      if (url.includes("/sign-in")) {
        expect(url).to.include("/sign-in");
      } else {
        // Some flows show a sign-in modal instead of redirect
        sharedElements.signInModalBox().should("be.visible");
      }
    });
  });
});

// Test Suite: Authenticated User
describe("Saved Searches - Authenticated User Functionality", () => {
  beforeEach(() => {
    cy.visitSignIn();
    cy.loadFixture("sign-in").then((data) => {
      cy.login(data.emailAddress, data.password);
    });
    cy.loadFixture("location").then((data) => {
      listingLocation = data;
    });
    cy.visit("/listings");
  });

  // Ensure that user is able to see saved search in saved search page

  it("Should allow user to save a search and view it in Saved Searches page", () => {
    sharedElements.typeLocation(listingLocation.orlando);
    // Ensure the page/UI has applied the filter before saving
    sharedElements.propertyAddress().should("exist");
    sharedElements.saveSearch();
    cy.visit("/saved-searches");
    // Check any saved search title contains the location
    savedSearchPage
      .savedSearchTitleElements()
      .should("exist")
      .then(($titles) => {
        const texts = [...$titles].map((el) => el.textContent.replace(/\s+/g, " ").trim());
        expect(texts.some((t) => t.includes(listingLocation.orlando))).to.be.true;
      });
  });

  // Ensure that user can delete the saved searches
  it("Should allow user to delete the saved search", () => {
    cy.visit("/saved-searches");

    savedSearchPage.deleteSavedSearch("Property Type: House");
    savedSearchPage.deleteConfirmationButton();
  });
});
