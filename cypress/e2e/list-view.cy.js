import ListingPage from "../support/pages/property-list-view-page";
import PropertySharedElements from "../support/pages/property-shared-elements";
import SavedPropertiesPage from "../support/pages/saved-properties-page";

const listingPage = new ListingPage(); // ✅ Great: POM instance declared once
const sharedElements = new PropertySharedElements();
const savedProperties = new SavedPropertiesPage()
let listingPageData;

describe("🏠 Listing Page Test Suite", () => {
  beforeEach(() => {
    listingPage.visit(); // ✅ Consistent entry point

    cy.fixture("listing-page-data").then((data) => {
      listingPageData = data;
    });

    Cypress.on("uncaught:exception", () => false); //  Use this sparingly – ideally catch known errors directly
  });

  it("should display listings based on the location selected by the user", () => {
    // ✅ Intercept declared before triggering
    cy.intercept('POST', '**/public/listings*').as('getListingsForSearch');

    sharedElements.typeLocation(listingPageData.propertyLocation);
    

    cy.wait('@getListingsForSearch'); // ✅ Essential for stability

    sharedElements.propertyAddress()
      .should('have.length.greaterThan', 0) // ✅ Good practice to avoid false positives
      .each(($address) => {
        const addressText = $address.text().toLowerCase();
        expect(addressText).to.include(
          listingPageData.propertyLocation.toLowerCase()
        );
      });
  });

  ///it("should navigate to the last page using pagination controls", () => {
    //cy.intercept('POST', '**/public/listings*').as('getListingsForSearch');

    /*sharedElements.typeLocation(listingPageData.propertyLocation);
    
    cy.wait('@getListingsForSearch');

    sharedElements.navToLastPage();

    sharedElements.activePage()
      .invoke("text")
      .then((activePageText) => {
        expect(Number(activePageText)).to.be.greaterThan(1); // ✅ Logical and flexible
      });
  });*/
  
  it("should sort listings based on the selected sort option", () => {
    sharedElements.sortOption(listingPageData.sortValue); // ✅ Should internally trigger listing reload

    sharedElements.getSortedValue()
      .should("be.visible")
      .invoke("text")
      .then((selectedText) => {
        const trimmed = selectedText.trim();
        expect(trimmed).to.eq(listingPageData.selectedSortValue); // ✅ Data-driven + semantic
      });
  });

  it("should show sign-in modal when a guest user tries to favorite a listing", () => {
    sharedElements.clickFavoriteIcon(); 

    sharedElements.signInModalBox()
      .should("exist")
      .and("be.visible"); // ✅ Checks both existence and visibility
  });

  it("Should not allow guest user to save search", () => {
    sharedElements.saveSearch();

    sharedElements.signInModalBox()
      .should("exist")
      .and("be.visible"); // ✅ Good UI validation
  });
});

describe("Listing Page - Logged-In User", () => {
  beforeEach(() => {
    cy.visitSignIn();

    cy.fixture("listing-page-data").then((data) => {
      listingPageData = data;
    });

    cy.fixture("sign-in").then((data) => {
      cy.login(data.emailAddress, data.password); // ✅ Custom login command = good abstraction
    });

    cy.visit("/listings"); // ✅ Post-login redirection check
  });

  it("Should allow the user to save search with location", () => {
    sharedElements.typeLocation(listingPageData.propertyLocation);


    sharedElements.saveSearch();
    sharedElements.savedSearchText().then((text) => {
      let savedSearchText = text.trim();
      expect(savedSearchText).to.be.eq("Search saved"); // ✅ Text-based confirmation
    });
  });

  it("Should allow user to mark the listing as favorite", () => {
    listingPage.clickHeartIcon(listingPageData.listingAddress); // ✅ POM for targeting by address

    listingPage.getFavoriteMarkedHeartIcon(listingPageData.listingAddress)
      .should('be.visible'); 
      cy.visit('/saved-properties');
      savedProperties.getPrimaryList();
      listingPage.getFavoriteMarkedHeartIcon(listingPageData.listingAddress)
      .should('be.visible'); // 


  });
});
