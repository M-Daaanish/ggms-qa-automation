/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./cypress/support/pages/privatePages/saved-properties-page.js":
/*!*********************************************************************!*\
  !*** ./cypress/support/pages/privatePages/saved-properties-page.js ***!
  \*********************************************************************/
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
class SavedPropertiesPage {
  newList() {
    return cy.get('.newlistbtn');
  }
  addListName(listname) {
    cy.get('#user-new-fav-collection').type(listname);
  }
  makeListprimaryCheck() {
    return cy.get('label > span.form__checkmark').click();
  }
  saveNewList() {
    return cy.get('#add-new-list', {
      timeout: 100000
    }).click({
      force: true
    });
  }
  favoriteListTitle(listname) {
    return cy.get('.aptcard__content--heading > h4', {
      timeout: 100000
    }).contains({
      listname
    });
  }
  getPrimaryList() {
    return cy.contains('.aptcard__tag h5', 'Primary List').click();
  }
}
var _default = exports["default"] = SavedPropertiesPage;
module.exports = exports.default;

/***/ }),

/***/ "./cypress/support/pages/publicPages/property-list-view-page.js":
/*!**********************************************************************!*\
  !*** ./cypress/support/pages/publicPages/property-list-view-page.js ***!
  \**********************************************************************/
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
class ListingPage {
  // ✅ Navigate to the listings page
  visit() {
    cy.visit("/listings");
  }

  // ✅ Get property listing cards
  list() {
    return cy.get(".searchresult__row");
  }

  // Get specific card based on address 
  getListingCard(address) {
    // return cy.get('.aptcard.mv > .aptcard__content > .aptcard__content--address > p')
    cy.get('.aptcard.mv', {
      timeout: 10000
    }).should('exist');
    return cy.contains('.aptcard__content .aptcard__content--address p', address).closest('.aptcard.mv');
  }

  // Get and click heart icon 

  clickHeartIcon(address) {
    this.getListingCard(address).as('selectedCard');
    cy.get('@selectedCard').find('a[class*="favbtn"]').should('be.visible').click();
  }

  // Get favorite marked heart icon 

  getFavoriteMarkedHeartIcon(address) {
    this.getListingCard(address).as('selectedCard');
    return cy.get('@selectedCard').find('.aptcard__content--save.favbtn.popup-clickables.active');
  }
}
var _default = exports["default"] = ListingPage;
module.exports = exports.default;

/***/ }),

/***/ "./cypress/support/pages/publicPages/property-shared-elements.js":
/*!***********************************************************************!*\
  !*** ./cypress/support/pages/publicPages/property-shared-elements.js ***!
  \***********************************************************************/
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
class PropertySharedElements {
  // ✅ Get the property address element
  propertyAddress() {
    return cy.get(".aptcard__content--address", {
      timeout: 10000
    });
  }

  // 🛠 Click on the 'All Filters' button
  // Consider parameterizing this if there are multiple filter buttons
  allFiltersButton() {
    return cy.get(".filter-toggle").click({
      force: true
    });
  }

  // 🛠 Search and select a location from the suggestions
  // Consider waiting for suggestions to appear or make this more dynamic
  typeLocation(location) {
    cy.get(".form__search.autosearch").eq(1).type(location, {
      force: true
    });
    cy.get(".omnisearch__cityaddress.check").find("div > ul > li > div > span").contains(location) // ✅ only `.contains()` is enough; no need for `.eq(1)`
    .click();
  }

  // ✅ Click on the favorite (save) icon on a listing
  clickFavoriteIcon() {
    return cy.get(".aptcard__content--save.favbtn.popup-clickables > span > svg").eq(1).click();
  }

  // ✅ Get the sign-in modal when an action requires authentication
  signInModalBox() {
    return cy.get('div[data-elementor-type="popup"]');
  }

  // ✅ Get all pagination numbers
  paginationNumber() {
    return cy.get(".pagination__list > li > a");
  }

  // ✅ Get the 'Next' button in pagination
  nextButton() {
    return cy.get('.pagination__list > li > a > span[class="icon"]', {
      timeout: 5000
    });
  }

  // ✅ Get the currently active page in pagination
  activePage() {
    return cy.get(".pagination__list > li > a.active", {
      timeout: 5000
    });
  }

  // 🛠 Navigate to the last page by iterating through pagination
  // This is clever — nice job avoiding infinite loops!
  navToLastPage() {
    let previousPages = new Set();
    const goToLastPage = () => {
      this.activePage().invoke("text").then(currentPage => {
        if (previousPages.has(currentPage)) {
          cy.log("Reached the last page, stopping navigation.");
          return;
        }
        previousPages.add(currentPage);
        this.nextButton().then($next => {
          if ($next.length === 0) {
            cy.log("No more pages left to navigate.");
            return;
          }
          cy.wrap($next).last().click(); // ✅ Always use `.last()` for robustness
          cy.wait(500); // 🛠 Consider using `cy.intercept()` for API wait instead
          goToLastPage(); // 🔁 Recursive call
        });
      });
    };
    goToLastPage(); // 🔁 Kickstart recursion
  }

  // 🛠 Select a sorting option from dropdown
  sortOption(option) {
    cy.get(".searchresult__header--heading--sorting").click();
    cy.get(`.csselect-wrapper > div > .custom-options > span[data-value='${option}']`).click();
  }

  // ✅ Get selected value from sorting dropdown
  getSortedValue() {
    return cy.get(".csselect.focus > span");
  }

  // ✅ Get 'no property found' message
  noPropertyMessage() {
    return cy.get(".no-results-message");
  }

  // 🛠 Click on map view toggle
  mapToggle() {
    return cy.get("#map-list-switch > label").contains("Map").click(); // 🔁 Added .click()
  }

  // 🛠 Click on list view toggle
  listToggle() {
    return cy.get("#map-list-switch > label").contains("List").click(); // 🔁 Added .click()
  }

  // Click save search button 
  saveSearch() {
    return cy.get(".saved-search-btn-default").click();
  }

  // Get Saved Search Text
  savedSearchText() {
    return cy.get('.saved-search-btn-default.active').invoke('text');
  }
}
var _default = exports["default"] = PropertySharedElements;
module.exports = exports.default;

