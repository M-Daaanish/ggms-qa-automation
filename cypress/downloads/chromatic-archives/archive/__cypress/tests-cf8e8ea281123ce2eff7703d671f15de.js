/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./cypress/support/pages/publicPages/landing-page.js":
/*!***********************************************************!*\
  !*** ./cypress/support/pages/publicPages/landing-page.js ***!
  \***********************************************************/
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
class LandingPage {
  //Navigates to the landing page.

  visit() {
    cy.visit("/");
  }

  // Search and select location 
  typeLocation(location) {
    cy.get('input[class="form__search autosearch"]').type(location);
    cy.get('.omnisearch__cityaddress.check').find(' div > ul > li > div > span').eq(1).contains(location).click();
  }

  // Get location to search the property 
  getLocation() {
    return cy.get('input[name="tags-manual-suggestions"]');
  }

  // Get advance search widget 

  advanceSearchWidget() {
    return cy.get('div[data-id="6e02ad9"]', {
      timeout: 60000
    });
  }
}
var _default = exports["default"] = LandingPage;
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
/*!****************************************************!*\
  !*** ./cypress/e2e/publicPages/landing-test.cy.js ***!
  \****************************************************/


var _interopRequireDefault = __webpack_require__(/*! ../../Library/Caches/Cypress/14.0.3/Cypress.app/Contents/Resources/app/node_modules/@babel/runtime/helpers/interopRequireDefault.js */ "../../Library/Caches/Cypress/14.0.3/Cypress.app/Contents/Resources/app/node_modules/@babel/runtime/helpers/interopRequireDefault.js");
var _landingPage = _interopRequireDefault(__webpack_require__(/*! ../../support/pages/publicPages/landing-page */ "./cypress/support/pages/publicPages/landing-page.js"));
describe("Landing page test suite", () => {
  const landingPage = new _landingPage.default();
  let landingPageTestData;
  beforeEach(() => {
    // Visit the landing page before running tests
    landingPage.visit();

    // Load test data from fixture file
    cy.fixture("landing-page-data").then(testData => {
      landingPageTestData = testData;
    });
  });

  // Verify sees advance search widget

  it("Verify user can see advance search widget on landing page", () => {
    landingPage.advanceSearchWidget().should("be.visible");
  });

  // Verify navigation of user to the listing page on location selection
  it("Verify user navigation on location selection", () => {
    landingPage.typeLocation(landingPageTestData.propertyLocation);
    cy.url().should("include", `/listings/city/${landingPageTestData.propertyLocation}`);
  });
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZGluZy10ZXN0LmN5LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxNQUFNQSxXQUFXLENBQUM7RUFDaEI7O0VBRUFDLEtBQUtBLENBQUEsRUFBRztJQUNOQyxFQUFFLENBQUNELEtBQUssQ0FBQyxHQUFHLENBQUM7RUFDZjs7RUFHQTtFQUNBRSxZQUFZQSxDQUFDQyxRQUFRLEVBQUU7SUFDckJGLEVBQUUsQ0FBQ0csR0FBRyxDQUFDLHdDQUF3QyxDQUFDLENBQUNDLElBQUksQ0FBQ0YsUUFBUSxDQUFDO0lBQy9ERixFQUFFLENBQUNHLEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDRSxJQUFJLENBQUMsNkJBQTZCLENBQUMsQ0FBQ0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDQyxRQUFRLENBQUNMLFFBQVEsQ0FBQyxDQUFDTSxLQUFLLENBQUMsQ0FBQztFQUUvRzs7RUFFQTtFQUNBQyxXQUFXQSxDQUFBLEVBQUU7SUFDWCxPQUFPVCxFQUFFLENBQUNHLEdBQUcsQ0FBQyx1Q0FBdUMsQ0FBQztFQUN4RDs7RUFFQTs7RUFFQU8sbUJBQW1CQSxDQUFBLEVBQUc7SUFDcEIsT0FBT1YsRUFBRSxDQUFDRyxHQUFHLENBQUMsd0JBQXdCLEVBQUU7TUFBQ1EsT0FBTyxFQUFFO0lBQUssQ0FBQyxDQUFDO0VBQzNEO0FBS0Y7QUFBQyxJQUFBQyxRQUFBLEdBQUFDLGtCQUFBLEdBRWNmLFdBQVc7QUFBQWlCLE1BQUEsQ0FBQUYsT0FBQSxHQUFBQSxPQUFBLENBQUFDLE9BQUE7Ozs7Ozs7Ozs7QUMvQjFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMseUJBQXlCLFNBQVMseUJBQXlCOzs7Ozs7VUNMcEc7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7Ozs7OztBQ3RCQSxJQUFBRSxZQUFBLEdBQUFDLHNCQUFBLENBQUFDLG1CQUFBO0FBRUFDLFFBQVEsQ0FBQyx5QkFBeUIsRUFBRSxNQUFNO0VBQ3hDLE1BQU1DLFdBQVcsR0FBRyxJQUFJdEIsb0JBQVcsQ0FBQyxDQUFDO0VBQ3JDLElBQUl1QixtQkFBbUI7RUFFdkJDLFVBQVUsQ0FBQyxNQUFNO0lBQ2Y7SUFDQUYsV0FBVyxDQUFDckIsS0FBSyxDQUFDLENBQUM7O0lBRW5CO0lBQ0FDLEVBQUUsQ0FBQ3VCLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDQyxJQUFJLENBQUVDLFFBQVEsSUFBSztNQUNqREosbUJBQW1CLEdBQUdJLFFBQVE7SUFDaEMsQ0FBQyxDQUFDO0VBQ0osQ0FBQyxDQUFDOztFQUVGOztFQUVBQyxFQUFFLENBQUMsMkRBQTJELEVBQUUsTUFBTTtJQUNwRU4sV0FBVyxDQUFDVixtQkFBbUIsQ0FBQyxDQUFDLENBQUNpQixNQUFNLENBQUMsWUFBWSxDQUFDO0VBQ3hELENBQUMsQ0FBQzs7RUFFRjtFQUNBRCxFQUFFLENBQUMsOENBQThDLEVBQUUsTUFBTTtJQUN2RE4sV0FBVyxDQUFDbkIsWUFBWSxDQUFDb0IsbUJBQW1CLENBQUNPLGdCQUFnQixDQUFDO0lBQzlENUIsRUFBRSxDQUFDNkIsR0FBRyxDQUFDLENBQUMsQ0FBQ0YsTUFBTSxDQUNiLFNBQVMsRUFDVCxrQkFBa0JOLG1CQUFtQixDQUFDTyxnQkFBZ0IsRUFDeEQsQ0FBQztFQUNILENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ2dtc3Rlc3RhdXRvbWF0aW9uLy4vY3lwcmVzcy9zdXBwb3J0L3BhZ2VzL3B1YmxpY1BhZ2VzL2xhbmRpbmctcGFnZS5qcyIsIndlYnBhY2s6Ly9nZ21zdGVzdGF1dG9tYXRpb24vLi4vLi4vTGlicmFyeS9DYWNoZXMvQ3lwcmVzcy8xNC4wLjMvQ3lwcmVzcy5hcHAvQ29udGVudHMvUmVzb3VyY2VzL2FwcC9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHQuanMiLCJ3ZWJwYWNrOi8vZ2dtc3Rlc3RhdXRvbWF0aW9uL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2dnbXN0ZXN0YXV0b21hdGlvbi8uL2N5cHJlc3MvZTJlL3B1YmxpY1BhZ2VzL2xhbmRpbmctdGVzdC5jeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBMYW5kaW5nUGFnZSB7XG4gIC8vTmF2aWdhdGVzIHRvIHRoZSBsYW5kaW5nIHBhZ2UuXG5cbiAgdmlzaXQoKSB7XG4gICAgY3kudmlzaXQoXCIvXCIpO1xuICB9XG5cblxuICAvLyBTZWFyY2ggYW5kIHNlbGVjdCBsb2NhdGlvbiBcbiAgdHlwZUxvY2F0aW9uKGxvY2F0aW9uKSB7XG4gICAgY3kuZ2V0KCdpbnB1dFtjbGFzcz1cImZvcm1fX3NlYXJjaCBhdXRvc2VhcmNoXCJdJykudHlwZShsb2NhdGlvbik7XG4gICAgY3kuZ2V0KCcub21uaXNlYXJjaF9fY2l0eWFkZHJlc3MuY2hlY2snKS5maW5kKCcgZGl2ID4gdWwgPiBsaSA+IGRpdiA+IHNwYW4nKS5lcSgxKS5jb250YWlucyhsb2NhdGlvbikuY2xpY2soKTtcbiAgIFxuICB9XG5cbiAgLy8gR2V0IGxvY2F0aW9uIHRvIHNlYXJjaCB0aGUgcHJvcGVydHkgXG4gIGdldExvY2F0aW9uKCl7XG4gICAgcmV0dXJuIGN5LmdldCgnaW5wdXRbbmFtZT1cInRhZ3MtbWFudWFsLXN1Z2dlc3Rpb25zXCJdJyk7XG4gIH1cblxuICAvLyBHZXQgYWR2YW5jZSBzZWFyY2ggd2lkZ2V0IFxuXG4gIGFkdmFuY2VTZWFyY2hXaWRnZXQoKSB7XG4gICAgcmV0dXJuIGN5LmdldCgnZGl2W2RhdGEtaWQ9XCI2ZTAyYWQ5XCJdJywge3RpbWVvdXQ6IDYwMDAwfSk7XG4gIH1cblxuXG4gIFxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IExhbmRpbmdQYWdlO1xuIiwiZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChlKSB7XG4gIHJldHVybiBlICYmIGUuX19lc01vZHVsZSA/IGUgOiB7XG4gICAgXCJkZWZhdWx0XCI6IGVcbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdCwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJpbXBvcnQgTGFuZGluZ1BhZ2UgZnJvbSBcIi4uLy4uL3N1cHBvcnQvcGFnZXMvcHVibGljUGFnZXMvbGFuZGluZy1wYWdlXCI7XG5cbmRlc2NyaWJlKFwiTGFuZGluZyBwYWdlIHRlc3Qgc3VpdGVcIiwgKCkgPT4ge1xuICBjb25zdCBsYW5kaW5nUGFnZSA9IG5ldyBMYW5kaW5nUGFnZSgpO1xuICBsZXQgbGFuZGluZ1BhZ2VUZXN0RGF0YTtcblxuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAvLyBWaXNpdCB0aGUgbGFuZGluZyBwYWdlIGJlZm9yZSBydW5uaW5nIHRlc3RzXG4gICAgbGFuZGluZ1BhZ2UudmlzaXQoKTtcblxuICAgIC8vIExvYWQgdGVzdCBkYXRhIGZyb20gZml4dHVyZSBmaWxlXG4gICAgY3kuZml4dHVyZShcImxhbmRpbmctcGFnZS1kYXRhXCIpLnRoZW4oKHRlc3REYXRhKSA9PiB7XG4gICAgICBsYW5kaW5nUGFnZVRlc3REYXRhID0gdGVzdERhdGE7XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIFZlcmlmeSBzZWVzIGFkdmFuY2Ugc2VhcmNoIHdpZGdldFxuXG4gIGl0KFwiVmVyaWZ5IHVzZXIgY2FuIHNlZSBhZHZhbmNlIHNlYXJjaCB3aWRnZXQgb24gbGFuZGluZyBwYWdlXCIsICgpID0+IHtcbiAgICBsYW5kaW5nUGFnZS5hZHZhbmNlU2VhcmNoV2lkZ2V0KCkuc2hvdWxkKFwiYmUudmlzaWJsZVwiKTtcbiAgfSk7XG5cbiAgLy8gVmVyaWZ5IG5hdmlnYXRpb24gb2YgdXNlciB0byB0aGUgbGlzdGluZyBwYWdlIG9uIGxvY2F0aW9uIHNlbGVjdGlvblxuICBpdChcIlZlcmlmeSB1c2VyIG5hdmlnYXRpb24gb24gbG9jYXRpb24gc2VsZWN0aW9uXCIsICgpID0+IHtcbiAgICBsYW5kaW5nUGFnZS50eXBlTG9jYXRpb24obGFuZGluZ1BhZ2VUZXN0RGF0YS5wcm9wZXJ0eUxvY2F0aW9uKTtcbiAgICBjeS51cmwoKS5zaG91bGQoXG4gICAgICBcImluY2x1ZGVcIixcbiAgICAgIGAvbGlzdGluZ3MvY2l0eS8ke2xhbmRpbmdQYWdlVGVzdERhdGEucHJvcGVydHlMb2NhdGlvbn1gXG4gICAgKTtcbiAgfSk7XG59KTtcbiJdLCJuYW1lcyI6WyJMYW5kaW5nUGFnZSIsInZpc2l0IiwiY3kiLCJ0eXBlTG9jYXRpb24iLCJsb2NhdGlvbiIsImdldCIsInR5cGUiLCJmaW5kIiwiZXEiLCJjb250YWlucyIsImNsaWNrIiwiZ2V0TG9jYXRpb24iLCJhZHZhbmNlU2VhcmNoV2lkZ2V0IiwidGltZW91dCIsIl9kZWZhdWx0IiwiZXhwb3J0cyIsImRlZmF1bHQiLCJtb2R1bGUiLCJfbGFuZGluZ1BhZ2UiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwicmVxdWlyZSIsImRlc2NyaWJlIiwibGFuZGluZ1BhZ2UiLCJsYW5kaW5nUGFnZVRlc3REYXRhIiwiYmVmb3JlRWFjaCIsImZpeHR1cmUiLCJ0aGVuIiwidGVzdERhdGEiLCJpdCIsInNob3VsZCIsInByb3BlcnR5TG9jYXRpb24iLCJ1cmwiXSwic291cmNlUm9vdCI6IiJ9