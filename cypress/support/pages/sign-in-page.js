// Class representing the Sign In Page
class SignInPage {
    
    // Elements - Methods to get various elements on the sign-in page
    
    // Returns the email input field
    getUsernameField() {
        return cy.get('input[type="email"]');
    }

    // Returns the password input field
    getPasswordField() {
        return cy.get('input[placeholder="Password"]');
    }

    // Returns the login button
    getLoginButton() {
        return cy.get('#login-btn');
    }

    // Returns the error message element
    getErrorMessage() {
        return cy.get('.toast.warning > h5');
    }

    // Returns the 'Remember Me' checkbox
    getRememberMeCheckbox() {
        return cy.get('input[id="remember-me-checkbox"]');
    }

    // Returns the 'Forgot Password' link
    getForgotPasswordLink() {
        return cy.get('.btnrecover');
    }

    // Returns the eye button for password visibility toggle
    getPasswordEyeButton(){
        return cy.get('.showpass');
    }

    // Actions - Methods to perform actions on the sign-in page
    
    // Navigates to the login page
    visit() {
        cy.visit('/login');
    }

    // Performs login with provided username and password
    login(username, password) {
        this.getUsernameField().type(username);
        this.getPasswordField().type(password);
        this.getLoginButton().click();
    }
}

// Exporting the SignInPage class for reuse
export default SignInPage;
