/// <reference types="cypress" />

describe('happy path', () => {
  it('runs happy path successfully', () => {
    cy.visit('/');
    cy.getTestEl('table_link').should('be.visible');
    cy.getTestEl('you_go_link').should('be.visible');
    cy.getTestEl('policyholders_link').should('be.visible');

    cy.server();
    cy.intercept({
      method: 'GET',
      url: 'https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/api/policyholders',
    }).as('getPolicyholders');
    cy.getTestEl('policyholders_link').click();
    cy.wait('@getPolicyholders').then((interception) => {
      assert.isNotNull(interception.response.body, '1st API call has data');
    });
    cy.getTestEl('policyholder_table_1').should('be.visible');
  });
});
