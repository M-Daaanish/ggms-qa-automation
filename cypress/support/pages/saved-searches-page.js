  
  class SavedSearches {
  
  // 🛠 Click on Save search button 
  saveSearch() {
    return cy.get('div[id="advance-search-search-btn"]').click();
  }
  
  // ✅ Get save search success message 
  saveSearchSuccessMessage() {
    return cy.get('.alertmodal > div > h5 > span').contains('Search saved successfully!',{timeout:60000});
  }


// ✅ Get saved search text

savedSearchButtonText() {
    return cy.get('div[id="advance-search-search-btn"] > a').invoke('text');
}

// ✅ Get saved search title

savedSearchTitle() {
    return cy.get('.row.saved-search > div > div.savecard > div.savecard__title > h4').invoke('text');
}

// Open edit mode of saves search 

savedSearchEditMode() {
    return cy.get('.row.saved-search > div > div.savecard > .savecard__settings > button.editBtn').click();
}


 DeletesavedSearches() {
    return cy.get('.row.saved-search > div > div.savecard > .savecard__settings > button.btnDelete')
}








}