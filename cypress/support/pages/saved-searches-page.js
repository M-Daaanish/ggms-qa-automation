  
  class SavedSearchesPage {
 

// ✅ Get saved search title

savedSearchTitle() {
    return cy.get('.row.saved-search > div > div.savecard > div.savecard__title > h4').invoke('text');
}

// Open edit mode of saves search 

savedSearchEditMode() {
    return cy.get('.row.saved-search > div > div.savecard > .savecard__settings > button.editBtn').click();
}



// Click on saved search card

savedSearchCard(title) { 
  return cy.contains('.savecard', `${title}`).invoke('removeAttr', 'target').click()
}

// Delete existing saved searches
deleteSavedSearch(title) {
  return cy.contains('.savecard', `${title}`).within(() => {
    cy.get('.btnDelete').click();
  })
}

// Click on delete button on confirmation modal
deleteConfirmationButton() {
  cy.get('#search-delete-btn').click(); 
}












}

export default SavedSearchesPage