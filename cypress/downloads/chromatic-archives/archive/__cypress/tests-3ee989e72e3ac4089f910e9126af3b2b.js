/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./cypress/support/pages/privatePages/dashboard-page.js":
/*!**************************************************************!*\
  !*** ./cypress/support/pages/privatePages/dashboard-page.js ***!
  \**************************************************************/
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
class Dashboard {
  // ✅ Navigates to the dashboard page
  visit() {
    cy.visit("/dashboard");
  }

  // ✅ Returns the logged-in user's name by extracting text from the userName element
  getUserName() {
    return cy.get("#userName");
  }

  // ✅ Clicks the Edit button on the user's profile card
  // Suggest renaming this to `clickUserProfileEditBtn()` for action clarity
  userProfileEditBtn() {
    return cy.get(".usercard__btn").click();
  }

  // ✅ Returns a dashboard option card based on visible text (e.g., "Save Properties")
  // Enables reuse for "Saved Searches", "Hidden Properties", etc.
  getOptionCard(optionText) {
    return cy.get("div.teamcard__team--info").contains(optionText);
  }

  // ✅ Clicks on a link in the dashboard option card based on the given URL path
  // Cleanly abstracts navigation links like "/favorites", "/saved-searches", "/hidden-listings"
  clickOptionLink(path) {
    return cy.get(`.teamcard__btn > a[href="${path}"]`).click();
  }
  signout() {
    return cy.get('.signout > svg');
  }
}
var _default = exports["default"] = Dashboard;
module.exports = exports.default;

/***/ }),

/***/ "./cypress/support/pages/privatePages/saved-searches-page.js":
/*!*******************************************************************!*\
  !*** ./cypress/support/pages/privatePages/saved-searches-page.js ***!
  \*******************************************************************/
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
class SavedSearchesPage {
  // ✅ Get saved search title

  savedSearchTitle() {
    return cy.get('.row.saved-search > div > div.savecard > div.savecard__title > h4').invoke('text');
  }

  // Open edit mode of saves search 

  savedSearchEditMode() {
    return cy.get('.row.saved-search > div > div.savecard > .savecard__settings > button.editBtn').click();
  }

  // Click on saved search card

  savedSearchFirstCard() {
    return cy.get('.row.saved-search').find('.col-sm-6.col-xl-4 > .savecard').first();
  }

  // Delete existing saved searches
  deleteSavedSearch(title) {
    this.savedSearchFirstCard().as('targetedSavedSearch');
    cy.get('@targetedSavedSearch').find('.btnDelete').click();
  }

  // Click on delete button on confirmation modal
  deleteConfirmationButton() {
    cy.get('#search-delete-btn').click();
  }
}
var _default = exports["default"] = SavedSearchesPage;
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
/*!*******************************************************!*\
  !*** ./cypress/e2e/privatePages/saved-searches.cy.js ***!
  \*******************************************************/


var _interopRequireDefault = __webpack_require__(/*! ../../Library/Caches/Cypress/14.0.3/Cypress.app/Contents/Resources/app/node_modules/@babel/runtime/helpers/interopRequireDefault.js */ "../../Library/Caches/Cypress/14.0.3/Cypress.app/Contents/Resources/app/node_modules/@babel/runtime/helpers/interopRequireDefault.js");
var _propertySharedElements = _interopRequireDefault(__webpack_require__(/*! ../../support/pages/publicPages/property-shared-elements */ "./cypress/support/pages/publicPages/property-shared-elements.js"));
var _savedSearchesPage = _interopRequireDefault(__webpack_require__(/*! ../../support/pages/privatePages/saved-searches-page */ "./cypress/support/pages/privatePages/saved-searches-page.js"));
var _dashboardPage = _interopRequireDefault(__webpack_require__(/*! ../../support/pages/privatePages/dashboard-page */ "./cypress/support/pages/privatePages/dashboard-page.js"));
/*
 *
 * Test Scenarios:
 *
 * 1. Guest users should be redirected to Sign-In on accessing Saved Searches.
 * 2. Authenticated users should be able to save a search (try multiple combinations).
 * 3. Saved searches should appear correctly on the Saved Searches page.
 * 4. No duplicate saved searches should be allowed.
 * 5. Users should be able to navigate to listings using a saved search.
 *
 */

const sharedElements = new _propertySharedElements.default();
const savedSearchPage = new _savedSearchesPage.default();
const dashboardPage = new _dashboardPage.default();
let listingLocation;

// Test Suite: Guest User
describe("Saved Searches - Guest User Access", () => {
  it("Should redirect guest user to Sign-In page when accessing Saved Searches", () => {
    cy.visit("/saved-searches");
    cy.url().should("include", "/sign-in");
  });
});

