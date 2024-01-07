import { makeAutoObservable } from 'mobx';
import { action } from 'mobx';
import { ExerciseType, ExercisesState } from './ExercisesState';

export class ExerciseState {
    public constructor(
        private exercise: ExerciseType,
        private exercisesState: ExercisesState
    ) {
        makeAutoObservable(this);
    }

    @action setSelected = () => {
        this.exercise.isSelected = !this.exercise.isSelected;
        this.exercisesState.tempSelectedExercises = this.exercisesState.allExercises.filter((exercise) => exercise.isSelected === true)
    }

    @action setFavorite = () => {
        this.exercise.isFavorite = !this.exercise.isFavorite;
        this.exercisesState.tempFavoriteExercises = this.exercisesState.allExercises.filter((exercise) => exercise.isFavorite === true)
    }
}
