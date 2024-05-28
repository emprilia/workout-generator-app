import { getElement } from "../../utils";

export class ExerciseList {
    public getEditModeButton = getElement('[data-test="edit-mode-button"]');
    public getCreateNewButton = getElement('[data-test="create-new-button"]');
    public getDeleteButton = getElement('[data-test="delete-button"]');
}

export class ExerciseListItem {
    public getExercisesItem = (label: string): Cypress.Chainable<JQuery<HTMLElement>> => {
        return cy.get(`[data-test="exercise-wrapper-${label}"] [data-test="exercise-container"]`);
    };
    public getCreatedExerciseLabel = (label: string): Cypress.Chainable<JQuery<HTMLElement>> => {
        return cy.get(`[data-test="exercise-wrapper-${label}"] [data-test="created-exercise-label"]`);
    };
    public getEditIcon = (label: string): Cypress.Chainable<JQuery<HTMLElement>> => {
        return cy.get(`[data-test="exercise-wrapper-${label}"] [data-test="edit-icon"]`);
    };
}

export class ExerciseListItemForm {
    public getEditModeButton = getElement('[data-test="delete-button"]');
    public getCreateNewButton = getElement('[data-test="create-new-button"]');
    public getSubmitButton = getElement('[data-test="submit-exercise"]');
    public getExerciseLabel = getElement('[data-test="exercise-label"]');
}
