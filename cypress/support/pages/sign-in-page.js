// ✅ Class representing the Sign-In Page
class SignInPage {
    /**
     * ============================
     * ELEMENT GETTERS
     * ============================
     * These methods return elements on the sign-in page
     */
  
    // 📧 Email input field
    getUsernameField() {
      return cy.get('input[type="email"]')
    }
  
    // 🔒 Password input field
    getPasswordField() {
      return cy.get('input[placeholder="Password"]');
    }
  
    // 🔘 Login button
    getLoginButton() {
      return cy.get('#login-btn');
    }
  
    // ⚠️ Toast error message (e.g., incorrect login)
    getErrorMessage() {
      return cy.get('.toast.warning > h5');
    }
  
    // ☑️ "Remember Me" checkbox
    getRememberMeCheckbox() {
      return cy.get('input[id="remember-me-checkbox"]');
    }
  
    // 🔗 "Forgot Password" link
    getForgotPasswordLink() {
      return cy.get('.btnrecover');
    }
  
    // 👁️ Password visibility toggle (eye icon)
    getPasswordEyeButton() {
      return cy.get('.showpass');
    }
  
    // 🔐 Google OAuth login button
    getGoogleAccountButton() {
      return cy.get('#google_oauth');
    }
  
    /**
     * ============================
     * PAGE ACTIONS
     * ============================
     * These methods perform actions on the sign-in page
     */
  
    // 🚪 Navigate to the Sign-In page
    visit() {
      cy.visit('/sign-in');
    }
  
    // 🔐 Log in using username and password
    login(username, password) {
      this.getUsernameField().type(username);
      this.getPasswordField().type(password);
      this.getLoginButton().click();
    }
  }
  
  // Export the SignInPage class for reuse in test specs
  export default SignInPage;
  