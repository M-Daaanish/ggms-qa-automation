
class ListingDetails {


   visit() { 
      cy.visit('/property-results/FL/Orlando/408-Pine-Street/32824/O6289408#')
   }


 galleryViewBtn() {
    cy.get('#gallery-view-btn').click();
 }

 // Click hide property button 

 hideProperty() {
   return cy.get('.btnss.hideopen');
 }


 saveProeprty() {
   return cy.get('#save-property-btn');
 }

 shareProperty() {
   return cy.get('a[class="popup-clickables"] > .btnss.shareopen');
 }

 getTourInPersonButton() {
   return cy.contains('Tour in person');
}

getTourViaVideoChatButton() {
   return cy.contains('Tour via video chat');
}

getRequestTourButton() {
   return cy.contains('Request a tour');
}

getContactAgentButton() {
   return cy.contains('Contact agent');
}

getAskQuestionButton() {
   return cy.contains('Ask a question');
}

getDateByNumber(number) {
   return cy.contains(number).parent();
}

}

export default ListingDetails