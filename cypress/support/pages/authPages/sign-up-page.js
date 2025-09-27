
class Signup {

    visit() {
        cy.visit('/sign-up')
    }

firstname(fname) {
    cy.get('input[name="ShortTextElement_item_1"]').type(fname)
}

lastname(lname) {
    cy.get('input[name="ShortTextElement_item_2"]').type(lname)
}

email(emailAddress) { 
    cy.get('#EmailElement_item_1').type(emailAddress)
}

password(password) {
    cy.get('#PasswordElement_item_2').type(password)
}

agreementCheckBox() {
    return cy.get('.form__cbcontainer > label').find('.form__checkmark').click();
}

createAccountBtn() {
    return cy.get('.btnPrimary');
}

resendEmailBtn() {
    return cy.get('#verify-email-btn', {timeout: 60000})
}

}

export default Signup