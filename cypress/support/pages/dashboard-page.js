class Dashboard {
  // ✅ Navigates to the dashboard page
  visit() {
    cy.visit("/dashboard");
  }

  // ✅ Returns the logged-in user's name by extracting text from the userName element
  getUserName() {
    return cy.get("#userName");
  }

  // ✅ Clicks the Edit button on the user's profile card
  // Suggest renaming this to `clickUserProfileEditBtn()` for action clarity
  userProfileEditBtn() {
    return cy.get(".usercard__btn").click();
  }

  // ✅ Returns a dashboard option card based on visible text (e.g., "Save Properties")
  // Enables reuse for "Saved Searches", "Hidden Properties", etc.
  getOptionCard(optionText) {
    return cy.get("div.teamcard__team--info").contains(optionText);
  }

  // ✅ Clicks on a link in the dashboard option card based on the given URL path
  // Cleanly abstracts navigation links like "/favorites", "/saved-searches", "/hidden-listings"
  clickOptionLink(path) {
    return cy.get(`.teamcard__btn > a[href="${path}"]`).click();
  }

  signout() {
    return cy.get('.signout > svg');
  }
}

export default Dashboard;
