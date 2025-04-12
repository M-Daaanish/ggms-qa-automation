class PropertySharedElements {


  // ✅ Get the property address element
  propertyAddress() {
    return cy.get(".aptcard__content--address", { timeout: 5000 });
  }

  // 🛠 Click on the 'All Filters' button
  // Consider parameterizing this if there are multiple filter buttons
  allFiltersButton() {
    return cy.get(".filter-toggle").eq(1).click({ force: true });
  }

  // 🛠 Search and select a location from the suggestions
  // Consider waiting for suggestions to appear or make this more dynamic
  typeLocation(location) {
    cy.get(".form__search.autosearch").eq(1).type(location, { force: true });
    cy.get(".omnisearch__cityaddress.check")
      .find("div > ul > li > div > span")
      .contains(location) // ✅ only `.contains()` is enough; no need for `.eq(1)`
      .click();
  }

  // ✅ Click on the favorite (save) icon on a listing
  clickFavoriteIcon() {
    return cy
      .get(".aptcard__content--save.favbtn.popup-clickables > span > svg")
      .eq(1)
      .click();
  }

  // ✅ Get the sign-in modal when an action requires authentication
  signInModalBox() {
    return cy.get('div[data-elementor-type="popup"]');
  }

  // ✅ Get all pagination numbers
  paginationNumber() {
    return cy.get(".pagination__list > li > a");
  }

  // ✅ Get the 'Next' button in pagination
  nextButton() {
    return cy.get('.pagination__list > li > a > span[class="icon"]', {
      timeout: 5000,
    });
  }

  // ✅ Get the currently active page in pagination
  activePage() {
    return cy.get(".pagination__list > li > a.active", { timeout: 5000 });
  }

  // 🛠 Navigate to the last page by iterating through pagination
  // This is clever — nice job avoiding infinite loops!
  navToLastPage() {
    let previousPages = new Set();

    const goToLastPage = () => {
      this.activePage()
        .invoke("text")
        .then((currentPage) => {
          if (previousPages.has(currentPage)) {
            cy.log("Reached the last page, stopping navigation.");
            return;
          }

          previousPages.add(currentPage);

          this.nextButton().then(($next) => {
            if ($next.length === 0) {
              cy.log("No more pages left to navigate.");
              return;
            }

            cy.wrap($next).last().click(); // ✅ Always use `.last()` for robustness
            cy.wait(500); // 🛠 Consider using `cy.intercept()` for API wait instead
            goToLastPage(); // 🔁 Recursive call
          });
        });
    };

    goToLastPage(); // 🔁 Kickstart recursion
  }

  // 🛠 Select a sorting option from dropdown
  sortOption(option) {
    cy.get(".searchresult__header--heading--sorting").click();
    cy.get(
      `.csselect-wrapper > div > .custom-options > span[data-value='${option}']`
    ).click();
  }

  // ✅ Get selected value from sorting dropdown
  getSortedValue() {
    return cy.get(".csselect.focus > span");
  }

  // ✅ Get 'no property found' message
  noPropertyMessage() {
    return cy.get(".no-results-message");
  }


  // 🛠 Click on map view toggle
  mapView() {
    return cy.get("#map-list-switch > label").contains("Map").click(); // 🔁 Added .click()
  }

  // 🛠 Click on list view toggle
  listView() {
    return cy.get("#map-list-switch > label").contains("List").click(); // 🔁 Added .click()
  }

  // 🛠 Click on Save search button 
  saveSearch() {
    return cy.get('div[id="advance-search-search-btn"]').click()
  }
  // ✅ Get save search location error message
  saveSearchLocationError() {
    return cy.get('.alertmodal > div > h5 > span').contains('Location is mandatory to apply filter!',{timeout:60000})
  }


}

export default PropertySharedElements