/***/ }),

/***/ "../../Library/Caches/Cypress/14.0.3/Cypress.app/Contents/Resources/app/node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!*******************************************************************************************************************************************!*\
  !*** ../../Library/Caches/Cypress/14.0.3/Cypress.app/Contents/Resources/app/node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \*******************************************************************************************************************************************/
/***/ ((module) => {

function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    "default": e
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*************************************************!*\
  !*** ./cypress/e2e/publicPages/list-view.cy.js ***!
  \*************************************************/


var _interopRequireDefault = __webpack_require__(/*! ../../Library/Caches/Cypress/14.0.3/Cypress.app/Contents/Resources/app/node_modules/@babel/runtime/helpers/interopRequireDefault.js */ "../../Library/Caches/Cypress/14.0.3/Cypress.app/Contents/Resources/app/node_modules/@babel/runtime/helpers/interopRequireDefault.js");
var _propertyListViewPage = _interopRequireDefault(__webpack_require__(/*! ../../support/pages/publicPages/property-list-view-page */ "./cypress/support/pages/publicPages/property-list-view-page.js"));
var _propertySharedElements = _interopRequireDefault(__webpack_require__(/*! ../../support/pages/publicPages/property-shared-elements */ "./cypress/support/pages/publicPages/property-shared-elements.js"));
var _savedPropertiesPage = _interopRequireDefault(__webpack_require__(/*! ../../support/pages/privatePages/saved-properties-page */ "./cypress/support/pages/privatePages/saved-properties-page.js"));
const listingPage = new _propertyListViewPage.default(); // ✅ Great: POM instance declared once
const sharedElements = new _propertySharedElements.default();
const savedProperties = new _savedPropertiesPage.default();
let listingPageData;
describe("🏠 Listing Page Test Suite", () => {
  beforeEach(() => {
    listingPage.visit(); // ✅ Consistent entry point

    cy.fixture("listing-page-data").then(data => {
      listingPageData = data;
    });
    Cypress.on("uncaught:exception", () => false); //  Use this sparingly – ideally catch known errors directly
  });
  it("should display listings based on the location selected by the user", () => {
    // ✅ Intercept declared before triggering
    cy.intercept('POST', '**/public/listings*').as('getListingsForSearch');
    sharedElements.typeLocation(listingPageData.propertyLocation);
    cy.wait('@getListingsForSearch'); // ✅ Essential for stability

    sharedElements.propertyAddress().should('have.length.greaterThan', 0) // ✅ Good practice to avoid false positives
    .each($address => {
      const addressText = $address.text().toLowerCase();
      expect(addressText).to.include(listingPageData.propertyLocation.toLowerCase());
    });
  });

  ///it("should navigate to the last page using pagination controls", () => {
  //cy.intercept('POST', '**/public/listings*').as('getListingsForSearch');

  /*sharedElements.typeLocation(listingPageData.propertyLocation);
  
  cy.wait('@getListingsForSearch');
   sharedElements.navToLastPage();
   sharedElements.activePage()
    .invoke("text")
    .then((activePageText) => {
      expect(Number(activePageText)).to.be.greaterThan(1); // ✅ Logical and flexible
    });
  });*/

  it("should sort listings based on the selected sort option", () => {
    sharedElements.sortOption(listingPageData.sortValue); // ✅ Should internally trigger listing reload

    sharedElements.getSortedValue().should("be.visible").invoke("text").then(selectedText => {
      const trimmed = selectedText.trim();
      expect(trimmed).to.eq(listingPageData.selectedSortValue); // ✅ Data-driven + semantic
    });
  });
  it("should show sign-in modal when a guest user tries to favorite a listing", () => {
    sharedElements.clickFavoriteIcon();
    sharedElements.signInModalBox().should("exist").and("be.visible"); // ✅ Checks both existence and visibility
  });
  it("Should not allow guest user to save search", () => {
    sharedElements.saveSearch();
    sharedElements.signInModalBox().should("exist").and("be.visible"); // ✅ Good UI validation
  });
});
describe("Listing Page - Logged-In User", () => {
  beforeEach(() => {
    cy.visitSignIn();
    cy.fixture("listing-page-data").then(data => {
      listingPageData = data;
    });
    cy.fixture("sign-in").then(data => {
      cy.login(data.emailAddress, data.password); // ✅ Custom login command = good abstraction
    });
    cy.visit("/listings"); // ✅ Post-login redirection check
  });
  it("Should allow the user to save search with location", () => {
    sharedElements.typeLocation(listingPageData.propertyLocation);
    sharedElements.saveSearch();
    sharedElements.savedSearchText().then(text => {
      let savedSearchText = text.trim();
      expect(savedSearchText).to.be.eq("Search saved"); // ✅ Text-based confirmation
    });
  });
  it("Should allow user to mark the listing as favorite", () => {
    listingPage.clickHeartIcon(listingPageData.listingAddress); // ✅ POM for targeting by address

    listingPage.getFavoriteMarkedHeartIcon(listingPageData.listingAddress).should('be.visible');
    cy.visit('/saved-properties');
    savedProperties.getPrimaryList();
    listingPage.getFavoriteMarkedHeartIcon(listingPageData.listingAddress).should('be.visible'); // 
  });
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LFVBQVUsQ0FBQyxDQUFDO0lBQzNCUSxjQUFjLENBQUNQLGVBQWUsQ0FBQyxDQUFDLENBQUNqQixJQUFJLENBQUV1QyxJQUFJLElBQUs7TUFDOUMsSUFBSXRCLGVBQWUsR0FBR3NCLElBQUksQ0FBQ1EsSUFBSSxDQUFDLENBQUM7TUFDakNOLE1BQU0sQ0FBQ3hCLGVBQWUsQ0FBQyxDQUFDeUIsRUFBRSxDQUFDWSxFQUFFLENBQUNqRSxFQUFFLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztJQUNwRCxDQUFDLENBQUM7RUFDSixDQUFDLENBQUM7RUFFRjRDLEVBQUUsQ0FBQyxtREFBbUQsRUFBRSxNQUFNO0lBQzVEVixXQUFXLENBQUMzQyxjQUFjLENBQUM4QyxlQUFlLENBQUM2QixjQUFjLENBQUMsQ0FBQyxDQUFDOztJQUU1RGhDLFdBQVcsQ0FBQ3hDLDBCQUEwQixDQUFDMkMsZUFBZSxDQUFDNkIsY0FBYyxDQUFDLENBQ25FN0UsTUFBTSxDQUFDLFlBQVksQ0FBQztJQUNyQnRCLEVBQUUsQ0FBQ2tCLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQztJQUM3Qm1ELGVBQWUsQ0FBQ3pELGNBQWMsQ0FBQyxDQUFDO0lBQ2hDdUQsV0FBVyxDQUFDeEMsMEJBQTBCLENBQUMyQyxlQUFlLENBQUM2QixjQUFjLENBQUMsQ0FDckU3RSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztFQUczQixDQUFDLENBQUM7QUFDSixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2dnbXN0ZXN0YXV0b21hdGlvbi8uL2N5cHJlc3Mvc3VwcG9ydC9wYWdlcy9wcml2YXRlUGFnZXMvc2F2ZWQtcHJvcGVydGllcy1wYWdlLmpzIiwid2VicGFjazovL2dnbXN0ZXN0YXV0b21hdGlvbi8uL2N5cHJlc3Mvc3VwcG9ydC9wYWdlcy9wdWJsaWNQYWdlcy9wcm9wZXJ0eS1saXN0LXZpZXctcGFnZS5qcyIsIndlYnBhY2s6Ly9nZ21zdGVzdGF1dG9tYXRpb24vLi9jeXByZXNzL3N1cHBvcnQvcGFnZXMvcHVibGljUGFnZXMvcHJvcGVydHktc2hhcmVkLWVsZW1lbnRzLmpzIiwid2VicGFjazovL2dnbXN0ZXN0YXV0b21hdGlvbi8uLi8uLi9MaWJyYXJ5L0NhY2hlcy9DeXByZXNzLzE0LjAuMy9DeXByZXNzLmFwcC9Db250ZW50cy9SZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdC5qcyIsIndlYnBhY2s6Ly9nZ21zdGVzdGF1dG9tYXRpb24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZ2dtc3Rlc3RhdXRvbWF0aW9uLy4vY3lwcmVzcy9lMmUvcHVibGljUGFnZXMvbGlzdC12aWV3LmN5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuY2xhc3MgU2F2ZWRQcm9wZXJ0aWVzUGFnZSB7XG5cblxubmV3TGlzdCgpIHtcbiAgICByZXR1cm4gY3kuZ2V0KCcubmV3bGlzdGJ0bicpO1xufVxuXG5cbmFkZExpc3ROYW1lKGxpc3RuYW1lKSB7XG4gICAgIGN5LmdldCgnI3VzZXItbmV3LWZhdi1jb2xsZWN0aW9uJykudHlwZShsaXN0bmFtZSk7XG59XG5cbm1ha2VMaXN0cHJpbWFyeUNoZWNrKCkge1xuICAgIHJldHVybiBjeS5nZXQoJ2xhYmVsID4gc3Bhbi5mb3JtX19jaGVja21hcmsnKS5jbGljaygpO1xufVxuXG5zYXZlTmV3TGlzdCgpIHtcbiAgICByZXR1cm4gIGN5LmdldCgnI2FkZC1uZXctbGlzdCcsIHt0aW1lb3V0OiAxMDAwMDB9KS5jbGljayh7Zm9yY2U6dHJ1ZX0pO1xufVxuXG5mYXZvcml0ZUxpc3RUaXRsZShsaXN0bmFtZSkge1xuICAgIHJldHVybiBjeS5nZXQoJy5hcHRjYXJkX19jb250ZW50LS1oZWFkaW5nID4gaDQnLCB7dGltZW91dDogMTAwMDAwfSkuY29udGFpbnMoe2xpc3RuYW1lfSlcbn1cblxuZ2V0UHJpbWFyeUxpc3QoKSB7XG4gICAgcmV0dXJuIGN5LmNvbnRhaW5zKCcuYXB0Y2FyZF9fdGFnIGg1JywgJ1ByaW1hcnkgTGlzdCcpLmNsaWNrKCk7XG59XG5cblxuXG59IFxuXG5leHBvcnQgZGVmYXVsdCBTYXZlZFByb3BlcnRpZXNQYWdlIiwiY2xhc3MgTGlzdGluZ1BhZ2Uge1xuICAvLyDinIUgTmF2aWdhdGUgdG8gdGhlIGxpc3RpbmdzIHBhZ2VcbiAgdmlzaXQoKSB7XG4gICAgY3kudmlzaXQoXCIvbGlzdGluZ3NcIik7XG4gIH1cblxuICAvLyDinIUgR2V0IHByb3BlcnR5IGxpc3RpbmcgY2FyZHNcbiAgbGlzdCgpIHtcbiAgICByZXR1cm4gY3kuZ2V0KFwiLnNlYXJjaHJlc3VsdF9fcm93XCIpO1xuICB9XG5cbiAgLy8gR2V0IHNwZWNpZmljIGNhcmQgYmFzZWQgb24gYWRkcmVzcyBcbiAgZ2V0TGlzdGluZ0NhcmQoYWRkcmVzcykge1xuICAgLy8gcmV0dXJuIGN5LmdldCgnLmFwdGNhcmQubXYgPiAuYXB0Y2FyZF9fY29udGVudCA+IC5hcHRjYXJkX19jb250ZW50LS1hZGRyZXNzID4gcCcpXG4gICBjeS5nZXQoJy5hcHRjYXJkLm12JywgeyB0aW1lb3V0OiAxMDAwMCB9KS5zaG91bGQoJ2V4aXN0Jyk7IFxuICByZXR1cm4gIGN5LmNvbnRhaW5zKCcuYXB0Y2FyZF9fY29udGVudCAuYXB0Y2FyZF9fY29udGVudC0tYWRkcmVzcyBwJywgYWRkcmVzcykuY2xvc2VzdCgnLmFwdGNhcmQubXYnKTtcbiAgfVxuXG4gIC8vIEdldCBhbmQgY2xpY2sgaGVhcnQgaWNvbiBcblxuICBjbGlja0hlYXJ0SWNvbihhZGRyZXNzKSB7XG4gICAgdGhpcy5nZXRMaXN0aW5nQ2FyZChhZGRyZXNzKS5hcygnc2VsZWN0ZWRDYXJkJylcblxuICAgIGN5LmdldCgnQHNlbGVjdGVkQ2FyZCcpLmZpbmQoJ2FbY2xhc3MqPVwiZmF2YnRuXCJdJykuc2hvdWxkKCdiZS52aXNpYmxlJykuY2xpY2soKTtcbiAgfVxuXG4gIC8vIEdldCBmYXZvcml0ZSBtYXJrZWQgaGVhcnQgaWNvbiBcblxuICBnZXRGYXZvcml0ZU1hcmtlZEhlYXJ0SWNvbihhZGRyZXNzKSB7XG4gICAgdGhpcy5nZXRMaXN0aW5nQ2FyZChhZGRyZXNzKS5hcygnc2VsZWN0ZWRDYXJkJylcblxuICAgIHJldHVybiBjeS5nZXQoJ0BzZWxlY3RlZENhcmQnKS5maW5kKCcuYXB0Y2FyZF9fY29udGVudC0tc2F2ZS5mYXZidG4ucG9wdXAtY2xpY2thYmxlcy5hY3RpdmUnKVxuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGlzdGluZ1BhZ2U7XG4iLCJjbGFzcyBQcm9wZXJ0eVNoYXJlZEVsZW1lbnRzIHtcblxuXG4gIC8vIOKchSBHZXQgdGhlIHByb3BlcnR5IGFkZHJlc3MgZWxlbWVudFxuICBwcm9wZXJ0eUFkZHJlc3MoKSB7XG4gICAgcmV0dXJuIGN5LmdldChcIi5hcHRjYXJkX19jb250ZW50LS1hZGRyZXNzXCIsIHsgdGltZW91dDogMTAwMDAgfSk7XG4gIH1cblxuICAvLyDwn5ugIENsaWNrIG9uIHRoZSAnQWxsIEZpbHRlcnMnIGJ1dHRvblxuICAvLyBDb25zaWRlciBwYXJhbWV0ZXJpemluZyB0aGlzIGlmIHRoZXJlIGFyZSBtdWx0aXBsZSBmaWx0ZXIgYnV0dG9uc1xuICBhbGxGaWx0ZXJzQnV0dG9uKCkge1xuICAgIHJldHVybiBjeS5nZXQoXCIuZmlsdGVyLXRvZ2dsZVwiKS5jbGljayh7IGZvcmNlOiB0cnVlIH0pO1xuICB9XG5cbiAgLy8g8J+boCBTZWFyY2ggYW5kIHNlbGVjdCBhIGxvY2F0aW9uIGZyb20gdGhlIHN1Z2dlc3Rpb25zXG4gIC8vIENvbnNpZGVyIHdhaXRpbmcgZm9yIHN1Z2dlc3Rpb25zIHRvIGFwcGVhciBvciBtYWtlIHRoaXMgbW9yZSBkeW5hbWljXG4gIHR5cGVMb2NhdGlvbihsb2NhdGlvbikge1xuICAgIGN5LmdldChcIi5mb3JtX19zZWFyY2guYXV0b3NlYXJjaFwiKS5lcSgxKS50eXBlKGxvY2F0aW9uLCB7IGZvcmNlOiB0cnVlIH0pO1xuICAgIGN5LmdldChcIi5vbW5pc2VhcmNoX19jaXR5YWRkcmVzcy5jaGVja1wiKVxuICAgICAgLmZpbmQoXCJkaXYgPiB1bCA+IGxpID4gZGl2ID4gc3BhblwiKVxuICAgICAgLmNvbnRhaW5zKGxvY2F0aW9uKSAvLyDinIUgb25seSBgLmNvbnRhaW5zKClgIGlzIGVub3VnaDsgbm8gbmVlZCBmb3IgYC5lcSgxKWBcbiAgICAgIC5jbGljaygpO1xuICB9XG5cbiAgLy8g4pyFIENsaWNrIG9uIHRoZSBmYXZvcml0ZSAoc2F2ZSkgaWNvbiBvbiBhIGxpc3RpbmdcbiAgY2xpY2tGYXZvcml0ZUljb24oKSB7XG4gICAgcmV0dXJuIGN5XG4gICAgICAuZ2V0KFwiLmFwdGNhcmRfX2NvbnRlbnQtLXNhdmUuZmF2YnRuLnBvcHVwLWNsaWNrYWJsZXMgPiBzcGFuID4gc3ZnXCIpXG4gICAgICAuZXEoMSlcbiAgICAgIC5jbGljaygpO1xuICB9XG5cbiAgLy8g4pyFIEdldCB0aGUgc2lnbi1pbiBtb2RhbCB3aGVuIGFuIGFjdGlvbiByZXF1aXJlcyBhdXRoZW50aWNhdGlvblxuICBzaWduSW5Nb2RhbEJveCgpIHtcbiAgICByZXR1cm4gY3kuZ2V0KCdkaXZbZGF0YS1lbGVtZW50b3ItdHlwZT1cInBvcHVwXCJdJyk7XG4gIH1cblxuICAvLyDinIUgR2V0IGFsbCBwYWdpbmF0aW9uIG51bWJlcnNcbiAgcGFnaW5hdGlvbk51bWJlcigpIHtcbiAgICByZXR1cm4gY3kuZ2V0KFwiLnBhZ2luYXRpb25fX2xpc3QgPiBsaSA+IGFcIik7XG4gIH1cblxuICAvLyDinIUgR2V0IHRoZSAnTmV4dCcgYnV0dG9uIGluIHBhZ2luYXRpb25cbiAgbmV4dEJ1dHRvbigpIHtcbiAgICByZXR1cm4gY3kuZ2V0KCcucGFnaW5hdGlvbl9fbGlzdCA+IGxpID4gYSA+IHNwYW5bY2xhc3M9XCJpY29uXCJdJywge1xuICAgICAgdGltZW91dDogNTAwMCxcbiAgICB9KTtcbiAgfVxuXG4gIC8vIOKchSBHZXQgdGhlIGN1cnJlbnRseSBhY3RpdmUgcGFnZSBpbiBwYWdpbmF0aW9uXG4gIGFjdGl2ZVBhZ2UoKSB7XG4gICAgcmV0dXJuIGN5LmdldChcIi5wYWdpbmF0aW9uX19saXN0ID4gbGkgPiBhLmFjdGl2ZVwiLCB7IHRpbWVvdXQ6IDUwMDAgfSk7XG4gIH1cblxuICAvLyDwn5ugIE5hdmlnYXRlIHRvIHRoZSBsYXN0IHBhZ2UgYnkgaXRlcmF0aW5nIHRocm91Z2ggcGFnaW5hdGlvblxuICAvLyBUaGlzIGlzIGNsZXZlciDigJQgbmljZSBqb2IgYXZvaWRpbmcgaW5maW5pdGUgbG9vcHMhXG4gIG5hdlRvTGFzdFBhZ2UoKSB7XG4gICAgbGV0IHByZXZpb3VzUGFnZXMgPSBuZXcgU2V0KCk7XG5cbiAgICBjb25zdCBnb1RvTGFzdFBhZ2UgPSAoKSA9PiB7XG4gICAgICB0aGlzLmFjdGl2ZVBhZ2UoKVxuICAgICAgICAuaW52b2tlKFwidGV4dFwiKVxuICAgICAgICAudGhlbigoY3VycmVudFBhZ2UpID0+IHtcbiAgICAgICAgICBpZiAocHJldmlvdXNQYWdlcy5oYXMoY3VycmVudFBhZ2UpKSB7XG4gICAgICAgICAgICBjeS5sb2coXCJSZWFjaGVkIHRoZSBsYXN0IHBhZ2UsIHN0b3BwaW5nIG5hdmlnYXRpb24uXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHByZXZpb3VzUGFnZXMuYWRkKGN1cnJlbnRQYWdlKTtcblxuICAgICAgICAgIHRoaXMubmV4dEJ1dHRvbigpLnRoZW4oKCRuZXh0KSA9PiB7XG4gICAgICAgICAgICBpZiAoJG5leHQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgIGN5LmxvZyhcIk5vIG1vcmUgcGFnZXMgbGVmdCB0byBuYXZpZ2F0ZS5cIik7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY3kud3JhcCgkbmV4dCkubGFzdCgpLmNsaWNrKCk7IC8vIOKchSBBbHdheXMgdXNlIGAubGFzdCgpYCBmb3Igcm9idXN0bmVzc1xuICAgICAgICAgICAgY3kud2FpdCg1MDApOyAvLyDwn5ugIENvbnNpZGVyIHVzaW5nIGBjeS5pbnRlcmNlcHQoKWAgZm9yIEFQSSB3YWl0IGluc3RlYWRcbiAgICAgICAgICAgIGdvVG9MYXN0UGFnZSgpOyAvLyDwn5SBIFJlY3Vyc2l2ZSBjYWxsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBnb1RvTGFzdFBhZ2UoKTsgLy8g8J+UgSBLaWNrc3RhcnQgcmVjdXJzaW9uXG4gIH1cblxuICAvLyDwn5ugIFNlbGVjdCBhIHNvcnRpbmcgb3B0aW9uIGZyb20gZHJvcGRvd25cbiAgc29ydE9wdGlvbihvcHRpb24pIHtcbiAgICBjeS5nZXQoXCIuc2VhcmNocmVzdWx0X19oZWFkZXItLWhlYWRpbmctLXNvcnRpbmdcIikuY2xpY2soKTtcbiAgICBjeS5nZXQoXG4gICAgICBgLmNzc2VsZWN0LXdyYXBwZXIgPiBkaXYgPiAuY3VzdG9tLW9wdGlvbnMgPiBzcGFuW2RhdGEtdmFsdWU9JyR7b3B0aW9ufSddYFxuICAgICkuY2xpY2soKTtcbiAgfVxuXG4gIC8vIOKchSBHZXQgc2VsZWN0ZWQgdmFsdWUgZnJvbSBzb3J0aW5nIGRyb3Bkb3duXG4gIGdldFNvcnRlZFZhbHVlKCkge1xuICAgIHJldHVybiBjeS5nZXQoXCIuY3NzZWxlY3QuZm9jdXMgPiBzcGFuXCIpO1xuICB9XG5cbiAgLy8g4pyFIEdldCAnbm8gcHJvcGVydHkgZm91bmQnIG1lc3NhZ2VcbiAgbm9Qcm9wZXJ0eU1lc3NhZ2UoKSB7XG4gICAgcmV0dXJuIGN5LmdldChcIi5uby1yZXN1bHRzLW1lc3NhZ2VcIik7XG4gIH1cblxuXG4gIC8vIPCfm6AgQ2xpY2sgb24gbWFwIHZpZXcgdG9nZ2xlXG4gIG1hcFRvZ2dsZSgpIHtcbiAgICByZXR1cm4gY3kuZ2V0KFwiI21hcC1saXN0LXN3aXRjaCA+IGxhYmVsXCIpLmNvbnRhaW5zKFwiTWFwXCIpLmNsaWNrKCk7IC8vIPCflIEgQWRkZWQgLmNsaWNrKClcbiAgfVxuXG4gIC8vIPCfm6AgQ2xpY2sgb24gbGlzdCB2aWV3IHRvZ2dsZVxuICBsaXN0VG9nZ2xlKCkge1xuICAgIHJldHVybiBjeS5nZXQoXCIjbWFwLWxpc3Qtc3dpdGNoID4gbGFiZWxcIikuY29udGFpbnMoXCJMaXN0XCIpLmNsaWNrKCk7IC8vIPCflIEgQWRkZWQgLmNsaWNrKClcbiAgfVxuXG4gIC8vIENsaWNrIHNhdmUgc2VhcmNoIGJ1dHRvbiBcbiAgc2F2ZVNlYXJjaCgpIHtcbiAgICByZXR1cm4gY3kuZ2V0KFwiLnNhdmVkLXNlYXJjaC1idG4tZGVmYXVsdFwiKS5jbGljaygpO1xuICB9XG5cbiAgLy8gR2V0IFNhdmVkIFNlYXJjaCBUZXh0XG4gIHNhdmVkU2VhcmNoVGV4dCgpIHtcbiAgICByZXR1cm4gY3kuZ2V0KCcuc2F2ZWQtc2VhcmNoLWJ0bi1kZWZhdWx0LmFjdGl2ZScpLmludm9rZSgndGV4dCcpXG4gIH1cblxuXG5cblxufVxuXG5leHBvcnQgZGVmYXVsdCBQcm9wZXJ0eVNoYXJlZEVsZW1lbnRzIiwiZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChlKSB7XG4gIHJldHVybiBlICYmIGUuX19lc01vZHVsZSA/IGUgOiB7XG4gICAgXCJkZWZhdWx0XCI6IGVcbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdCwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJpbXBvcnQgTGlzdGluZ1BhZ2UgZnJvbSBcIi4uLy4uL3N1cHBvcnQvcGFnZXMvcHVibGljUGFnZXMvcHJvcGVydHktbGlzdC12aWV3LXBhZ2VcIjtcbmltcG9ydCBQcm9wZXJ0eVNoYXJlZEVsZW1lbnRzIGZyb20gXCIuLi8uLi9zdXBwb3J0L3BhZ2VzL3B1YmxpY1BhZ2VzL3Byb3BlcnR5LXNoYXJlZC1lbGVtZW50c1wiO1xuaW1wb3J0IFNhdmVkUHJvcGVydGllc1BhZ2UgZnJvbSBcIi4uLy4uL3N1cHBvcnQvcGFnZXMvcHJpdmF0ZVBhZ2VzL3NhdmVkLXByb3BlcnRpZXMtcGFnZVwiO1xuXG5jb25zdCBsaXN0aW5nUGFnZSA9IG5ldyBMaXN0aW5nUGFnZSgpOyAvLyDinIUgR3JlYXQ6IFBPTSBpbnN0YW5jZSBkZWNsYXJlZCBvbmNlXG5jb25zdCBzaGFyZWRFbGVtZW50cyA9IG5ldyBQcm9wZXJ0eVNoYXJlZEVsZW1lbnRzKCk7XG5jb25zdCBzYXZlZFByb3BlcnRpZXMgPSBuZXcgU2F2ZWRQcm9wZXJ0aWVzUGFnZSgpXG5sZXQgbGlzdGluZ1BhZ2VEYXRhO1xuXG5kZXNjcmliZShcIvCfj6AgTGlzdGluZyBQYWdlIFRlc3QgU3VpdGVcIiwgKCkgPT4ge1xuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICBsaXN0aW5nUGFnZS52aXNpdCgpOyAvLyDinIUgQ29uc2lzdGVudCBlbnRyeSBwb2ludFxuXG4gICAgY3kuZml4dHVyZShcImxpc3RpbmctcGFnZS1kYXRhXCIpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIGxpc3RpbmdQYWdlRGF0YSA9IGRhdGE7XG4gICAgfSk7XG5cbiAgICBDeXByZXNzLm9uKFwidW5jYXVnaHQ6ZXhjZXB0aW9uXCIsICgpID0+IGZhbHNlKTsgLy8gIFVzZSB0aGlzIHNwYXJpbmdseSDigJMgaWRlYWxseSBjYXRjaCBrbm93biBlcnJvcnMgZGlyZWN0bHlcbiAgfSk7XG5cbiAgaXQoXCJzaG91bGQgZGlzcGxheSBsaXN0aW5ncyBiYXNlZCBvbiB0aGUgbG9jYXRpb24gc2VsZWN0ZWQgYnkgdGhlIHVzZXJcIiwgKCkgPT4ge1xuICAgIC8vIOKchSBJbnRlcmNlcHQgZGVjbGFyZWQgYmVmb3JlIHRyaWdnZXJpbmdcbiAgICBjeS5pbnRlcmNlcHQoJ1BPU1QnLCAnKiovcHVibGljL2xpc3RpbmdzKicpLmFzKCdnZXRMaXN0aW5nc0ZvclNlYXJjaCcpO1xuXG4gICAgc2hhcmVkRWxlbWVudHMudHlwZUxvY2F0aW9uKGxpc3RpbmdQYWdlRGF0YS5wcm9wZXJ0eUxvY2F0aW9uKTtcbiAgICBcblxuICAgIGN5LndhaXQoJ0BnZXRMaXN0aW5nc0ZvclNlYXJjaCcpOyAvLyDinIUgRXNzZW50aWFsIGZvciBzdGFiaWxpdHlcblxuICAgIHNoYXJlZEVsZW1lbnRzLnByb3BlcnR5QWRkcmVzcygpXG4gICAgICAuc2hvdWxkKCdoYXZlLmxlbmd0aC5ncmVhdGVyVGhhbicsIDApIC8vIOKchSBHb29kIHByYWN0aWNlIHRvIGF2b2lkIGZhbHNlIHBvc2l0aXZlc1xuICAgICAgLmVhY2goKCRhZGRyZXNzKSA9PiB7XG4gICAgICAgIGNvbnN0IGFkZHJlc3NUZXh0ID0gJGFkZHJlc3MudGV4dCgpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGV4cGVjdChhZGRyZXNzVGV4dCkudG8uaW5jbHVkZShcbiAgICAgICAgICBsaXN0aW5nUGFnZURhdGEucHJvcGVydHlMb2NhdGlvbi50b0xvd2VyQ2FzZSgpXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgLy8vaXQoXCJzaG91bGQgbmF2aWdhdGUgdG8gdGhlIGxhc3QgcGFnZSB1c2luZyBwYWdpbmF0aW9uIGNvbnRyb2xzXCIsICgpID0+IHtcbiAgICAvL2N5LmludGVyY2VwdCgnUE9TVCcsICcqKi9wdWJsaWMvbGlzdGluZ3MqJykuYXMoJ2dldExpc3RpbmdzRm9yU2VhcmNoJyk7XG5cbiAgICAvKnNoYXJlZEVsZW1lbnRzLnR5cGVMb2NhdGlvbihsaXN0aW5nUGFnZURhdGEucHJvcGVydHlMb2NhdGlvbik7XG4gICAgXG4gICAgY3kud2FpdCgnQGdldExpc3RpbmdzRm9yU2VhcmNoJyk7XG5cbiAgICBzaGFyZWRFbGVtZW50cy5uYXZUb0xhc3RQYWdlKCk7XG5cbiAgICBzaGFyZWRFbGVtZW50cy5hY3RpdmVQYWdlKClcbiAgICAgIC5pbnZva2UoXCJ0ZXh0XCIpXG4gICAgICAudGhlbigoYWN0aXZlUGFnZVRleHQpID0+IHtcbiAgICAgICAgZXhwZWN0KE51bWJlcihhY3RpdmVQYWdlVGV4dCkpLnRvLmJlLmdyZWF0ZXJUaGFuKDEpOyAvLyDinIUgTG9naWNhbCBhbmQgZmxleGlibGVcbiAgICAgIH0pO1xuICB9KTsqL1xuICBcbiAgaXQoXCJzaG91bGQgc29ydCBsaXN0aW5ncyBiYXNlZCBvbiB0aGUgc2VsZWN0ZWQgc29ydCBvcHRpb25cIiwgKCkgPT4ge1xuICAgIHNoYXJlZEVsZW1lbnRzLnNvcnRPcHRpb24obGlzdGluZ1BhZ2VEYXRhLnNvcnRWYWx1ZSk7IC8vIOKchSBTaG91bGQgaW50ZXJuYWxseSB0cmlnZ2VyIGxpc3RpbmcgcmVsb2FkXG5cbiAgICBzaGFyZWRFbGVtZW50cy5nZXRTb3J0ZWRWYWx1ZSgpXG4gICAgICAuc2hvdWxkKFwiYmUudmlzaWJsZVwiKVxuICAgICAgLmludm9rZShcInRleHRcIilcbiAgICAgIC50aGVuKChzZWxlY3RlZFRleHQpID0+IHtcbiAgICAgICAgY29uc3QgdHJpbW1lZCA9IHNlbGVjdGVkVGV4dC50cmltKCk7XG4gICAgICAgIGV4cGVjdCh0cmltbWVkKS50by5lcShsaXN0aW5nUGFnZURhdGEuc2VsZWN0ZWRTb3J0VmFsdWUpOyAvLyDinIUgRGF0YS1kcml2ZW4gKyBzZW1hbnRpY1xuICAgICAgfSk7XG4gIH0pO1xuXG4gIGl0KFwic2hvdWxkIHNob3cgc2lnbi1pbiBtb2RhbCB3aGVuIGEgZ3Vlc3QgdXNlciB0cmllcyB0byBmYXZvcml0ZSBhIGxpc3RpbmdcIiwgKCkgPT4ge1xuICAgIHNoYXJlZEVsZW1lbnRzLmNsaWNrRmF2b3JpdGVJY29uKCk7IFxuXG4gICAgc2hhcmVkRWxlbWVudHMuc2lnbkluTW9kYWxCb3goKVxuICAgICAgLnNob3VsZChcImV4aXN0XCIpXG4gICAgICAuYW5kKFwiYmUudmlzaWJsZVwiKTsgLy8g4pyFIENoZWNrcyBib3RoIGV4aXN0ZW5jZSBhbmQgdmlzaWJpbGl0eVxuICB9KTtcblxuICBpdChcIlNob3VsZCBub3QgYWxsb3cgZ3Vlc3QgdXNlciB0byBzYXZlIHNlYXJjaFwiLCAoKSA9PiB7XG4gICAgc2hhcmVkRWxlbWVudHMuc2F2ZVNlYXJjaCgpO1xuXG4gICAgc2hhcmVkRWxlbWVudHMuc2lnbkluTW9kYWxCb3goKVxuICAgICAgLnNob3VsZChcImV4aXN0XCIpXG4gICAgICAuYW5kKFwiYmUudmlzaWJsZVwiKTsgLy8g4pyFIEdvb2QgVUkgdmFsaWRhdGlvblxuICB9KTtcbn0pO1xuXG5kZXNjcmliZShcIkxpc3RpbmcgUGFnZSAtIExvZ2dlZC1JbiBVc2VyXCIsICgpID0+IHtcbiAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgY3kudmlzaXRTaWduSW4oKTtcblxuICAgIGN5LmZpeHR1cmUoXCJsaXN0aW5nLXBhZ2UtZGF0YVwiKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICBsaXN0aW5nUGFnZURhdGEgPSBkYXRhO1xuICAgIH0pO1xuXG4gICAgY3kuZml4dHVyZShcInNpZ24taW5cIikudGhlbigoZGF0YSkgPT4ge1xuICAgICAgY3kubG9naW4oZGF0YS5lbWFpbEFkZHJlc3MsIGRhdGEucGFzc3dvcmQpOyAvLyDinIUgQ3VzdG9tIGxvZ2luIGNvbW1hbmQgPSBnb29kIGFic3RyYWN0aW9uXG4gICAgfSk7XG5cbiAgICBjeS52aXNpdChcIi9saXN0aW5nc1wiKTsgLy8g4pyFIFBvc3QtbG9naW4gcmVkaXJlY3Rpb24gY2hlY2tcbiAgfSk7XG5cbiAgaXQoXCJTaG91bGQgYWxsb3cgdGhlIHVzZXIgdG8gc2F2ZSBzZWFyY2ggd2l0aCBsb2NhdGlvblwiLCAoKSA9PiB7XG4gICAgc2hhcmVkRWxlbWVudHMudHlwZUxvY2F0aW9uKGxpc3RpbmdQYWdlRGF0YS5wcm9wZXJ0eUxvY2F0aW9uKTtcblxuXG4gICAgc2hhcmVkRWxlbWVudHMuc2F2ZVNlYXJjaCgpO1xuICAgIHNoYXJlZEVsZW1lbnRzLnNhdmVkU2VhcmNoVGV4dCgpLnRoZW4oKHRleHQpID0+IHtcbiAgICAgIGxldCBzYXZlZFNlYXJjaFRleHQgPSB0ZXh0LnRyaW0oKTtcbiAgICAgIGV4cGVjdChzYXZlZFNlYXJjaFRleHQpLnRvLmJlLmVxKFwiU2VhcmNoIHNhdmVkXCIpOyAvLyDinIUgVGV4dC1iYXNlZCBjb25maXJtYXRpb25cbiAgICB9KTtcbiAgfSk7XG5cbiAgaXQoXCJTaG91bGQgYWxsb3cgdXNlciB0byBtYXJrIHRoZSBsaXN0aW5nIGFzIGZhdm9yaXRlXCIsICgpID0+IHtcbiAgICBsaXN0aW5nUGFnZS5jbGlja0hlYXJ0SWNvbihsaXN0aW5nUGFnZURhdGEubGlzdGluZ0FkZHJlc3MpOyAvLyDinIUgUE9NIGZvciB0YXJnZXRpbmcgYnkgYWRkcmVzc1xuXG4gICAgbGlzdGluZ1BhZ2UuZ2V0RmF2b3JpdGVNYXJrZWRIZWFydEljb24obGlzdGluZ1BhZ2VEYXRhLmxpc3RpbmdBZGRyZXNzKVxuICAgICAgLnNob3VsZCgnYmUudmlzaWJsZScpOyBcbiAgICAgIGN5LnZpc2l0KCcvc2F2ZWQtcHJvcGVydGllcycpO1xuICAgICAgc2F2ZWRQcm9wZXJ0aWVzLmdldFByaW1hcnlMaXN0KCk7XG4gICAgICBsaXN0aW5nUGFnZS5nZXRGYXZvcml0ZU1hcmtlZEhlYXJ0SWNvbihsaXN0aW5nUGFnZURhdGEubGlzdGluZ0FkZHJlc3MpXG4gICAgICAuc2hvdWxkKCdiZS52aXNpYmxlJyk7IC8vIFxuXG5cbiAgfSk7XG59KTtcbiJdLCJuYW1lcyI6WyJTYXZlZFByb3BlcnRpZXNQYWdlIiwibmV3TGlzdCIsImN5IiwiZ2V0IiwiYWRkTGlzdE5hbWUiLCJsaXN0bmFtZSIsInR5cGUiLCJtYWtlTGlzdHByaW1hcnlDaGVjayIsImNsaWNrIiwic2F2ZU5ld0xpc3QiLCJ0aW1lb3V0IiwiZm9yY2UiLCJmYXZvcml0ZUxpc3RUaXRsZSIsImNvbnRhaW5zIiwiZ2V0UHJpbWFyeUxpc3QiLCJfZGVmYXVsdCIsImV4cG9ydHMiLCJkZWZhdWx0IiwibW9kdWxlIiwiTGlzdGluZ1BhZ2UiLCJ2aXNpdCIsImxpc3QiLCJnZXRMaXN0aW5nQ2FyZCIsImFkZHJlc3MiLCJzaG91bGQiLCJjbG9zZXN0IiwiY2xpY2tIZWFydEljb24iLCJhcyIsImZpbmQiLCJnZXRGYXZvcml0ZU1hcmtlZEhlYXJ0SWNvbiIsIlByb3BlcnR5U2hhcmVkRWxlbWVudHMiLCJwcm9wZXJ0eUFkZHJlc3MiLCJhbGxGaWx0ZXJzQnV0dG9uIiwidHlwZUxvY2F0aW9uIiwibG9jYXRpb24iLCJlcSIsImNsaWNrRmF2b3JpdGVJY29uIiwic2lnbkluTW9kYWxCb3giLCJwYWdpbmF0aW9uTnVtYmVyIiwibmV4dEJ1dHRvbiIsImFjdGl2ZVBhZ2UiLCJuYXZUb0xhc3RQYWdlIiwicHJldmlvdXNQYWdlcyIsIlNldCIsImdvVG9MYXN0UGFnZSIsImludm9rZSIsInRoZW4iLCJjdXJyZW50UGFnZSIsImhhcyIsImxvZyIsImFkZCIsIiRuZXh0IiwibGVuZ3RoIiwid3JhcCIsImxhc3QiLCJ3YWl0Iiwic29ydE9wdGlvbiIsIm9wdGlvbiIsImdldFNvcnRlZFZhbHVlIiwibm9Qcm9wZXJ0eU1lc3NhZ2UiLCJtYXBUb2dnbGUiLCJsaXN0VG9nZ2xlIiwic2F2ZVNlYXJjaCIsInNhdmVkU2VhcmNoVGV4dCIsIl9wcm9wZXJ0eUxpc3RWaWV3UGFnZSIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiX3Byb3BlcnR5U2hhcmVkRWxlbWVudHMiLCJfc2F2ZWRQcm9wZXJ0aWVzUGFnZSIsImxpc3RpbmdQYWdlIiwic2hhcmVkRWxlbWVudHMiLCJzYXZlZFByb3BlcnRpZXMiLCJsaXN0aW5nUGFnZURhdGEiLCJkZXNjcmliZSIsImJlZm9yZUVhY2giLCJmaXh0dXJlIiwiZGF0YSIsIkN5cHJlc3MiLCJvbiIsIml0IiwiaW50ZXJjZXB0IiwicHJvcGVydHlMb2NhdGlvbiIsImVhY2giLCIkYWRkcmVzcyIsImFkZHJlc3NUZXh0IiwidGV4dCIsInRvTG93ZXJDYXNlIiwiZXhwZWN0IiwidG8iLCJpbmNsdWRlIiwic29ydFZhbHVlIiwic2VsZWN0ZWRUZXh0IiwidHJpbW1lZCIsInRyaW0iLCJzZWxlY3RlZFNvcnRWYWx1ZSIsImFuZCIsInZpc2l0U2lnbkluIiwibG9naW4iLCJlbWFpbEFkZHJlc3MiLCJwYXNzd29yZCIsImJlIiwibGlzdGluZ0FkZHJlc3MiXSwic291cmNlUm9vdCI6IiJ9