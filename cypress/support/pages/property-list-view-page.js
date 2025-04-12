class ListingPage {
  // ✅ Navigate to the listings page
  visit() {
    cy.visit("/listings");
  }

  // ✅ Get property listing cards
  list() {
    return cy.get(".searchresult__row");
  }

}

export default ListingPage;
