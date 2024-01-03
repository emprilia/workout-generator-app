import { makeAutoObservable } from 'mobx';
import { action } from 'mobx';
import { ExerciseType, ExercisesState } from './ExercisesState';
import { WorkoutGeneratorState } from '../WorkoutGeneratorState';

export class ExerciseState {
    public constructor(
        private exercise: ExerciseType,
        private exercisesState: ExercisesState,
        private workoutGeneratorState: WorkoutGeneratorState
    ) {
        makeAutoObservable(this);
    }

    @action setSelected = () => {
        this.exercise.isSelected = !this.exercise.isSelected;
        if (this.exercise.isSelected === false) {
            this.workoutGeneratorState.setSelectedExercises(this.workoutGeneratorState.exercises.filter((exercise) => exercise.isSelected === true));
            this.workoutGeneratorState.selectedExercises = this.workoutGeneratorState.exercises.filter((exercise) => exercise.isSelected === true)
        } else {
            this.workoutGeneratorState.selectedExercises = [...this.workoutGeneratorState.selectedExercises, this.exercise]
        }
    }

    @action setFavorite = () => {
        this.exercise.isFavorite = !this.exercise.isFavorite;
        if (this.exercise.isFavorite === false) {
            this.exercisesState.favoriteExercises = this.exercisesState.exercises.filter((exercise) => exercise.isFavorite === true)
        } else {
            this.exercisesState.favoriteExercises = [...this.exercisesState.favoriteExercises, this.exercise]
        }
    }
}