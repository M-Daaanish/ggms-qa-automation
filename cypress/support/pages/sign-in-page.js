class SignInPage {
    // Elements
    getUsernameField() {
        return cy.get('[input[type="email"]]');
    }

    getPasswordField() {
        return cy.get('input[type="password"]');
    }

    getLoginButton() {
        return cy.get('button[type="submit"]');
    }

    getErrorMessage() {
        return cy.get('[data-test="error"]');
    }

    getRememberMeCheckbox() {
        return cy.get('input[id="remember-me-checkbox"]');
    }

    getForgotPasswordLink() {
        return cy.get('.btnrecover');
    }

    

    // Actions
    visit() {
        cy.visit('/login');
    }

    login(username, password) {
        this.getUsernameField().type(username);
        this.getPasswordField().type(password);
        this.getLoginButton().click();
    }
}

export default SignInPage;