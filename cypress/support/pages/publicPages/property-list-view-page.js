class ListingPage {
  // ✅ Navigate to the listings page
  visit() {
    cy.visit("/listings");
  }

  // ✅ Get property listing cards
  list() {
    return cy.get(".searchresult__row");
  }

  // Get specific card based on address 
  getListingCard(address) {
   // return cy.get('.aptcard.mv > .aptcard__content > .aptcard__content--address > p')
   cy.get('.aptcard.mv', { timeout: 10000 }).should('exist'); 
  return  cy.contains('.aptcard__content .aptcard__content--address p', address).closest('.aptcard.mv');
  }

  // Get and click heart icon 

  clickHeartIcon(address) {
    this.getListingCard(address).as('selectedCard')

    cy.get('@selectedCard').find('a[class*="favbtn"]').should('be.visible').click();
  }

  // Get favorite marked heart icon 

  getFavoriteMarkedHeartIcon(address) {
    this.getListingCard(address).as('selectedCard')

    return cy.get('@selectedCard').find('.aptcard__content--save.favbtn.popup-clickables.active')
  }

}

export default ListingPage;
