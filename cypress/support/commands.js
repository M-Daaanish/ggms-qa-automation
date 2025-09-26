// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (email, password) => {
    cy.get('input[type="email"]').type(email);
    cy.get('input[placeholder="Password"]').type(password);
    cy.get('#login-btn').click();



})

Cypress.Commands.add('visitSignIn', () => {
    cy.visit('/sign-in')
})

// Generate random email address to create an account

Cypress.Commands.add('generateRandomEmail', () => {
    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    const digits = '0123456789';
    const specialChars = '!@#$%^&*';
    const allChars = upperChars + lowerChars + digits + specialChars;
  
    const getRandomChar = (str) => str[Math.floor(Math.random() * str.length)];
  
    // Ensure required characters
    const required = [
      getRandomChar(upperChars),
      getRandomChar(digits),
      getRandomChar(specialChars)
    ];
  
    // Fill the rest (8 total before the @)
    while (required.length < 8) {
      required.push(getRandomChar(allChars));
    }
  
    // Shuffle the characters
    const shuffled = required.sort(() => 0.5 - Math.random()).join('');
  
    const email = `${shuffled}@test.com`;
    return email;
  });
  
// ---- Reusable network intercept helpers ----
import { intercepts } from './intercepts';

Cypress.Commands.add('interceptLogin', (alias = 'login') => {
  intercepts.auth.interceptLogin(alias);
});

Cypress.Commands.add('mockLoginSuccess', (alias = 'login', user = {}) => {
  intercepts.auth.mockLoginSuccess(alias, user);
});
  