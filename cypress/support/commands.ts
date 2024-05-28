import { supabase } from '../supabase/supabase';

Cypress.Commands.add('loginBySupabase', (): Cypress.Chainable<void> => {
    const email = Cypress.env('CYPRESS_TEST_USER_EMAIL');
    const password = Cypress.env('CYPRESS_TEST_USER_PASSWORD');

    return cy.wrap(null).then(() => {
        return supabase.auth.signInWithPassword({ email, password }).then(({ data: session, error }) => {
            if (error) {
                console.log(error)
                throw new Error(error.message);
            }

            window.localStorage.setItem('supabase.auth.token', JSON.stringify(session));
        });
    })
});
