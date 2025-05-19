import SavedPropertiesPage from "../support/pages/saved-properties-page";
import Dashboard from "../support/pages/dashboard-page";

// Instantiate Page Objects
const savedPropertiesPage = new SavedPropertiesPage();
const dashboard = new Dashboard();

describe('⭐ Saved Properties Test Suite', () => {

    // ✅ Log in before each test using fixture and custom login command
    beforeEach(() => {
        cy.visit('/sign-in');
        cy.fixture('sign-in').then((data) => {
            cy.login(data.emailAddress, data.password);
        });
    });

    it('should allow the user to create a new favorite list', () => {

        // 🔗 Navigate to the saved properties page
        dashboard.clickOptionLink('/saved-properties');

        // ➕ Click on "New List" button
        savedPropertiesPage.newList().should('be.visible').click();

        // 📝 Add a name to the favorite list
        savedPropertiesPage.addListName('Automated Favorite List');

        // 💾 Save the new list
        savedPropertiesPage.saveNewList();
        
        

        // ✅ Recommended: wait for confirmation element (replace with correct selector)
        savedPropertiesPage.favoriteListTitle('Automated Favorite List')
            .should('be.visible');
    });

});
