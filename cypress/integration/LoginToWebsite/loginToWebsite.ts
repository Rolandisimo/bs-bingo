import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

const url = 'https://printify.com/app/products';
let expectedText = '';
Given('User opens printify catalog page', () => {
    cy.visit(url);
});
When('User clicks on the first BP card', () => {
    const bpCard = cy.get(`pfa-blueprint-card`);

    bpCard
        .get('.info .name')
        .first()
        .then((element) => {
            expectedText = element.text();
        })
        .click();
});

Then(`User should be redirected to the BP page`, () => {
    assert(cy.contains(expectedText));
});
