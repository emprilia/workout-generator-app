import { makeAutoObservable, action, computed, observable } from 'mobx';
import { InputState } from './components/input/InputState';
import { exercises } from './assets/mockData/exercises';

export interface ExerciseType {
    id: number;
    title: string;
    url: string;
    bothSides: boolean;
    isSelected: boolean;
    isFavorite: boolean
}

const defaultGeneratorSettings = {
    prepTime: 5,
    workoutTime: 45,
    breakTime: 15,
    maxRounds: 15,
    minRounds: 10,
}

export class AppState {
    @observable public exercises: Array<ExerciseType> = exercises;
    @observable public selectedExercises: Array<ExerciseType> = exercises.filter(exercise => exercise.isSelected === true);
    @observable public favoriteExercises: Array<ExerciseType> = exercises.filter(exercise => exercise.isFavorite === true);
    @observable public currentExercise: number = 1;
    @observable prepTime: InputState<number> = new InputState(defaultGeneratorSettings.prepTime);
    @observable workoutTime: InputState<number> = new InputState(defaultGeneratorSettings.workoutTime);
    @observable breakTime: InputState<number> = new InputState(defaultGeneratorSettings.breakTime);
    @observable minRounds: InputState<number> = new InputState(defaultGeneratorSettings.minRounds);
    // @observable public maxRounds: InputState<number> = new InputState(this.selectedExercises.length);
    @observable exercisesCount: number = Math.floor(Math.random() * (this.maxRounds.value - 10) + 10);
    @observable public generatedWorkout:  Array<ExerciseType> = this.initialExerciseSuggestions;
    @observable public focusedInput: string = '';

	public constructor() {
        makeAutoObservable(this);
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

    @computed public get maxRounds(): InputState<number> {
        return new InputState(this.selectedExercises.length);
    }

    @computed public get totalRoundTime(): number {
        return this.workoutTime.value + this.breakTime.value;
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

        if (exercisesSet.length > this.maxRounds.value) {
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

    @action generateNewWorkout = (): void => {
        // fix it to use same logic as initialExerciseSuggestions
        this.generatedWorkout = [...this.selectedExercises].sort(() => 0.5 - Math.random()).slice(0, this.exercisesCount);
    }

    @action onDivFocus = (value: string) => {
        this.focusedInput = value;
    }

    @action onInputFocus = (value: string) => {
        this.focusedInput = value;
    }

    @action onBlur = () => {
        this.focusedInput = '';
    }
}