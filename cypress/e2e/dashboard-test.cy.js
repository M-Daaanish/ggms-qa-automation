import Dashboard from "../support/pages/dashboard-page";

// 📘 Instantiate the Dashboard page object
const dashboardPage = new Dashboard();

describe("👤 Authenticated User — Dashboard Test Suite", () => {
  // 🔐 Log in before each test using fixture data and custom command
  beforeEach(() => {
    cy.visit("/sign-in");
    cy.fixture("sign-in").then((data) => {
      cy.login(data.emailAddress, data.password);
    });
  });

  // 🧾 Validate displayed user name
  it("should display the correct user name on the dashboard", () => {
    // 💡 Optional: use `contain.text` if there's formatting around the name
    dashboardPage.getUserName().should("have.text", "Danish Mustafa");
  });

  // 📦 List of sections to validate visibility
  const sections = ["Saved Properties", "Hidden Properties", "Saved Searches"];

  // 🧪 Loop through each section and test visibility
  sections.forEach((section) => {
    // Ensure user can see Saved searches, Saved properties and hidden properties options
    it(`should display the ${section} section`, () => {
      dashboardPage.getOptionCard(section).should("be.visible");
    });
  });

  // Ensure user can navigate to edit profile screen via dashboard
  it("Should allow user to navigate to edit profile screen", () => {
    dashboardPage.userProfileEditBtn();
    cy.url().should("include", "/edit-profile");
  });

  // Enusre user can see and able to perform sign-out on dashboard page
  it("Should allow user to see sign-out option", () => {
    dashboardPage.signout().should("be.visible");
  });
});

describe("🚫 Guest User — Dashboard Access Restriction", () => {
  // 🧭 Visit dashboard as a guest
  before(() => {
    dashboardPage.visit();
  });

  // 🔒 Ensure redirection to sign-in for unauthorized access
  /*it("should redirect unauthenticated user to sign-in page", () => {
    cy.url().should("include", "/sign-in");
  });*/
});
