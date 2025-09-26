  
  class SavedSearchesPage {
 
 
// ✅ Get saved search title

savedSearchTitle() {
    return cy.get('.row.saved-search > div > div.savecard > div.savecard__title > h4').invoke('text');
}

// ✅ Get all saved search title elements (list support)

savedSearchTitleElements() {
    return cy.get('.row.saved-search .savecard__title > h4');
}

// Open edit mode of saves search 

savedSearchEditMode() {
    return cy.get('.row.saved-search > div > div.savecard > .savecard__settings > button.editBtn').click();
}



// Click on saved search card

savedSearchFirstCard() { 
  return cy.get('.row.saved-search').find('.col-sm-6.col-xl-4 > .savecard').first();
}

// Delete existing saved searches

deleteSavedSearch(title) {
 this.savedSearchFirstCard().as('targetedSavedSearch')
  
  cy.get('.row.saved-search .savecard').then(($cards) => {
    if ($cards.length === 0) {
      throw new Error('No saved searches found to delete');
    }
    let found = false;
    cy.wrap($cards).each(($card) => {
      if (found) return;
      const $title = $card.querySelector('.savecard__title > h4');
      const text = $title ? $title.textContent.trim() : '';
      if (!title || (title && text.includes(title))) {
        found = true;
        cy.wrap($card).find('.btnDelete').click();
      }
    }).then(() => {
      if (!found) {
        cy.wrap($cards[0]).find('.btnDelete').click();
      }
    });
  });
  }


// Click on delete button on confirmation modal

deleteConfirmationButton() {
  cy.get('#search-delete-btn').click(); 
}











}

export default SavedSearchesPage