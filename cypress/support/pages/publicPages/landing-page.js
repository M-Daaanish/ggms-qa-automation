class LandingPage {
  //Navigates to the landing page.

  visit() {
    cy.visit("/");
  }


  // Search and select location 
  typeLocation(location) {
    cy.get('input[class="form__search autosearch"]').type(location);
    // Wait for the suggestions container to appear, then choose by text for robustness
    cy.get('.omnisearch__cityaddress.check', { timeout: 10000 })
      .find('div > ul > li > div > span')
      .contains(location)
      .click();
   
  }

  // Get location to search the property 
  getLocation(){
    return cy.get('input[name="tags-manual-suggestions"]');
  }

  // Get advance search widget 

  advanceSearchWidget() {
    return cy.get('div[data-id="6e02ad9"]', {timeout: 60000});
  }


  

}

export default LandingPage;
