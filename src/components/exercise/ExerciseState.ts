import { makeAutoObservable } from 'mobx';
import { action } from 'mobx';
import { AppState, ExerciseType } from '../../AppState.state';

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
            this.appState.selectedExercises = this.appState.exercises.filter((exercise) => exercise.isSelected === true)
        } else {
            this.appState.selectedExercises = [...this.appState.selectedExercises, this.exercise]
        }
    }

    @action setFavorite = () => {
        this.exercise.isFavorite = !this.exercise.isFavorite;
        if (this.exercise.isFavorite === false) {
            this.appState.favoriteExercises = this.appState.exercises.filter((exercise) => exercise.isFavorite === true)
        } else {
            this.appState.favoriteExercises = [...this.appState.favoriteExercises, this.exercise]
        }
    }
}