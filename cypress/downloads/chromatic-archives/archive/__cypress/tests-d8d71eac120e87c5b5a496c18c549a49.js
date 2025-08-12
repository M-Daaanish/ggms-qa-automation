/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./cypress/support/pages/publicPages/property-map-view-page.js":
/*!*********************************************************************!*\
  !*** ./cypress/support/pages/publicPages/property-map-view-page.js ***!
  \*********************************************************************/
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
class MapPage {
  // Get map section 

  mapView() {
    return cy.get('.searchresult__map');
  }
  drawMode() {
    return cy.get('#toggle-free-draw');
  }
  propertyMarkers() {
    return cy.get('gmp-advanced-marker');
  }
  boundaryPolygon() {
    return cy.get('.gm-style .leaflet-interactive, .gm-style-polygon, path');
  }
}
var _default = exports["default"] = MapPage;
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
/*!************************************************!*\
  !*** ./cypress/e2e/publicPages/map-view.cy.js ***!
  \************************************************/


var _interopRequireDefault = __webpack_require__(/*! ../../Library/Caches/Cypress/14.0.3/Cypress.app/Contents/Resources/app/node_modules/@babel/runtime/helpers/interopRequireDefault.js */ "../../Library/Caches/Cypress/14.0.3/Cypress.app/Contents/Resources/app/node_modules/@babel/runtime/helpers/interopRequireDefault.js");
var _propertyMapViewPage = _interopRequireDefault(__webpack_require__(/*! ../../support/pages/publicPages/property-map-view-page */ "./cypress/support/pages/publicPages/property-map-view-page.js"));
var _propertySharedElements = _interopRequireDefault(__webpack_require__(/*! ../../support/pages/publicPages/property-shared-elements */ "./cypress/support/pages/publicPages/property-shared-elements.js"));
// Importing Page Objects to separate UI logic for reusability and maintainability

