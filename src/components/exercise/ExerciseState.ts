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
        if (this.exercise.isSelected === false) {
            this.appState.exercisesState.selectedExercises = this.appState.exercisesState.exercises.filter((exercise) => exercise.isSelected === true)
            this.appState.setSelectedExercisesCount(this.appState.exercisesState.selectedExercises.length)
        } else {
            this.appState.exercisesState.selectedExercises = [...this.appState.exercisesState.selectedExercises, this.exercise]
            this.appState.setSelectedExercisesCount(this.appState.exercisesState.selectedExercises.length)
        }
    }

    @action setFavorite = () => {
        this.exercise.isFavorite = !this.exercise.isFavorite;
        if (this.exercise.isFavorite === false) {
            this.appState.exercisesState.favoriteExercises = this.appState.exercisesState.exercises.filter((exercise) => exercise.isFavorite === true)
        } else {
            this.appState.exercisesState.favoriteExercises = [...this.appState.exercisesState.favoriteExercises, this.exercise]
        }
    }
}