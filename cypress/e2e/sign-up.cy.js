import Signup from "../support/pages/sign-up-page";

const signup = new Signup(); // ✅ Page Object instantiation
let signupData;

describe("Sign up test suite", () => {
  beforeEach(() => {
    // Visit the Sign-Up page before each test
    cy.visit("/sign-up");

    // Load fixture data from sign-up-form-data.json
    cy.fixture("sign-up-form-data").then((data) => {
      signupData = data;
    });
  });

  /**
   * ✅ Positive Test Case
   * User should be able to create an account with valid details
   */
  it("Allow user to create an account with valid information", () => {
    cy.generateRandomEmail().then((emailAddress) => {
      // Fill all required fields with valid data
      signup.email(emailAddress);
      signup.firstname(signupData.firstName);
      signup.lastname(signupData.lastName);
      signup.password(signupData.password);
      signup.agreementCheckBox();

      // Click on 'Create Account' and assert redirection
      signup.createAccountBtn().click();
      cy.url().should("include", "/sign-up/verify-email");

      // Log generated email for debugging/reference
      cy.log(`Account has been created for ${emailAddress}`);
    });
  });

  /**
   * ❌ First Name missing
   * Should not proceed with sign-up
   */
  it("Should not allow user to sign up when First name is empty", () => {
    cy.generateRandomEmail().then((emailAddress) => {
      signup.email(emailAddress); // Valid email
      signup.lastname(signupData.lastName); // Valid last name
      signup.password(signupData.password); // Valid password
      signup.agreementCheckBox(); // Checked agreement

      // Capture current URL and assert it doesn’t change on submission
      cy.url().then((urlBefore) => {
        signup.createAccountBtn().click();
        cy.url().should("eq", urlBefore); // 🛑 Form blocked
      });
    });
  });

  /**
   * ❌ Last Name missing
   */
  it("Should not allow user to sign up when last name is empty", () => {
    cy.generateRandomEmail().then((emailAddress) => {
      signup.email(emailAddress);
      signup.firstname(signupData.firstName); // Valid first name
      signup.password(signupData.password); // Valid password
      signup.agreementCheckBox();

      cy.url().then((urlBefore) => {
        signup.createAccountBtn().click();
        cy.url().should("eq", urlBefore); // 🛑 Submission blocked
      });
    });
  });

  /**
   * ❌ Email missing
   */
  it("Should not allow user to sign up when email address is empty", () => {
    signup.firstname(signupData.firstName);
    signup.lastname(signupData.lastName);
    signup.password(signupData.password);
    signup.agreementCheckBox();

    cy.url().then((urlBefore) => {
      signup.createAccountBtn().click();
      cy.url().should("eq", urlBefore); // 🛑 Blocked due to missing email
    });
  });

  /**
   * ❌ Password missing
   */
  it("Should not allow user to sign up when password is empty", () => {
    cy.generateRandomEmail().then((emailAddress) => {
      signup.email(emailAddress);
      signup.firstname(signupData.firstName);
      signup.lastname(signupData.lastName);
      // ❌ No password
      signup.agreementCheckBox();

      cy.url().then((urlBefore) => {
        signup.createAccountBtn().click();
        cy.url().should("eq", urlBefore); // Form should not submit
      });
    });
  });

  /**
   * ❌ Terms not agreed
   * Button should be disabled before submission
   */
  it("Should not allow user to sign up without agreeing to terms and condition", () => {
    cy.generateRandomEmail().then((emailAddress) => {
      signup.email(emailAddress);
      signup.firstname(signupData.firstName);
      signup.lastname(signupData.lastName);
      signup.password(signupData.password);
      // ❌ No agreement checkbox checked
      // Capture current URL and assert it doesn’t change on submission
      cy.url().then((urlBefore) => {
        signup.createAccountBtn().click();
        cy.url().should("eq", urlBefore); // 🛑 Form blocked
      });
    });
  });
});