// Instantiating Page Object classes
const sharedElements = new _propertySharedElements.default();
const mapPage = new _propertyMapViewPage.default();
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
    mapPage.propertyMarkers().should("exist") // At least one marker exists
    .and("have.length.at.least", 1) // Ensure there's at least one marker
    .and("be.visible"); // Ensure markers are visible

    // Verify that boundary polygon is drawn around the searched area
    mapPage.boundaryPolygon().should("exist"); // Assert that boundary is present
  });
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LFFBQVEsQ0FBQywyQkFBMkIsRUFBRSxNQUFNO0VBQzFDO0VBQ0E7RUFDQUMsVUFBVSxDQUFDLE1BQU07SUFDZnhELEVBQUUsQ0FBQ3lELEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ3ZCSixjQUFjLENBQUNSLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5QixDQUFDLENBQUM7O0VBRUY7RUFDQWEsRUFBRSxDQUFDLDhEQUE4RCxFQUFFLE1BQU07SUFDdkVKLE9BQU8sQ0FBQ3ZELE9BQU8sQ0FBQyxDQUFDLENBQUM0RCxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztFQUMxQyxDQUFDLENBQUM7O0VBRUY7RUFDQUQsRUFBRSxDQUFDLDhFQUE4RSxFQUFFLE1BQU07SUFDdkZMLGNBQWMsQ0FBQ3RDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDOztJQUV4QztJQUNBdUMsT0FBTyxDQUNKbkQsZUFBZSxDQUFDLENBQUMsQ0FDakJ3RCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFBQSxDQUNoQkMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQUEsQ0FDL0JBLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDOztJQUV0QjtJQUNBTixPQUFPLENBQUNsRCxlQUFlLENBQUMsQ0FBQyxDQUFDdUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7RUFDN0MsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nZ21zdGVzdGF1dG9tYXRpb24vLi9jeXByZXNzL3N1cHBvcnQvcGFnZXMvcHVibGljUGFnZXMvcHJvcGVydHktbWFwLXZpZXctcGFnZS5qcyIsIndlYnBhY2s6Ly9nZ21zdGVzdGF1dG9tYXRpb24vLi9jeXByZXNzL3N1cHBvcnQvcGFnZXMvcHVibGljUGFnZXMvcHJvcGVydHktc2hhcmVkLWVsZW1lbnRzLmpzIiwid2VicGFjazovL2dnbXN0ZXN0YXV0b21hdGlvbi8uLi8uLi9MaWJyYXJ5L0NhY2hlcy9DeXByZXNzLzE0LjAuMy9DeXByZXNzLmFwcC9Db250ZW50cy9SZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdC5qcyIsIndlYnBhY2s6Ly9nZ21zdGVzdGF1dG9tYXRpb24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZ2dtc3Rlc3RhdXRvbWF0aW9uLy4vY3lwcmVzcy9lMmUvcHVibGljUGFnZXMvbWFwLXZpZXcuY3kuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgTWFwUGFnZSB7XG5cblxuLy8gR2V0IG1hcCBzZWN0aW9uIFxuXG5tYXBWaWV3KCkge1xuICAgIHJldHVybiBjeS5nZXQoJy5zZWFyY2hyZXN1bHRfX21hcCcpO1xufVxuXG5kcmF3TW9kZSgpIHtcbiAgICByZXR1cm4gY3kuZ2V0KCcjdG9nZ2xlLWZyZWUtZHJhdycpO1xufVxuXG5wcm9wZXJ0eU1hcmtlcnMoKSB7XG4gICAgcmV0dXJuIGN5LmdldCgnZ21wLWFkdmFuY2VkLW1hcmtlcicpO1xuICB9XG5cbmJvdW5kYXJ5UG9seWdvbigpIHtcbiAgICByZXR1cm4gY3kuZ2V0KCcuZ20tc3R5bGUgLmxlYWZsZXQtaW50ZXJhY3RpdmUsIC5nbS1zdHlsZS1wb2x5Z29uLCBwYXRoJyk7XG4gIH0gXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWFwUGFnZSIsImNsYXNzIFByb3BlcnR5U2hhcmVkRWxlbWVudHMge1xuXG5cbiAgLy8g4pyFIEdldCB0aGUgcHJvcGVydHkgYWRkcmVzcyBlbGVtZW50XG4gIHByb3BlcnR5QWRkcmVzcygpIHtcbiAgICByZXR1cm4gY3kuZ2V0KFwiLmFwdGNhcmRfX2NvbnRlbnQtLWFkZHJlc3NcIiwgeyB0aW1lb3V0OiAxMDAwMCB9KTtcbiAgfVxuXG4gIC8vIPCfm6AgQ2xpY2sgb24gdGhlICdBbGwgRmlsdGVycycgYnV0dG9uXG4gIC8vIENvbnNpZGVyIHBhcmFtZXRlcml6aW5nIHRoaXMgaWYgdGhlcmUgYXJlIG11bHRpcGxlIGZpbHRlciBidXR0b25zXG4gIGFsbEZpbHRlcnNCdXR0b24oKSB7XG4gICAgcmV0dXJuIGN5LmdldChcIi5maWx0ZXItdG9nZ2xlXCIpLmNsaWNrKHsgZm9yY2U6IHRydWUgfSk7XG4gIH1cblxuICAvLyDwn5ugIFNlYXJjaCBhbmQgc2VsZWN0IGEgbG9jYXRpb24gZnJvbSB0aGUgc3VnZ2VzdGlvbnNcbiAgLy8gQ29uc2lkZXIgd2FpdGluZyBmb3Igc3VnZ2VzdGlvbnMgdG8gYXBwZWFyIG9yIG1ha2UgdGhpcyBtb3JlIGR5bmFtaWNcbiAgdHlwZUxvY2F0aW9uKGxvY2F0aW9uKSB7XG4gICAgY3kuZ2V0KFwiLmZvcm1fX3NlYXJjaC5hdXRvc2VhcmNoXCIpLmVxKDEpLnR5cGUobG9jYXRpb24sIHsgZm9yY2U6IHRydWUgfSk7XG4gICAgY3kuZ2V0KFwiLm9tbmlzZWFyY2hfX2NpdHlhZGRyZXNzLmNoZWNrXCIpXG4gICAgICAuZmluZChcImRpdiA+IHVsID4gbGkgPiBkaXYgPiBzcGFuXCIpXG4gICAgICAuY29udGFpbnMobG9jYXRpb24pIC8vIOKchSBvbmx5IGAuY29udGFpbnMoKWAgaXMgZW5vdWdoOyBubyBuZWVkIGZvciBgLmVxKDEpYFxuICAgICAgLmNsaWNrKCk7XG4gIH1cblxuICAvLyDinIUgQ2xpY2sgb24gdGhlIGZhdm9yaXRlIChzYXZlKSBpY29uIG9uIGEgbGlzdGluZ1xuICBjbGlja0Zhdm9yaXRlSWNvbigpIHtcbiAgICByZXR1cm4gY3lcbiAgICAgIC5nZXQoXCIuYXB0Y2FyZF9fY29udGVudC0tc2F2ZS5mYXZidG4ucG9wdXAtY2xpY2thYmxlcyA+IHNwYW4gPiBzdmdcIilcbiAgICAgIC5lcSgxKVxuICAgICAgLmNsaWNrKCk7XG4gIH1cblxuICAvLyDinIUgR2V0IHRoZSBzaWduLWluIG1vZGFsIHdoZW4gYW4gYWN0aW9uIHJlcXVpcmVzIGF1dGhlbnRpY2F0aW9uXG4gIHNpZ25Jbk1vZGFsQm94KCkge1xuICAgIHJldHVybiBjeS5nZXQoJ2RpdltkYXRhLWVsZW1lbnRvci10eXBlPVwicG9wdXBcIl0nKTtcbiAgfVxuXG4gIC8vIOKchSBHZXQgYWxsIHBhZ2luYXRpb24gbnVtYmVyc1xuICBwYWdpbmF0aW9uTnVtYmVyKCkge1xuICAgIHJldHVybiBjeS5nZXQoXCIucGFnaW5hdGlvbl9fbGlzdCA+IGxpID4gYVwiKTtcbiAgfVxuXG4gIC8vIOKchSBHZXQgdGhlICdOZXh0JyBidXR0b24gaW4gcGFnaW5hdGlvblxuICBuZXh0QnV0dG9uKCkge1xuICAgIHJldHVybiBjeS5nZXQoJy5wYWdpbmF0aW9uX19saXN0ID4gbGkgPiBhID4gc3BhbltjbGFzcz1cImljb25cIl0nLCB7XG4gICAgICB0aW1lb3V0OiA1MDAwLFxuICAgIH0pO1xuICB9XG5cbiAgLy8g4pyFIEdldCB0aGUgY3VycmVudGx5IGFjdGl2ZSBwYWdlIGluIHBhZ2luYXRpb25cbiAgYWN0aXZlUGFnZSgpIHtcbiAgICByZXR1cm4gY3kuZ2V0KFwiLnBhZ2luYXRpb25fX2xpc3QgPiBsaSA+IGEuYWN0aXZlXCIsIHsgdGltZW91dDogNTAwMCB9KTtcbiAgfVxuXG4gIC8vIPCfm6AgTmF2aWdhdGUgdG8gdGhlIGxhc3QgcGFnZSBieSBpdGVyYXRpbmcgdGhyb3VnaCBwYWdpbmF0aW9uXG4gIC8vIFRoaXMgaXMgY2xldmVyIOKAlCBuaWNlIGpvYiBhdm9pZGluZyBpbmZpbml0ZSBsb29wcyFcbiAgbmF2VG9MYXN0UGFnZSgpIHtcbiAgICBsZXQgcHJldmlvdXNQYWdlcyA9IG5ldyBTZXQoKTtcblxuICAgIGNvbnN0IGdvVG9MYXN0UGFnZSA9ICgpID0+IHtcbiAgICAgIHRoaXMuYWN0aXZlUGFnZSgpXG4gICAgICAgIC5pbnZva2UoXCJ0ZXh0XCIpXG4gICAgICAgIC50aGVuKChjdXJyZW50UGFnZSkgPT4ge1xuICAgICAgICAgIGlmIChwcmV2aW91c1BhZ2VzLmhhcyhjdXJyZW50UGFnZSkpIHtcbiAgICAgICAgICAgIGN5LmxvZyhcIlJlYWNoZWQgdGhlIGxhc3QgcGFnZSwgc3RvcHBpbmcgbmF2aWdhdGlvbi5cIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcHJldmlvdXNQYWdlcy5hZGQoY3VycmVudFBhZ2UpO1xuXG4gICAgICAgICAgdGhpcy5uZXh0QnV0dG9uKCkudGhlbigoJG5leHQpID0+IHtcbiAgICAgICAgICAgIGlmICgkbmV4dC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgY3kubG9nKFwiTm8gbW9yZSBwYWdlcyBsZWZ0IHRvIG5hdmlnYXRlLlwiKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjeS53cmFwKCRuZXh0KS5sYXN0KCkuY2xpY2soKTsgLy8g4pyFIEFsd2F5cyB1c2UgYC5sYXN0KClgIGZvciByb2J1c3RuZXNzXG4gICAgICAgICAgICBjeS53YWl0KDUwMCk7IC8vIPCfm6AgQ29uc2lkZXIgdXNpbmcgYGN5LmludGVyY2VwdCgpYCBmb3IgQVBJIHdhaXQgaW5zdGVhZFxuICAgICAgICAgICAgZ29Ub0xhc3RQYWdlKCk7IC8vIPCflIEgUmVjdXJzaXZlIGNhbGxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGdvVG9MYXN0UGFnZSgpOyAvLyDwn5SBIEtpY2tzdGFydCByZWN1cnNpb25cbiAgfVxuXG4gIC8vIPCfm6AgU2VsZWN0IGEgc29ydGluZyBvcHRpb24gZnJvbSBkcm9wZG93blxuICBzb3J0T3B0aW9uKG9wdGlvbikge1xuICAgIGN5LmdldChcIi5zZWFyY2hyZXN1bHRfX2hlYWRlci0taGVhZGluZy0tc29ydGluZ1wiKS5jbGljaygpO1xuICAgIGN5LmdldChcbiAgICAgIGAuY3NzZWxlY3Qtd3JhcHBlciA+IGRpdiA+IC5jdXN0b20tb3B0aW9ucyA+IHNwYW5bZGF0YS12YWx1ZT0nJHtvcHRpb259J11gXG4gICAgKS5jbGljaygpO1xuICB9XG5cbiAgLy8g4pyFIEdldCBzZWxlY3RlZCB2YWx1ZSBmcm9tIHNvcnRpbmcgZHJvcGRvd25cbiAgZ2V0U29ydGVkVmFsdWUoKSB7XG4gICAgcmV0dXJuIGN5LmdldChcIi5jc3NlbGVjdC5mb2N1cyA+IHNwYW5cIik7XG4gIH1cblxuICAvLyDinIUgR2V0ICdubyBwcm9wZXJ0eSBmb3VuZCcgbWVzc2FnZVxuICBub1Byb3BlcnR5TWVzc2FnZSgpIHtcbiAgICByZXR1cm4gY3kuZ2V0KFwiLm5vLXJlc3VsdHMtbWVzc2FnZVwiKTtcbiAgfVxuXG5cbiAgLy8g8J+boCBDbGljayBvbiBtYXAgdmlldyB0b2dnbGVcbiAgbWFwVG9nZ2xlKCkge1xuICAgIHJldHVybiBjeS5nZXQoXCIjbWFwLWxpc3Qtc3dpdGNoID4gbGFiZWxcIikuY29udGFpbnMoXCJNYXBcIikuY2xpY2soKTsgLy8g8J+UgSBBZGRlZCAuY2xpY2soKVxuICB9XG5cbiAgLy8g8J+boCBDbGljayBvbiBsaXN0IHZpZXcgdG9nZ2xlXG4gIGxpc3RUb2dnbGUoKSB7XG4gICAgcmV0dXJuIGN5LmdldChcIiNtYXAtbGlzdC1zd2l0Y2ggPiBsYWJlbFwiKS5jb250YWlucyhcIkxpc3RcIikuY2xpY2soKTsgLy8g8J+UgSBBZGRlZCAuY2xpY2soKVxuICB9XG5cbiAgLy8gQ2xpY2sgc2F2ZSBzZWFyY2ggYnV0dG9uIFxuICBzYXZlU2VhcmNoKCkge1xuICAgIHJldHVybiBjeS5nZXQoXCIuc2F2ZWQtc2VhcmNoLWJ0bi1kZWZhdWx0XCIpLmNsaWNrKCk7XG4gIH1cblxuICAvLyBHZXQgU2F2ZWQgU2VhcmNoIFRleHRcbiAgc2F2ZWRTZWFyY2hUZXh0KCkge1xuICAgIHJldHVybiBjeS5nZXQoJy5zYXZlZC1zZWFyY2gtYnRuLWRlZmF1bHQuYWN0aXZlJykuaW52b2tlKCd0ZXh0JylcbiAgfVxuXG5cblxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFByb3BlcnR5U2hhcmVkRWxlbWVudHMiLCJmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KGUpIHtcbiAgcmV0dXJuIGUgJiYgZS5fX2VzTW9kdWxlID8gZSA6IHtcbiAgICBcImRlZmF1bHRcIjogZVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0LCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIEltcG9ydGluZyBQYWdlIE9iamVjdHMgdG8gc2VwYXJhdGUgVUkgbG9naWMgZm9yIHJldXNhYmlsaXR5IGFuZCBtYWludGFpbmFiaWxpdHlcbmltcG9ydCBNYXBQYWdlIGZyb20gXCIuLi8uLi9zdXBwb3J0L3BhZ2VzL3B1YmxpY1BhZ2VzL3Byb3BlcnR5LW1hcC12aWV3LXBhZ2VcIjtcbmltcG9ydCBQcm9wZXJ0eVNoYXJlZEVsZW1lbnRzIGZyb20gXCIuLi8uLi9zdXBwb3J0L3BhZ2VzL3B1YmxpY1BhZ2VzL3Byb3BlcnR5LXNoYXJlZC1lbGVtZW50c1wiO1xuXG4vLyBJbnN0YW50aWF0aW5nIFBhZ2UgT2JqZWN0IGNsYXNzZXNcbmNvbnN0IHNoYXJlZEVsZW1lbnRzID0gbmV3IFByb3BlcnR5U2hhcmVkRWxlbWVudHMoKTtcbmNvbnN0IG1hcFBhZ2UgPSBuZXcgTWFwUGFnZSgpO1xuXG5kZXNjcmliZShcIvCfl7rvuI8gTWFwIFZpZXcg4oCUIFRlc3QgU3VpdGVcIiwgKCkgPT4ge1xuICAvLyBIb29rIHRvIHJ1biBiZWZvcmUgZWFjaCB0ZXN0IGNhc2VcbiAgLy8gTmF2aWdhdGVzIHRvIHRoZSBsaXN0aW5ncyBwYWdlIGFuZCBzd2l0Y2hlcyB0byBtYXAgdmlld1xuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICBjeS52aXNpdChcIi9saXN0aW5nc1wiKTsgLy8gVmlzaXQgbGlzdGluZ3MgcGFnZVxuICAgIHNoYXJlZEVsZW1lbnRzLm1hcFRvZ2dsZSgpOyAvLyBUb2dnbGUgdG8gbWFwIHZpZXdcbiAgfSk7XG5cbiAgLy8g4pyFIFRlc3QgQ2FzZTogVmVyaWZ5IHRoYXQgbWFwIHZpZXcgaXMgZGlzcGxheWVkIHdoZW4gdXNlciB0b2dnbGVzIGZyb20gbGlzdCB2aWV3XG4gIGl0KFwic2hvdWxkIGRpc3BsYXkgdGhlIG1hcCB2aWV3IHdoZW4gdXNlciB0b2dnbGVzIGZyb20gbGlzdCB2aWV3XCIsICgpID0+IHtcbiAgICBtYXBQYWdlLm1hcFZpZXcoKS5zaG91bGQoXCJiZS52aXNpYmxlXCIpOyAvLyBBc3NlcnQgdGhhdCB0aGUgbWFwIHZpZXcgaXMgdmlzaWJsZVxuICB9KTtcblxuICAvLyDinIUgVGVzdCBDYXNlOiBTZWFyY2ggZm9yIGEgbG9jYXRpb24gYW5kIHZlcmlmeSBtYXJrZXJzIGFuZCBib3VuZGFyeSBhcmUgcmVuZGVyZWRcbiAgaXQoJ3Nob3VsZCBzZWFyY2ggZm9yIFwiT3JsYW5kb1wiIGFuZCBkaXNwbGF5IHByb3BlcnR5IG1hcmtlcnMgaW5zaWRlIHRoZSBib3VuZGFyeScsICgpID0+IHtcbiAgICBzaGFyZWRFbGVtZW50cy50eXBlTG9jYXRpb24oXCJPcmxhbmRvXCIpOyAvLyBFbnRlciBsb2NhdGlvbiBpbnRvIHNlYXJjaCBmaWVsZFxuXG4gICAgLy8gVmVyaWZ5IHRoYXQgcHJvcGVydHkgbWFya2VycyBhcmUgdmlzaWJsZSBhbmQgdGhlcmUgaXMgYXQgbGVhc3Qgb25lIHJlc3VsdFxuICAgIG1hcFBhZ2VcbiAgICAgIC5wcm9wZXJ0eU1hcmtlcnMoKVxuICAgICAgLnNob3VsZChcImV4aXN0XCIpIC8vIEF0IGxlYXN0IG9uZSBtYXJrZXIgZXhpc3RzXG4gICAgICAuYW5kKFwiaGF2ZS5sZW5ndGguYXQubGVhc3RcIiwgMSkgLy8gRW5zdXJlIHRoZXJlJ3MgYXQgbGVhc3Qgb25lIG1hcmtlclxuICAgICAgLmFuZChcImJlLnZpc2libGVcIik7IC8vIEVuc3VyZSBtYXJrZXJzIGFyZSB2aXNpYmxlXG5cbiAgICAvLyBWZXJpZnkgdGhhdCBib3VuZGFyeSBwb2x5Z29uIGlzIGRyYXduIGFyb3VuZCB0aGUgc2VhcmNoZWQgYXJlYVxuICAgIG1hcFBhZ2UuYm91bmRhcnlQb2x5Z29uKCkuc2hvdWxkKFwiZXhpc3RcIik7IC8vIEFzc2VydCB0aGF0IGJvdW5kYXJ5IGlzIHByZXNlbnRcbiAgfSk7XG59KTtcbiJdLCJuYW1lcyI6WyJNYXBQYWdlIiwibWFwVmlldyIsImN5IiwiZ2V0IiwiZHJhd01vZGUiLCJwcm9wZXJ0eU1hcmtlcnMiLCJib3VuZGFyeVBvbHlnb24iLCJfZGVmYXVsdCIsImV4cG9ydHMiLCJkZWZhdWx0IiwibW9kdWxlIiwiUHJvcGVydHlTaGFyZWRFbGVtZW50cyIsInByb3BlcnR5QWRkcmVzcyIsInRpbWVvdXQiLCJhbGxGaWx0ZXJzQnV0dG9uIiwiY2xpY2siLCJmb3JjZSIsInR5cGVMb2NhdGlvbiIsImxvY2F0aW9uIiwiZXEiLCJ0eXBlIiwiZmluZCIsImNvbnRhaW5zIiwiY2xpY2tGYXZvcml0ZUljb24iLCJzaWduSW5Nb2RhbEJveCIsInBhZ2luYXRpb25OdW1iZXIiLCJuZXh0QnV0dG9uIiwiYWN0aXZlUGFnZSIsIm5hdlRvTGFzdFBhZ2UiLCJwcmV2aW91c1BhZ2VzIiwiU2V0IiwiZ29Ub0xhc3RQYWdlIiwiaW52b2tlIiwidGhlbiIsImN1cnJlbnRQYWdlIiwiaGFzIiwibG9nIiwiYWRkIiwiJG5leHQiLCJsZW5ndGgiLCJ3cmFwIiwibGFzdCIsIndhaXQiLCJzb3J0T3B0aW9uIiwib3B0aW9uIiwiZ2V0U29ydGVkVmFsdWUiLCJub1Byb3BlcnR5TWVzc2FnZSIsIm1hcFRvZ2dsZSIsImxpc3RUb2dnbGUiLCJzYXZlU2VhcmNoIiwic2F2ZWRTZWFyY2hUZXh0IiwiX3Byb3BlcnR5TWFwVmlld1BhZ2UiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwicmVxdWlyZSIsIl9wcm9wZXJ0eVNoYXJlZEVsZW1lbnRzIiwic2hhcmVkRWxlbWVudHMiLCJtYXBQYWdlIiwiZGVzY3JpYmUiLCJiZWZvcmVFYWNoIiwidmlzaXQiLCJpdCIsInNob3VsZCIsImFuZCJdLCJzb3VyY2VSb290IjoiIn0=