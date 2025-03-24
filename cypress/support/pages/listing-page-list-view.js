class ListingPage {
  // Navigate to the listings page
  visit() {
    cy.visit("/listings");
  }

  // Get the property address element
  propertyAddress() {
    return cy.get(".aptcard__content--address", { timeout: 5000 });
  }

  // Click on the 'All Filters' button
  allFiltersButton() {
    cy.get(".filter-toggle").eq(1).click({ force: true });
  }

  // Search and select a location from the suggestions
  typeLocation(location) {
    cy.get(".form__search.autosearch").eq(1).type(location, { force: true });
    cy.get(".omnisearch__cityaddress.check")
      .find(" div > ul > li > div > span")
      .eq(1)
      .contains(location)
      .click();
  }

  // Click on the favorite (save) icon on a listing
  clickFavoriteIcon() {
    cy.get(".aptcard__content--save.favbtn.popup-clickables > span > svg")
      .eq(1)
      .click();
  }

  // Get the sign-in modal when an action requires authentication
  signInModalBox() {
    return cy.get('div[data-elementor-type="popup"]');
  }

  // Get all pagination numbers
  paginationNumber() {
    return cy.get(".pagination__list > li > a");
  }

  // Get the 'Next' button in pagination
  nextButton() {
    return cy.get('.pagination__list > li > a > span[class="icon"]', {
      timeout: 5000,
    });
  }

  // Get the currently active page in pagination
  activePage() {
    return cy.get(".pagination__list > li > a.active", { timeout: 5000 });
  }

  // Navigate to the last page by iterating through pagination
  navToLastPage() {
    let previousPages = new Set(); // Store previously seen page numbers

    const goToLastPage = () => {
      this.activePage()
        .invoke("text")
        .then((currentPage) => {
          // If the page number has already been seen, stop to prevent an infinite loop
          if (previousPages.has(currentPage)) {
            cy.log("Reached the last page, stopping navigation.");
            cy.log(previousPages);
            return;
          }

          // Store the current page number
          previousPages.add(currentPage);

          this.nextButton().then(($next) => {
            if ($next.length === 0) {
              cy.log("No more pages left to navigate.");
              return;
            }

            cy.wrap($next).last().click(); // Click 'Next' button
            cy.wait(500); // Wait for UI update
            goToLastPage(); // Recursive call to continue navigation
          });
        });
    };

    goToLastPage(); // Start the navigation process
  }

  // Get sort options

  sortOption(option) {

    cy.get('.searchresult__header--heading--sorting').click()
    cy.get(
      `.csselect-wrapper > div > .custom-options > span[data-value='${option}']`
    ).click();
  }

  // Get selected value from sorting dropdown
  getSortedValue() {
   return cy.get('.csselect.focus > span');
  }

  // Get no property message 
  noPropertyMessage() {
    return cy.get('.no-results-message')
  }

  list() {
    return cy.get('.searchresult__row')
  }

  // Click on map view  
  mapView() {
    cy.get('#map-list-switch > label ').contains('Map')
  }


  // Click on list view 
  listView() {
    cy.get('#map-list-switch > label ').contains('List')
  }
}

export default ListingPage;