// Test Suite: Authenticated User
describe("Saved Searches - Authenticated User Functionality", () => {
  beforeEach(() => {
    cy.visitSignIn();
    cy.fixture("sign-in").then(data => {
      cy.login(data.emailAddress, data.password);
    });
    cy.fixture("location").then(data => {
      listingLocation = data;
    });
    cy.visit("/listings");
  });

  // Ensure that user is able to see saved search in saved search page

  it("Should allow user to save a search and view it in Saved Searches page", () => {
    sharedElements.typeLocation(listingLocation.orlando);
    sharedElements.saveSearch();
    cy.visit("/saved-searches");
    savedSearchPage.savedSearchTitle().then(text => {
      const normalized = text.replace(/\s+/g, " ").trim();
      expect(normalized).to.include(listingLocation.orlando);
    });
  });

  // Ensure that user can delete the saved searches
  it("Should allow user to delete the saved search", () => {
    cy.visit("/saved-searches");
    savedSearchPage.deleteSavedSearch("Property Type: House");
    savedSearchPage.deleteConfirmationButton();
  });
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUMsV0FBVyxDQUFDO0VBQ3ZCLENBQUMsQ0FBQzs7RUFFRjs7RUFFQXlFLEVBQUUsQ0FBQyx1RUFBdUUsRUFBRSxNQUFNO0lBQ2hGTCxjQUFjLENBQUNwQyxZQUFZLENBQUN1QyxlQUFlLENBQUNZLE9BQU8sQ0FBQztJQUNwRGYsY0FBYyxDQUFDUCxVQUFVLENBQUMsQ0FBQztJQUMzQjVELEVBQUUsQ0FBQ0QsS0FBSyxDQUFDLGlCQUFpQixDQUFDO0lBQzNCcUUsZUFBZSxDQUFDcEQsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDNEIsSUFBSSxDQUFFdUMsSUFBSSxJQUFLO01BQ2hELE1BQU1DLFVBQVUsR0FBR0QsSUFBSSxDQUFDRSxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUMsQ0FBQztNQUNuREMsTUFBTSxDQUFDSCxVQUFVLENBQUMsQ0FBQ0ksRUFBRSxDQUFDQyxPQUFPLENBQUNuQixlQUFlLENBQUNZLE9BQU8sQ0FBQztJQUN4RCxDQUFDLENBQUM7RUFDSixDQUFDLENBQUM7O0VBRUY7RUFDQVYsRUFBRSxDQUFDLDhDQUE4QyxFQUFFLE1BQU07SUFDdkR4RSxFQUFFLENBQUNELEtBQUssQ0FBQyxpQkFBaUIsQ0FBQztJQUUzQnFFLGVBQWUsQ0FBQzlDLGlCQUFpQixDQUFDLHNCQUFzQixDQUFDO0lBQ3pEOEMsZUFBZSxDQUFDM0Msd0JBQXdCLENBQUMsQ0FBQztFQUM1QyxDQUFDLENBQUM7QUFDSixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2dnbXN0ZXN0YXV0b21hdGlvbi8uL2N5cHJlc3Mvc3VwcG9ydC9wYWdlcy9wcml2YXRlUGFnZXMvZGFzaGJvYXJkLXBhZ2UuanMiLCJ3ZWJwYWNrOi8vZ2dtc3Rlc3RhdXRvbWF0aW9uLy4vY3lwcmVzcy9zdXBwb3J0L3BhZ2VzL3ByaXZhdGVQYWdlcy9zYXZlZC1zZWFyY2hlcy1wYWdlLmpzIiwid2VicGFjazovL2dnbXN0ZXN0YXV0b21hdGlvbi8uL2N5cHJlc3Mvc3VwcG9ydC9wYWdlcy9wdWJsaWNQYWdlcy9wcm9wZXJ0eS1zaGFyZWQtZWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vZ2dtc3Rlc3RhdXRvbWF0aW9uLy4uLy4uL0xpYnJhcnkvQ2FjaGVzL0N5cHJlc3MvMTQuMC4zL0N5cHJlc3MuYXBwL0NvbnRlbnRzL1Jlc291cmNlcy9hcHAvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0LmpzIiwid2VicGFjazovL2dnbXN0ZXN0YXV0b21hdGlvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9nZ21zdGVzdGF1dG9tYXRpb24vLi9jeXByZXNzL2UyZS9wcml2YXRlUGFnZXMvc2F2ZWQtc2VhcmNoZXMuY3kuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgRGFzaGJvYXJkIHtcbiAgLy8g4pyFIE5hdmlnYXRlcyB0byB0aGUgZGFzaGJvYXJkIHBhZ2VcbiAgdmlzaXQoKSB7XG4gICAgY3kudmlzaXQoXCIvZGFzaGJvYXJkXCIpO1xuICB9XG5cbiAgLy8g4pyFIFJldHVybnMgdGhlIGxvZ2dlZC1pbiB1c2VyJ3MgbmFtZSBieSBleHRyYWN0aW5nIHRleHQgZnJvbSB0aGUgdXNlck5hbWUgZWxlbWVudFxuICBnZXRVc2VyTmFtZSgpIHtcbiAgICByZXR1cm4gY3kuZ2V0KFwiI3VzZXJOYW1lXCIpO1xuICB9XG5cbiAgLy8g4pyFIENsaWNrcyB0aGUgRWRpdCBidXR0b24gb24gdGhlIHVzZXIncyBwcm9maWxlIGNhcmRcbiAgLy8gU3VnZ2VzdCByZW5hbWluZyB0aGlzIHRvIGBjbGlja1VzZXJQcm9maWxlRWRpdEJ0bigpYCBmb3IgYWN0aW9uIGNsYXJpdHlcbiAgdXNlclByb2ZpbGVFZGl0QnRuKCkge1xuICAgIHJldHVybiBjeS5nZXQoXCIudXNlcmNhcmRfX2J0blwiKS5jbGljaygpO1xuICB9XG5cbiAgLy8g4pyFIFJldHVybnMgYSBkYXNoYm9hcmQgb3B0aW9uIGNhcmQgYmFzZWQgb24gdmlzaWJsZSB0ZXh0IChlLmcuLCBcIlNhdmUgUHJvcGVydGllc1wiKVxuICAvLyBFbmFibGVzIHJldXNlIGZvciBcIlNhdmVkIFNlYXJjaGVzXCIsIFwiSGlkZGVuIFByb3BlcnRpZXNcIiwgZXRjLlxuICBnZXRPcHRpb25DYXJkKG9wdGlvblRleHQpIHtcbiAgICByZXR1cm4gY3kuZ2V0KFwiZGl2LnRlYW1jYXJkX190ZWFtLS1pbmZvXCIpLmNvbnRhaW5zKG9wdGlvblRleHQpO1xuICB9XG5cbiAgLy8g4pyFIENsaWNrcyBvbiBhIGxpbmsgaW4gdGhlIGRhc2hib2FyZCBvcHRpb24gY2FyZCBiYXNlZCBvbiB0aGUgZ2l2ZW4gVVJMIHBhdGhcbiAgLy8gQ2xlYW5seSBhYnN0cmFjdHMgbmF2aWdhdGlvbiBsaW5rcyBsaWtlIFwiL2Zhdm9yaXRlc1wiLCBcIi9zYXZlZC1zZWFyY2hlc1wiLCBcIi9oaWRkZW4tbGlzdGluZ3NcIlxuICBjbGlja09wdGlvbkxpbmsocGF0aCkge1xuICAgIHJldHVybiBjeS5nZXQoYC50ZWFtY2FyZF9fYnRuID4gYVtocmVmPVwiJHtwYXRofVwiXWApLmNsaWNrKCk7XG4gIH1cblxuICBzaWdub3V0KCkge1xuICAgIHJldHVybiBjeS5nZXQoJy5zaWdub3V0ID4gc3ZnJyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRGFzaGJvYXJkO1xuIiwiICBcbiAgY2xhc3MgU2F2ZWRTZWFyY2hlc1BhZ2Uge1xuIFxuXG4vLyDinIUgR2V0IHNhdmVkIHNlYXJjaCB0aXRsZVxuXG5zYXZlZFNlYXJjaFRpdGxlKCkge1xuICAgIHJldHVybiBjeS5nZXQoJy5yb3cuc2F2ZWQtc2VhcmNoID4gZGl2ID4gZGl2LnNhdmVjYXJkID4gZGl2LnNhdmVjYXJkX190aXRsZSA+IGg0JykuaW52b2tlKCd0ZXh0Jyk7XG59XG5cbi8vIE9wZW4gZWRpdCBtb2RlIG9mIHNhdmVzIHNlYXJjaCBcblxuc2F2ZWRTZWFyY2hFZGl0TW9kZSgpIHtcbiAgICByZXR1cm4gY3kuZ2V0KCcucm93LnNhdmVkLXNlYXJjaCA+IGRpdiA+IGRpdi5zYXZlY2FyZCA+IC5zYXZlY2FyZF9fc2V0dGluZ3MgPiBidXR0b24uZWRpdEJ0bicpLmNsaWNrKCk7XG59XG5cblxuXG4vLyBDbGljayBvbiBzYXZlZCBzZWFyY2ggY2FyZFxuXG5zYXZlZFNlYXJjaEZpcnN0Q2FyZCgpIHsgXG4gIHJldHVybiBjeS5nZXQoJy5yb3cuc2F2ZWQtc2VhcmNoJykuZmluZCgnLmNvbC1zbS02LmNvbC14bC00ID4gLnNhdmVjYXJkJykuZmlyc3QoKTtcbn1cblxuLy8gRGVsZXRlIGV4aXN0aW5nIHNhdmVkIHNlYXJjaGVzXG5kZWxldGVTYXZlZFNlYXJjaCh0aXRsZSkge1xuIHRoaXMuc2F2ZWRTZWFyY2hGaXJzdENhcmQoKS5hcygndGFyZ2V0ZWRTYXZlZFNlYXJjaCcpXG4gIFxuICBjeS5nZXQoJ0B0YXJnZXRlZFNhdmVkU2VhcmNoJykuZmluZCgnLmJ0bkRlbGV0ZScpLmNsaWNrKCk7XG4gIH1cblxuXG4vLyBDbGljayBvbiBkZWxldGUgYnV0dG9uIG9uIGNvbmZpcm1hdGlvbiBtb2RhbFxuZGVsZXRlQ29uZmlybWF0aW9uQnV0dG9uKCkge1xuICBjeS5nZXQoJyNzZWFyY2gtZGVsZXRlLWJ0bicpLmNsaWNrKCk7IFxufVxuXG5cblxuXG5cblxuXG5cblxuXG5cblxufVxuXG5leHBvcnQgZGVmYXVsdCBTYXZlZFNlYXJjaGVzUGFnZSIsImNsYXNzIFByb3BlcnR5U2hhcmVkRWxlbWVudHMge1xuXG5cbiAgLy8g4pyFIEdldCB0aGUgcHJvcGVydHkgYWRkcmVzcyBlbGVtZW50XG4gIHByb3BlcnR5QWRkcmVzcygpIHtcbiAgICByZXR1cm4gY3kuZ2V0KFwiLmFwdGNhcmRfX2NvbnRlbnQtLWFkZHJlc3NcIiwgeyB0aW1lb3V0OiAxMDAwMCB9KTtcbiAgfVxuXG4gIC8vIPCfm6AgQ2xpY2sgb24gdGhlICdBbGwgRmlsdGVycycgYnV0dG9uXG4gIC8vIENvbnNpZGVyIHBhcmFtZXRlcml6aW5nIHRoaXMgaWYgdGhlcmUgYXJlIG11bHRpcGxlIGZpbHRlciBidXR0b25zXG4gIGFsbEZpbHRlcnNCdXR0b24oKSB7XG4gICAgcmV0dXJuIGN5LmdldChcIi5maWx0ZXItdG9nZ2xlXCIpLmNsaWNrKHsgZm9yY2U6IHRydWUgfSk7XG4gIH1cblxuICAvLyDwn5ugIFNlYXJjaCBhbmQgc2VsZWN0IGEgbG9jYXRpb24gZnJvbSB0aGUgc3VnZ2VzdGlvbnNcbiAgLy8gQ29uc2lkZXIgd2FpdGluZyBmb3Igc3VnZ2VzdGlvbnMgdG8gYXBwZWFyIG9yIG1ha2UgdGhpcyBtb3JlIGR5bmFtaWNcbiAgdHlwZUxvY2F0aW9uKGxvY2F0aW9uKSB7XG4gICAgY3kuZ2V0KFwiLmZvcm1fX3NlYXJjaC5hdXRvc2VhcmNoXCIpLmVxKDEpLnR5cGUobG9jYXRpb24sIHsgZm9yY2U6IHRydWUgfSk7XG4gICAgY3kuZ2V0KFwiLm9tbmlzZWFyY2hfX2NpdHlhZGRyZXNzLmNoZWNrXCIpXG4gICAgICAuZmluZChcImRpdiA+IHVsID4gbGkgPiBkaXYgPiBzcGFuXCIpXG4gICAgICAuY29udGFpbnMobG9jYXRpb24pIC8vIOKchSBvbmx5IGAuY29udGFpbnMoKWAgaXMgZW5vdWdoOyBubyBuZWVkIGZvciBgLmVxKDEpYFxuICAgICAgLmNsaWNrKCk7XG4gIH1cblxuICAvLyDinIUgQ2xpY2sgb24gdGhlIGZhdm9yaXRlIChzYXZlKSBpY29uIG9uIGEgbGlzdGluZ1xuICBjbGlja0Zhdm9yaXRlSWNvbigpIHtcbiAgICByZXR1cm4gY3lcbiAgICAgIC5nZXQoXCIuYXB0Y2FyZF9fY29udGVudC0tc2F2ZS5mYXZidG4ucG9wdXAtY2xpY2thYmxlcyA+IHNwYW4gPiBzdmdcIilcbiAgICAgIC5lcSgxKVxuICAgICAgLmNsaWNrKCk7XG4gIH1cblxuICAvLyDinIUgR2V0IHRoZSBzaWduLWluIG1vZGFsIHdoZW4gYW4gYWN0aW9uIHJlcXVpcmVzIGF1dGhlbnRpY2F0aW9uXG4gIHNpZ25Jbk1vZGFsQm94KCkge1xuICAgIHJldHVybiBjeS5nZXQoJ2RpdltkYXRhLWVsZW1lbnRvci10eXBlPVwicG9wdXBcIl0nKTtcbiAgfVxuXG4gIC8vIOKchSBHZXQgYWxsIHBhZ2luYXRpb24gbnVtYmVyc1xuICBwYWdpbmF0aW9uTnVtYmVyKCkge1xuICAgIHJldHVybiBjeS5nZXQoXCIucGFnaW5hdGlvbl9fbGlzdCA+IGxpID4gYVwiKTtcbiAgfVxuXG4gIC8vIOKchSBHZXQgdGhlICdOZXh0JyBidXR0b24gaW4gcGFnaW5hdGlvblxuICBuZXh0QnV0dG9uKCkge1xuICAgIHJldHVybiBjeS5nZXQoJy5wYWdpbmF0aW9uX19saXN0ID4gbGkgPiBhID4gc3BhbltjbGFzcz1cImljb25cIl0nLCB7XG4gICAgICB0aW1lb3V0OiA1MDAwLFxuICAgIH0pO1xuICB9XG5cbiAgLy8g4pyFIEdldCB0aGUgY3VycmVudGx5IGFjdGl2ZSBwYWdlIGluIHBhZ2luYXRpb25cbiAgYWN0aXZlUGFnZSgpIHtcbiAgICByZXR1cm4gY3kuZ2V0KFwiLnBhZ2luYXRpb25fX2xpc3QgPiBsaSA+IGEuYWN0aXZlXCIsIHsgdGltZW91dDogNTAwMCB9KTtcbiAgfVxuXG4gIC8vIPCfm6AgTmF2aWdhdGUgdG8gdGhlIGxhc3QgcGFnZSBieSBpdGVyYXRpbmcgdGhyb3VnaCBwYWdpbmF0aW9uXG4gIC8vIFRoaXMgaXMgY2xldmVyIOKAlCBuaWNlIGpvYiBhdm9pZGluZyBpbmZpbml0ZSBsb29wcyFcbiAgbmF2VG9MYXN0UGFnZSgpIHtcbiAgICBsZXQgcHJldmlvdXNQYWdlcyA9IG5ldyBTZXQoKTtcblxuICAgIGNvbnN0IGdvVG9MYXN0UGFnZSA9ICgpID0+IHtcbiAgICAgIHRoaXMuYWN0aXZlUGFnZSgpXG4gICAgICAgIC5pbnZva2UoXCJ0ZXh0XCIpXG4gICAgICAgIC50aGVuKChjdXJyZW50UGFnZSkgPT4ge1xuICAgICAgICAgIGlmIChwcmV2aW91c1BhZ2VzLmhhcyhjdXJyZW50UGFnZSkpIHtcbiAgICAgICAgICAgIGN5LmxvZyhcIlJlYWNoZWQgdGhlIGxhc3QgcGFnZSwgc3RvcHBpbmcgbmF2aWdhdGlvbi5cIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcHJldmlvdXNQYWdlcy5hZGQoY3VycmVudFBhZ2UpO1xuXG4gICAgICAgICAgdGhpcy5uZXh0QnV0dG9uKCkudGhlbigoJG5leHQpID0+IHtcbiAgICAgICAgICAgIGlmICgkbmV4dC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgY3kubG9nKFwiTm8gbW9yZSBwYWdlcyBsZWZ0IHRvIG5hdmlnYXRlLlwiKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjeS53cmFwKCRuZXh0KS5sYXN0KCkuY2xpY2soKTsgLy8g4pyFIEFsd2F5cyB1c2UgYC5sYXN0KClgIGZvciByb2J1c3RuZXNzXG4gICAgICAgICAgICBjeS53YWl0KDUwMCk7IC8vIPCfm6AgQ29uc2lkZXIgdXNpbmcgYGN5LmludGVyY2VwdCgpYCBmb3IgQVBJIHdhaXQgaW5zdGVhZFxuICAgICAgICAgICAgZ29Ub0xhc3RQYWdlKCk7IC8vIPCflIEgUmVjdXJzaXZlIGNhbGxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGdvVG9MYXN0UGFnZSgpOyAvLyDwn5SBIEtpY2tzdGFydCByZWN1cnNpb25cbiAgfVxuXG4gIC8vIPCfm6AgU2VsZWN0IGEgc29ydGluZyBvcHRpb24gZnJvbSBkcm9wZG93blxuICBzb3J0T3B0aW9uKG9wdGlvbikge1xuICAgIGN5LmdldChcIi5zZWFyY2hyZXN1bHRfX2hlYWRlci0taGVhZGluZy0tc29ydGluZ1wiKS5jbGljaygpO1xuICAgIGN5LmdldChcbiAgICAgIGAuY3NzZWxlY3Qtd3JhcHBlciA+IGRpdiA+IC5jdXN0b20tb3B0aW9ucyA+IHNwYW5bZGF0YS12YWx1ZT0nJHtvcHRpb259J11gXG4gICAgKS5jbGljaygpO1xuICB9XG5cbiAgLy8g4pyFIEdldCBzZWxlY3RlZCB2YWx1ZSBmcm9tIHNvcnRpbmcgZHJvcGRvd25cbiAgZ2V0U29ydGVkVmFsdWUoKSB7XG4gICAgcmV0dXJuIGN5LmdldChcIi5jc3NlbGVjdC5mb2N1cyA+IHNwYW5cIik7XG4gIH1cblxuICAvLyDinIUgR2V0ICdubyBwcm9wZXJ0eSBmb3VuZCcgbWVzc2FnZVxuICBub1Byb3BlcnR5TWVzc2FnZSgpIHtcbiAgICByZXR1cm4gY3kuZ2V0KFwiLm5vLXJlc3VsdHMtbWVzc2FnZVwiKTtcbiAgfVxuXG5cbiAgLy8g8J+boCBDbGljayBvbiBtYXAgdmlldyB0b2dnbGVcbiAgbWFwVG9nZ2xlKCkge1xuICAgIHJldHVybiBjeS5nZXQoXCIjbWFwLWxpc3Qtc3dpdGNoID4gbGFiZWxcIikuY29udGFpbnMoXCJNYXBcIikuY2xpY2soKTsgLy8g8J+UgSBBZGRlZCAuY2xpY2soKVxuICB9XG5cbiAgLy8g8J+boCBDbGljayBvbiBsaXN0IHZpZXcgdG9nZ2xlXG4gIGxpc3RUb2dnbGUoKSB7XG4gICAgcmV0dXJuIGN5LmdldChcIiNtYXAtbGlzdC1zd2l0Y2ggPiBsYWJlbFwiKS5jb250YWlucyhcIkxpc3RcIikuY2xpY2soKTsgLy8g8J+UgSBBZGRlZCAuY2xpY2soKVxuICB9XG5cbiAgLy8gQ2xpY2sgc2F2ZSBzZWFyY2ggYnV0dG9uIFxuICBzYXZlU2VhcmNoKCkge1xuICAgIHJldHVybiBjeS5nZXQoXCIuc2F2ZWQtc2VhcmNoLWJ0bi1kZWZhdWx0XCIpLmNsaWNrKCk7XG4gIH1cblxuICAvLyBHZXQgU2F2ZWQgU2VhcmNoIFRleHRcbiAgc2F2ZWRTZWFyY2hUZXh0KCkge1xuICAgIHJldHVybiBjeS5nZXQoJy5zYXZlZC1zZWFyY2gtYnRuLWRlZmF1bHQuYWN0aXZlJykuaW52b2tlKCd0ZXh0JylcbiAgfVxuXG5cblxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFByb3BlcnR5U2hhcmVkRWxlbWVudHMiLCJmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KGUpIHtcbiAgcmV0dXJuIGUgJiYgZS5fX2VzTW9kdWxlID8gZSA6IHtcbiAgICBcImRlZmF1bHRcIjogZVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0LCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8qXG4gKlxuICogVGVzdCBTY2VuYXJpb3M6XG4gKlxuICogMS4gR3Vlc3QgdXNlcnMgc2hvdWxkIGJlIHJlZGlyZWN0ZWQgdG8gU2lnbi1JbiBvbiBhY2Nlc3NpbmcgU2F2ZWQgU2VhcmNoZXMuXG4gKiAyLiBBdXRoZW50aWNhdGVkIHVzZXJzIHNob3VsZCBiZSBhYmxlIHRvIHNhdmUgYSBzZWFyY2ggKHRyeSBtdWx0aXBsZSBjb21iaW5hdGlvbnMpLlxuICogMy4gU2F2ZWQgc2VhcmNoZXMgc2hvdWxkIGFwcGVhciBjb3JyZWN0bHkgb24gdGhlIFNhdmVkIFNlYXJjaGVzIHBhZ2UuXG4gKiA0LiBObyBkdXBsaWNhdGUgc2F2ZWQgc2VhcmNoZXMgc2hvdWxkIGJlIGFsbG93ZWQuXG4gKiA1LiBVc2VycyBzaG91bGQgYmUgYWJsZSB0byBuYXZpZ2F0ZSB0byBsaXN0aW5ncyB1c2luZyBhIHNhdmVkIHNlYXJjaC5cbiAqXG4gKi9cblxuaW1wb3J0IFByb3BlcnR5U2hhcmVkRWxlbWVudHMgZnJvbSBcIi4uLy4uL3N1cHBvcnQvcGFnZXMvcHVibGljUGFnZXMvcHJvcGVydHktc2hhcmVkLWVsZW1lbnRzXCI7XG5pbXBvcnQgU2F2ZWRTZWFyY2hlc1BhZ2UgZnJvbSBcIi4uLy4uL3N1cHBvcnQvcGFnZXMvcHJpdmF0ZVBhZ2VzL3NhdmVkLXNlYXJjaGVzLXBhZ2VcIjtcbmltcG9ydCBEYXNoYm9hcmQgZnJvbSBcIi4uLy4uL3N1cHBvcnQvcGFnZXMvcHJpdmF0ZVBhZ2VzL2Rhc2hib2FyZC1wYWdlXCI7XG5cbmNvbnN0IHNoYXJlZEVsZW1lbnRzID0gbmV3IFByb3BlcnR5U2hhcmVkRWxlbWVudHMoKTtcbmNvbnN0IHNhdmVkU2VhcmNoUGFnZSA9IG5ldyBTYXZlZFNlYXJjaGVzUGFnZSgpO1xuY29uc3QgZGFzaGJvYXJkUGFnZSA9IG5ldyBEYXNoYm9hcmQoKTtcbmxldCBsaXN0aW5nTG9jYXRpb247XG5cbi8vIFRlc3QgU3VpdGU6IEd1ZXN0IFVzZXJcbmRlc2NyaWJlKFwiU2F2ZWQgU2VhcmNoZXMgLSBHdWVzdCBVc2VyIEFjY2Vzc1wiLCAoKSA9PiB7XG4gIGl0KFwiU2hvdWxkIHJlZGlyZWN0IGd1ZXN0IHVzZXIgdG8gU2lnbi1JbiBwYWdlIHdoZW4gYWNjZXNzaW5nIFNhdmVkIFNlYXJjaGVzXCIsICgpID0+IHtcbiAgICBjeS52aXNpdChcIi9zYXZlZC1zZWFyY2hlc1wiKTtcbiAgICBjeS51cmwoKS5zaG91bGQoXCJpbmNsdWRlXCIsIFwiL3NpZ24taW5cIik7XG4gIH0pO1xufSk7XG5cbi8vIFRlc3QgU3VpdGU6IEF1dGhlbnRpY2F0ZWQgVXNlclxuZGVzY3JpYmUoXCJTYXZlZCBTZWFyY2hlcyAtIEF1dGhlbnRpY2F0ZWQgVXNlciBGdW5jdGlvbmFsaXR5XCIsICgpID0+IHtcbiAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgY3kudmlzaXRTaWduSW4oKTtcbiAgICBjeS5maXh0dXJlKFwic2lnbi1pblwiKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICBjeS5sb2dpbihkYXRhLmVtYWlsQWRkcmVzcywgZGF0YS5wYXNzd29yZCk7XG4gICAgfSk7XG4gICAgY3kuZml4dHVyZShcImxvY2F0aW9uXCIpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIGxpc3RpbmdMb2NhdGlvbiA9IGRhdGE7XG4gICAgfSk7XG4gICAgY3kudmlzaXQoXCIvbGlzdGluZ3NcIik7XG4gIH0pO1xuXG4gIC8vIEVuc3VyZSB0aGF0IHVzZXIgaXMgYWJsZSB0byBzZWUgc2F2ZWQgc2VhcmNoIGluIHNhdmVkIHNlYXJjaCBwYWdlXG5cbiAgaXQoXCJTaG91bGQgYWxsb3cgdXNlciB0byBzYXZlIGEgc2VhcmNoIGFuZCB2aWV3IGl0IGluIFNhdmVkIFNlYXJjaGVzIHBhZ2VcIiwgKCkgPT4ge1xuICAgIHNoYXJlZEVsZW1lbnRzLnR5cGVMb2NhdGlvbihsaXN0aW5nTG9jYXRpb24ub3JsYW5kbyk7XG4gICAgc2hhcmVkRWxlbWVudHMuc2F2ZVNlYXJjaCgpO1xuICAgIGN5LnZpc2l0KFwiL3NhdmVkLXNlYXJjaGVzXCIpO1xuICAgIHNhdmVkU2VhcmNoUGFnZS5zYXZlZFNlYXJjaFRpdGxlKCkudGhlbigodGV4dCkgPT4ge1xuICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IHRleHQucmVwbGFjZSgvXFxzKy9nLCBcIiBcIikudHJpbSgpO1xuICAgICAgZXhwZWN0KG5vcm1hbGl6ZWQpLnRvLmluY2x1ZGUobGlzdGluZ0xvY2F0aW9uLm9ybGFuZG8pO1xuICAgIH0pO1xuICB9KTtcblxuICAvLyBFbnN1cmUgdGhhdCB1c2VyIGNhbiBkZWxldGUgdGhlIHNhdmVkIHNlYXJjaGVzXG4gIGl0KFwiU2hvdWxkIGFsbG93IHVzZXIgdG8gZGVsZXRlIHRoZSBzYXZlZCBzZWFyY2hcIiwgKCkgPT4ge1xuICAgIGN5LnZpc2l0KFwiL3NhdmVkLXNlYXJjaGVzXCIpO1xuXG4gICAgc2F2ZWRTZWFyY2hQYWdlLmRlbGV0ZVNhdmVkU2VhcmNoKFwiUHJvcGVydHkgVHlwZTogSG91c2VcIik7XG4gICAgc2F2ZWRTZWFyY2hQYWdlLmRlbGV0ZUNvbmZpcm1hdGlvbkJ1dHRvbigpO1xuICB9KTtcbn0pO1xuIl0sIm5hbWVzIjpbIkRhc2hib2FyZCIsInZpc2l0IiwiY3kiLCJnZXRVc2VyTmFtZSIsImdldCIsInVzZXJQcm9maWxlRWRpdEJ0biIsImNsaWNrIiwiZ2V0T3B0aW9uQ2FyZCIsIm9wdGlvblRleHQiLCJjb250YWlucyIsImNsaWNrT3B0aW9uTGluayIsInBhdGgiLCJzaWdub3V0IiwiX2RlZmF1bHQiLCJleHBvcnRzIiwiZGVmYXVsdCIsIm1vZHVsZSIsIlNhdmVkU2VhcmNoZXNQYWdlIiwic2F2ZWRTZWFyY2hUaXRsZSIsImludm9rZSIsInNhdmVkU2VhcmNoRWRpdE1vZGUiLCJzYXZlZFNlYXJjaEZpcnN0Q2FyZCIsImZpbmQiLCJmaXJzdCIsImRlbGV0ZVNhdmVkU2VhcmNoIiwidGl0bGUiLCJhcyIsImRlbGV0ZUNvbmZpcm1hdGlvbkJ1dHRvbiIsIlByb3BlcnR5U2hhcmVkRWxlbWVudHMiLCJwcm9wZXJ0eUFkZHJlc3MiLCJ0aW1lb3V0IiwiYWxsRmlsdGVyc0J1dHRvbiIsImZvcmNlIiwidHlwZUxvY2F0aW9uIiwibG9jYXRpb24iLCJlcSIsInR5cGUiLCJjbGlja0Zhdm9yaXRlSWNvbiIsInNpZ25Jbk1vZGFsQm94IiwicGFnaW5hdGlvbk51bWJlciIsIm5leHRCdXR0b24iLCJhY3RpdmVQYWdlIiwibmF2VG9MYXN0UGFnZSIsInByZXZpb3VzUGFnZXMiLCJTZXQiLCJnb1RvTGFzdFBhZ2UiLCJ0aGVuIiwiY3VycmVudFBhZ2UiLCJoYXMiLCJsb2ciLCJhZGQiLCIkbmV4dCIsImxlbmd0aCIsIndyYXAiLCJsYXN0Iiwid2FpdCIsInNvcnRPcHRpb24iLCJvcHRpb24iLCJnZXRTb3J0ZWRWYWx1ZSIsIm5vUHJvcGVydHlNZXNzYWdlIiwibWFwVG9nZ2xlIiwibGlzdFRvZ2dsZSIsInNhdmVTZWFyY2giLCJzYXZlZFNlYXJjaFRleHQiLCJfcHJvcGVydHlTaGFyZWRFbGVtZW50cyIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiX3NhdmVkU2VhcmNoZXNQYWdlIiwiX2Rhc2hib2FyZFBhZ2UiLCJzaGFyZWRFbGVtZW50cyIsInNhdmVkU2VhcmNoUGFnZSIsImRhc2hib2FyZFBhZ2UiLCJsaXN0aW5nTG9jYXRpb24iLCJkZXNjcmliZSIsIml0IiwidXJsIiwic2hvdWxkIiwiYmVmb3JlRWFjaCIsInZpc2l0U2lnbkluIiwiZml4dHVyZSIsImRhdGEiLCJsb2dpbiIsImVtYWlsQWRkcmVzcyIsInBhc3N3b3JkIiwib3JsYW5kbyIsInRleHQiLCJub3JtYWxpemVkIiwicmVwbGFjZSIsInRyaW0iLCJleHBlY3QiLCJ0byIsImluY2x1ZGUiXSwic291cmNlUm9vdCI6IiJ9