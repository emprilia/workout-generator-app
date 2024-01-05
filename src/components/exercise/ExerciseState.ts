import { makeAutoObservable } from 'mobx';
import { action } from 'mobx';
import { AppState } from '../../AppState.state';
import { ExerciseType } from '../exerciseList/ExercisesState';

export class ExerciseState {
    public constructor(
        private exercise: ExerciseType,
        private appState: AppState
    ) {
        makeAutoObservable(this);
    }

    @action setSelected = () => {
        this.exercise.isSelected = !this.exercise.isSelected;
        this.appState.exercisesState.tempSelectedExercises = this.appState.exercisesState.exercises.filter((exercise) => exercise.isSelected === true)
    }

    @action setFavorite = () => {
        this.exercise.isFavorite = !this.exercise.isFavorite;
    }
}