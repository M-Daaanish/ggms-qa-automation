
class SavedPropertiesPage {


newList() {
    return cy.get('.newlistbtn');
}


addListName(listname) {
     cy.get('#user-new-fav-collection').type(listname);
}

makeListprimaryCheck() {
    return cy.get('label > span.form__checkmark').click();
}

saveNewList() {
    return  cy.get('#add-new-list', {timeout: 100000}).click({force:true});
}

favoriteListTitle(listname) {
    return cy.get('.aptcard__content--heading > h4', {timeout: 100000}).contains({listname})
}

getPrimaryList() {
    return cy.contains('.aptcard__tag h5', 'Primary List').click();
}



} 

export default SavedPropertiesPage