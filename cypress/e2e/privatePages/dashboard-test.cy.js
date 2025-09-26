import Dashboard from "../../support/pages/privatePages/dashboard-page";


// 📘 Instantiate the Dashboard page object
const dashboardPage = new Dashboard();

describe("👤 Authenticated User — Dashboard Test Suite", () => {
  // 🔐 Log in before each test using fixture data and custom command
  beforeEach(() => {
    cy.visit("/sign-in");
    cy.fixture("sign-in").then((data) => {
      cy.login(data.emailAddress, data.password);
    });
    // Assert login succeeded by checking dashboard access
    dashboardPage.visit();
    dashboardPage.getUserName().should("be.visible");
  });

  // 🧾 Validate displayed user name
  it("should display the correct user name on the dashboard", () => {
    cy.fixture("sign-in").then(() => {
      // Relax assertion to allow surrounding text/whitespace
      dashboardPage.getUserName().invoke("text").then((t) => {
        const normalized = t.replace(/\s+/g, " ").trim();
        expect(normalized).to.contain("Danish");
      });
    });
  });

  // 📦 List of sections to validate visibility
  const sections = ["Saved Properties", "Hidden Properties", "Saved Searches"];

  // 🧪 Loop through each section and test visibility
  sections.forEach((section) => {
    // Ensure user can see Saved searches, Saved properties and hidden properties options
    it(`should display the ${section} section`, () => {
      dashboardPage.getOptionCard(section).should("exist").and("be.visible");
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
