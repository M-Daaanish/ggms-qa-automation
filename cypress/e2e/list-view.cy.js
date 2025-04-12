
import ListingPage from "../support/pages/property-list-view-page";
import PropertySharedElements from "../support/pages/property-shared-elements"

const listingPage = new ListingPage(); // ✅ use const when instance doesn't change
const sharedElements =  new PropertySharedElements();
let listingPageData;

describe("🏠 Listing Page Test Suite", () => {
 

  beforeEach(() => {
    // Visit the listing page before each test
    listingPage.visit();

    // Load test data from fixture
    cy.fixture("listing-page-data").then((data) => {
      listingPageData = data;
    });
    

    // Prevent test failure on uncaught exceptions (optional, depending on app stability)
    Cypress.on("uncaught:exception", () => false);
  });

  /**
   * ✅ Test: Search listings by location
   * - Input location
   * - Verify all displayed addresses contain that location
   */
  it("should display listings based on the location selected by the user", () => {
    sharedElements.typeLocation(listingPageData.propertyLocation);

    // Wait for listings to render (consider replacing with intercept in future)
    cy.wait(2000);

    sharedElements
      .propertyAddress()
      .each(($address) => {
        const addressText = $address.text().toLowerCase();
        expect(addressText).to.include(
          listingPageData.propertyLocation.toLowerCase()
        );
      });
  });


  /**
   * ✅ Test: Pagination to the last page
   * - Navigate to the last page using the navToLastPage function
   * - Verify the active page element is correctly set
   */
  it("should navigate to the last page using pagination controls", () => {
    sharedElements.typeLocation(listingPageData.propertyLocation);

    // Wait for listings (replace with intercept in future)
    cy.wait(3000);

    sharedElements.navToLastPage();

    sharedElements
      .activePage()
      .invoke("text")
      .then((activePageText) => {
        expect(Number(activePageText)).to.be.greaterThan(1); // Or compare with expected last page
      });
  });

  /**
   * ✅ Test: Sorting functionality
   * - Select a sort option
   * - Verify the selected value is reflected in UI
   */
  it("should sort listings based on the selected sort option", () => {
    sharedElements.sortOption(listingPageData.sortValue);

    sharedElements
      .getSortedValue()
      .should("be.visible")
      .invoke("text")
      .then((selectedText) => {
        const trimmed = selectedText.trim();
        expect(trimmed).to.eq(listingPageData.selectedSortValue);
      });
  });


  /**
   * ✅ Test: Favorite icon triggers login modal for guest users
   */
   it("should show sign-in modal when a guest user tries to favorite a listing", () => {
    sharedElements.clickFavoriteIcon();

    sharedElements
      .signInModalBox()
      .should("exist")
      .and("be.visible");
  });

/**
 * ✅ Test: Save Search as a guest user
 * - Select a sort option
 * - Verify the selected value is reflected in UI
 */

it("Should not allow guest user to save search", () => {
  sharedElements.saveSearch(); 
  sharedElements.signInModalBox().
        should("exist").
        and("be.visible")
})

})

describe('Listing Page - Logged-In User', () => {

beforeEach(() => {
  cy.visitSignIn();
  cy.fixture("sign-in").then((data) => {
    cy.login(data.emailAddress, data.password)
  });
  cy.visit('/listings')
  
})


  /**
   * ✅ Test: Save Search wihtout location
   * - Select a sort option
   * - Verify the selected value is reflected in UI
   */

  it.only("Should not allow the user to save search without location", () => {
    sharedElements.saveSearch();
    sharedElements.saveSearchLocationError().should('be.visible');
  })


})

  

