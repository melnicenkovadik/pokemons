describe('running E2E tests', function () {
    it('opens the page', function () {
        cy.visit('http://localhost:3000');
        cy.contains('PokeSearch');
    });
});
