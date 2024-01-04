import { makeAutoObservable, action, computed, observable } from 'mobx';
import { exercises } from '../../assets/mockData/exercises';

export interface ExerciseType {
    id: number;
    title: string;
    url: string;
    bothSides: boolean;
    isSelected: boolean;
    isFavorite: boolean
}

export class ExercisesState {
    @observable public exercises: Array<ExerciseType> = exercises;
    @observable public selectedExercises: Array<ExerciseType> = exercises.filter(exercise => exercise.isSelected === true);
    @observable public favoriteExercises: Array<ExerciseType> = exercises.filter(exercise => exercise.isFavorite === true);
    @observable public currentExercise: number = 1;
    @observable public minRounds: number = 12;
    @observable public maxRounds: number = this.selectedExercises.length;
    @observable public generatedWorkout: Array<ExerciseType> = this.initialExerciseSuggestions;

	public constructor() {
        makeAutoObservable(this);
    }

    @action setMinMaxRounds = (minRounds: number, maxRounds: number) => {
        if (maxRounds <= this.selectedExercises.length) {
            this.maxRounds = maxRounds;
        }
        this.minRounds = minRounds;
    }

    @action setSelectCheckbox = (type: 'all' | 'none') => {
        if (type === 'all') {
            this.selectedExercises = this.exercises;
            this.exercises.forEach((exercise) => exercise.isSelected = true)
        } else {
            this.selectedExercises = [];
            this.exercises.forEach((exercise) => exercise.isSelected = false)
        }
    }

    @computed public get exercisesCount(): number {
        return Math.floor(Math.random() * (this.maxRounds - this.minRounds) + this.minRounds);
    }

    @computed private get exercisesShuffled(): Array<ExerciseType> {
        return [...this.selectedExercises].sort(() => 0.5 - Math.random());
    }

    @computed private get exercisesSliced(): Array<ExerciseType> {
        return this.exercisesShuffled.slice(0, this.exercisesCount);
    }

    @computed public get initialExerciseSuggestions(): Array<ExerciseType> {
        // if exercise is to be done on both sides, create it for other side
        const exercisesSet = this.exercisesSliced.flatMap((exercise) => {
            if (exercise.bothSides === true) {
                return [
                    {
                        ...exercise,
                        title: `${exercise.title} (RIGHT)`,
                    },
                    {
                        ...exercise,
                        title: `${exercise.title} (LEFT)`,
                        bothSides: false,
                    }
                ]
            }
            return exercise;
        });

        // if (exercisesSet.length > 15) {
        if (exercisesSet.length > this.maxRounds) {
            const singleSide = exercisesSet.find(e => e.bothSides === false);
            if (singleSide === undefined) {
                // TODO if no single side exercise - get as close as possible to min/max exercises
                return exercisesSet;
            }
            // if single side exercise exists - remove it
            const exerciseIndex = exercisesSet.indexOf(singleSide);
            exercisesSet.splice(exerciseIndex, 1);

            // return exercisesSet;
            // ??? for
        }
        return exercisesSet;
    }

    @action generateWorkout = (): void => {
        this.generatedWorkout = this.initialExerciseSuggestions;
        // TODO: fix generating empty array
    }
}