import SignInPage from "../support/pages/sign-in-page";

// 🧪 Test suite for Sign-In functionality
describe("GGMS - SIGN IN TEST SUITE", () => {
  const signInPage = new SignInPage();
  let userData;

  // Load fixture & visit sign-in before each test
  beforeEach(() => {
    signInPage.visit();
    cy.fixture("sign-in").then((data) => {
      userData = data;
    });
  });

  /**
   * =============================
   * 🔐 POSITIVE TEST CASES
   * =============================
   */

   it(' ✅  Should send correct login request', () => {
    cy.intercept('POST', '**/auth/login', {
      statusCode: 200,
      body: {
        token: 'mocked_token_123',
        user: {
          email: userData.emailAddress,
          password: userData.password,
          rememberMe: false,
          tokenRedirect: false
        }
      }
    }).as('loginRequest');
    signInPage.login(userData.emailAddress, userData.password)

    cy.wait('@loginRequest').its('request.body').should('include', {
      email: userData.emailAddress,
      password: userData.password
    });
  });

  it("✅ Should login and redirect to dashboard", () => {
    signInPage.login(userData.emailAddress, userData.password);
    cy.url().should("include", "/dashboard");
  });

  /**
   * =============================
   * ❌ NEGATIVE TEST CASES
   * =============================
   */

  it("❌ User should not be allowed to login with an invalid email address format", () => {
    signInPage.login(userData.invalidEmailAddress, userData.password);
    signInPage
      .getErrorMessage()
      .should("have.text", " Email must be an email");
  });

  it("❌ User should not be allowed to login with an incorrect password", () => {
    signInPage.login(userData.emailAddress, userData.incorrectPassword);
    signInPage
      .getErrorMessage()
      .should("have.text", " Incorrect email or password. Please try again.");
  });

  it("❌ User should not be allowed to login with an incorrect email address", () => {
    signInPage.login(userData.incorrectEmailAddress, userData.password);
    signInPage
      .getErrorMessage()
      .should("have.text", " Incorrect email or password. Please try again.");
  });

  it("❌ User should not be allowed to login without a password", () => {
    signInPage.getUsernameField().type(userData.emailAddress);
    signInPage.getLoginButton().click();
    signInPage
      .getErrorMessage()
      .should("have.text", " Email and password are required");
  });

  /**
   * =============================
   * 🔎 UI & ACCESSORY CHECKS
   * =============================
   */

  /*it("👁️ Verify hide/unhide password toggle", () => {
    signInPage.getPasswordField().should("have.attr", "type", "password");
    signInPage.getPasswordEyeButton().click();
    signInPage.getPasswordField().should("have.attr", "type", "text");
  });*/

  it("🔗 Verify 'Recover Password' button visibility and text", () => {
    signInPage
      .getForgotPasswordLink()
      .should("be.visible")
      .invoke("text")
      .then((btnText) => {
        expect(btnText.trim()).to.eq("Recover Password");
      });
  });

  it("🔒 Verify Google account button visibility", () => {
    signInPage.getGoogleAccountButton().should("be.visible");
  });

  it("➡️ Verify navigation to 'Recover Password' page", () => {
    signInPage.getForgotPasswordLink().click();
    cy.url().should("include", "/recover-password");
  });
});
