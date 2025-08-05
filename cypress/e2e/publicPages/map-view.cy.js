// Importing Page Objects to separate UI logic for reusability and maintainability
import MapPage from "../../support/pages/publicPages/property-map-view-page";
import PropertySharedElements from "../../support/pages/publicPages/property-shared-elements";

// Instantiating Page Object classes
const sharedElements = new PropertySharedElements();
const mapPage = new MapPage();

describe("🗺️ Map View — Test Suite", () => {
  // Hook to run before each test case
  // Navigates to the listings page and switches to map view
  beforeEach(() => {
    cy.visit("/listings"); // Visit listings page
    sharedElements.mapToggle(); // Toggle to map view
  });

  // ✅ Test Case: Verify that map view is displayed when user toggles from list view
  it("should display the map view when user toggles from list view", () => {
    mapPage.mapView().should("be.visible"); // Assert that the map view is visible
  });

  // ✅ Test Case: Search for a location and verify markers and boundary are rendered
  it('should search for "Orlando" and display property markers inside the boundary', () => {
    sharedElements.typeLocation("Orlando"); // Enter location into search field

    // Verify that property markers are visible and there is at least one result
    mapPage
      .propertyMarkers()
      .should("exist") // At least one marker exists
      .and("have.length.at.least", 1) // Ensure there's at least one marker
      .and("be.visible"); // Ensure markers are visible

    // Verify that boundary polygon is drawn around the searched area
    mapPage.boundaryPolygon().should("exist"); // Assert that boundary is present
  });
});
