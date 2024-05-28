import { ExerciseList, ExerciseListItem, ExerciseListItemForm } from './classes';
import { checkExerciseExists } from './excercises';
import { MenuItemsWrapper } from '../menu/class';
import { getRandomString } from '../../utils';

const menuItems = new MenuItemsWrapper();
const exerciseList = new ExerciseList();
const exerciseListItem = new ExerciseListItem();
const exerciseListItemForm = new ExerciseListItemForm();

describe('Create, edit and delete Exercise List Item', () => {
    beforeEach(() => {
        cy.loginBySupabase();
        cy.visit(Cypress.env('CYPRESS_BASE_URL' ?? ''));
    });

    it('Adding, editing and deleting exercise item',
        { tags: ['test-exercise-item'] }, () => {

        const title = getRandomString(7);

        menuItems.getExercisesSectionButton().click();
        exerciseList.getCreateNewButton().click();
        exerciseListItemForm.getExerciseLabel().type(title);
        exerciseListItemForm.getExerciseLabel()
            .should('have.value', title);

        exerciseListItemForm.getSubmitButton().click();

        cy.wait(1000).then(() => {
            checkExerciseExists(title).then((response) => {
                const exists = response;
                assert.equal(exists, true, 'Exercise found');
            });
        });

        exerciseListItem.getCreatedExerciseLabel(title)
            .should('have.text', title);
        exerciseList.getEditModeButton().click();
        exerciseListItem.getEditIcon(title).click();
        exerciseListItemForm.getExerciseLabel().type(' edited');
        exerciseListItemForm.getExerciseLabel()
            .should('have.value', `${title} edited`);
        exerciseListItemForm.getSubmitButton().click();
        exerciseListItem.getExercisesItem(title).click();

        exerciseList.getDeleteButton().click();
        cy.wait(1000).then(() => {
            exerciseListItem.getCreatedExerciseLabel(title)
            .should('not.exist');
        });
        
        exerciseList.getEditModeButton().click();
    });
});
