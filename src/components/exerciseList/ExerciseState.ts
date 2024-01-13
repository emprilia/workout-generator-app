import { makeAutoObservable, observable, action } from 'mobx';
import { ExerciseType, ExercisesState } from './ExercisesState';

export class ExerciseState {
    @observable public isEditExercise: boolean = false;

    public constructor(
        private exercise: ExerciseType,
        private exercisesState: ExercisesState
    ) {
        makeAutoObservable(this);
    }

    @action setSelected = () => {
        if (this.exercisesState.isEditMode) {
            if (this.exercisesState.selectedExercises.includes(this.exercise.id)) {
                this.exercisesState.selectedExercises = this.exercisesState.selectedExercises.filter((id) => id !== this.exercise.id)
            } else {
                this.exercisesState.selectedExercises.push(this.exercise.id)
            }
        } else {
            this.exercise.isActive = !this.exercise.isActive;
            this.exercisesState.setChanged(this.exercise);
        }
    }

    @action setFavorite = () => {
        this.exercise.isFavorite = !this.exercise.isFavorite;
        this.exercisesState.setChanged(this.exercise);
    }

    @action setEditExercise = () => {
        this.isEditExercise = !this.isEditExercise;
    }
}
