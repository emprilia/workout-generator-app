import { getElement } from "../../utils";

export class MenuItemsWrapper {
    public getMainSectionButon = getElement('[data-test="main-section"]');
    public getTimerSectionButton = getElement('[data-test="timer-section"]');
    public getExercisesSectionButton = getElement('[data-test="exercises-section"]');
}
