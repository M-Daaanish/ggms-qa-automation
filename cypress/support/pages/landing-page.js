class LandingPage {
  //Navigates to the landing page.

  visit() {
    cy.visit("/landing");
  }

  // Clicks on the property type filter to open the dropdown.

  getPropertyTypeFilter() {
    cy.get(".advancesearch__ptypetoggle").click();
  }

  //Selects a specific property type from the filter options.

  getPropertyTypeOption(propertyType) {
    cy.get(
      `div[class="form__csradio"] > label > input[value=${propertyType}]`
    ).click();
  }

  //Clicks on the bed and bath filter to open the dropdown.

  getBedAndBathFilter() {
    cy.get(".advancesearch__bbtoggle").click();
  }

  // Selects a specific number of bedrooms from the filter.

  getBedOption(numberOfBed) {
    cy.get(`#bedValue > label > input[value="${numberOfBed}"]`).click();
  }

  // Selects a specific number of bathrooms from the filter.

  getBathOption(numberOfBath) {
    cy.get(`#bathValue > label > input[value="${numberOfBath}"]`).click();
  }

  // Clicks on the price filter to open the dropdown.

  getPriceFilter() {
    cy.get(".advancesearch__pricetoggle").click();
  }

  // Selects a minimum price range from the dropdown.

  getMinPriceRange(minimumPrice) {
    cy.get(".csselect-trigger").eq(1).click(); // Opens the minimum price dropdown
    cy.get(".custom-options")
      .eq(1)
      .find(`span[data-value="${minimumPrice}"]`)
      .should("exist") // Ensures the element is present before clicking
      .click();
  }

  // Selects a maximum price range from the dropdown.

  getMaxPriceRange(maximumPrice) {
    cy.get(".csselect-trigger").eq(2).click(); // Opens the maximum price dropdown
    cy.get(".custom-options")
      .eq(2)
      .find(`span[data-value="${maximumPrice}"]`)
      .should("exist") // Ensures the element is present before clicking
      .click();
  }

  // Search and select location 
  typeLocation(location) {
    cy.get('input[class="form__search autosearch"]').type(location)
    cy.get('.omnisearch__cityaddress.check').find(' div > ul > li > div > span').eq(1).contains(location).click()
   
  }

  search(){
    cy.get('#search-btn-omni').click()
  }

  getLocation(){
    return cy.get('input[name="tags-manual-suggestions"]')
  }

  toastWarning() {
   const errorMessage =  cy.get('div[class="omnisearch__requirederror check"] > div > h5').invoke('text')
   return errorMessage
  }

  

}

export default LandingPage;
