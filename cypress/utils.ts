export const getElement = (selector: string) => {
    return (): Cypress.Chainable => {
        return cy.get(selector);
    };
};

export const getRandomString = (length: number,): string => {
    const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
};
