// Central exports for reusable intercepts

export const intercepts = {
  auth: {
    interceptLogin(alias = 'login') {
      cy.intercept('POST', '**/auth/login').as(alias);
    },
    mockLoginSuccess(alias = 'login', user = {}) {
      cy.intercept('POST', '**/auth/login', {
        statusCode: 200,
        body: {
          token: 'mocked_token_123',
          user,
        },
      }).as(alias);
    },
  },
};
