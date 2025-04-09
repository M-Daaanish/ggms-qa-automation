
class Signup {

    visit() {
        cy.visit('/sign-up')
    }

firstname(fname) {
    cy.get('input[placeholder="First Name"]').type(fname)
}

lastname(lname) {
    cy.get('input[placeholder="Last Name"]').type(lname)
}

email(emailAddress) { 
    cy.get('input[placeholder="Email"]').type(emailAddress)
}

password(password) {
    cy.get('input[placeholder="Password"]').type(password)
}

agreementCheckBox() {
    return cy.get('.form__checkbox > label').find('.form__checkmark').click();
}

createAccountBtn() {
    return cy.get('#register-btn').click();
}

resendEmailBtn() {
    return cy.get('#verify-email-btn', {timeout: 60000})
}

}

export default Signup