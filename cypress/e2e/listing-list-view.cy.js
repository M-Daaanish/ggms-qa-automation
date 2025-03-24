import ListingPage from "../support/pages/listing-page-list-view";

describe("Listing Page Test Suit", () => {
  let listingPage = new ListingPage();

  let listingPageData;

  beforeEach(() => {
    listingPage.visit();

    cy.fixture("listing-page-data").then((data) => {
      listingPageData = data;
    });
    Cypress.on("uncaught:exception", () => false);
  });

  // Verify listing based on the location selected by the user
  it("Verify listings based on the location selected by the user", () => {
    listingPage.typeLocation(listingPageData.propertyLocation); // Selecting location on listing page
    // Getting all of the listing addres displaying on the page and applying asserton on the address to have specified location
    listingPage
      .propertyAddress()
      .should("contain", listingPageData.propertyLocation.toLowerCase());

    
  });

  // Verify user sign in modal when unauthoptized user mark the property as favorite

  it("Verify sign-in modal visibility on guest user marking favorite listing", () => {
    // Clicking favorite icon as a guest user
    listingPage.clickFavoriteIcon();
    // Applying assertion on sign-in modal box to be visible
    listingPage.signInModalBox().should("be.visible");
  });

  // Verify pagination feature

  it("Verify that user is able move to last page via pagination", () => {
    // Entering location
    listingPage.typeLocation(listingPageData.propertyLocation);
    // Wait for few seconds to load the page properly
    cy.wait(5000);
    // Calling navigation to last page function
    listingPage.navToLastPage();
    // Applying assertion on the active pagination number - which will be the last one
    listingPage.paginationNumber().should("have.class", "active");
  });

  it("Verify sorting functionality on listing page", () => {
    listingPage.sortOption(listingPageData.sortValue);
    listingPage
      .getSortedValue()
      .should("be.visible")
      .invoke("text")
      .then((sortValue) => {
        const trimmedValue = sortValue.trim();
        expect(trimmedValue).to.eq(listingPageData.selectedSortValue);
      });
  });
});
