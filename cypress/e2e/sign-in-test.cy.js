import { sign } from "crypto";
import { hasUncaughtExceptionCaptureCallback } from "process";
import SignInPage from "../support/pages/sign-in-page";

// Test suite for Sign In functionality
describe("GGMS - SIGN IN TEST SUIT", () => {
  // Creating an instance of the SignInPage class
  let signInPage = new SignInPage();
  // Variable to store user data from fixture
  let userData;

  beforeEach(() => {
    // Visiting the sign-in page before each test
    signInPage.visit()
    // Loading user data from fixture
    cy.fixture("sign-in").then((data) => {
      userData = data;
    });
  });

  // Attempting login with valid credentials

  it("User should be able to login successfully", () => {
    // Entering email address and password
    signInPage.login(userData.emailAddress, userData.password);
    // Verifying successful navigation to the dashboard
    cy.url().should("include", "/dashboard");
  });

  // Attempting login with invalid email address and valid password
  it("User should not be allowed to login with an invalid email address", () => {
    // Entering invalid email and valid password
    signInPage.login(userData.invalidEmailAddress, userData.password);
    // Checking error message
    signInPage.getErrorMessage().should("have.text", " Email must be an email");
  });

  // Attempting login with valid email address and incoreect password
  it("User should not be allowed to login with an incorrect password", () => {
    // Entering invalid email and valid password
    signInPage.login(userData.emailAddress, userData.incorrectPassword);
    // Checking error message
    signInPage
      .getErrorMessage()
      .should("have.text", " Incorrect email or password. Please try again.");
  });

  // Attempting login with incorrect email address and valid password

  it("User should not be allowed to login with an incorrect email address", () => {
    signInPage.login(userData.incorrectEmailAddress, userData.password);
    // Checking error message
    signInPage
      .getErrorMessage()
      .should("have.text", " Incorrect email or password. Please try again.");
  });

  // Attempting login without providing password

  it("User should not be allowed to login without a password", () => {
    // Entering valid email
    signInPage.getUsernameField().type(userData.emailAddress);
    // Clicking login button without entering password
    signInPage.getLoginButton().click();
    // Checking error message
    signInPage
      .getErrorMessage()
      .should("have.text", " Email and password are required");
  });

  // Verify hide & unhide password option on password input field
  it("Verify hide/unhide password", () => {
    // Checking password field is initially masked
    signInPage.getPasswordField().should("have.attr", "type", "password");
    // Clicking eye icon to toggle visibility
    signInPage.getPasswordEyeButton().click();
    // Checking password field is now visible
    signInPage.getPasswordField().should("have.attr", "type", "text");
  });

  // Verify recover password visibility and text
  it("Verify recover password in sign-in", () => {
    signInPage
      .getForgotPasswordLink()
      .should("be.visible")
      .invoke("text")
      .then((buttonTxt) => {
        // Trimming the text as DOM element is containing empty spacing
        const trimmedBtnTxt = buttonTxt.trim();
        // Apply assertion on button text
        expect(trimmedBtnTxt).to.eq("Recover Password");
      });
  });

  // Verify Google account button visibility
  it("Verify google account button visibility", () => {

    // Get google account button and check it's visibility
    signInPage.getGoogleAccountButton().should("be.visible");
    
  });

  // Verify user navigation to recover password screen
  it("Verify user navigation to recover password screen", () => {
    // Clicking on recover password option on sign-in page
    signInPage.getForgotPasswordLink().click();
    // Getting current url and applying assertion on it
    cy.url().should("include", "/recover-password");
  });
});
