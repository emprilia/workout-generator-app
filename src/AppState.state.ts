import { makeAutoObservable, action, computed, observable } from 'mobx';
import { exercises } from './assets/mockData/exercises';
import { TimerSettingsState } from './components/timerSettings/TimerSettingsState';
import { ExercisesState } from './components/exerciseList/ExercisesState';
import { ExerciseState } from './components/exerciseList/ExerciseState';

export interface ExerciseType {
    id: number;
    title: string;
    url: string;
    bothSides: boolean;
    isSelected: boolean;
    isFavorite: boolean
}

export class AppState {
    @observable public exercises: Array<ExerciseType> = exercises;
    // @observable public selectedExercises: Array<ExerciseType> = exercises.filter(exercise => exercise.isSelected === true);
    // @observable public favoriteExercises: Array<ExerciseType> = exercises.filter(exercise => exercise.isFavorite === true);
    // @observable prepTime: InputState<number> = new InputState(defaultGeneratorSettings.prepTime);
    // @observable workoutTime: InputState<number> = new InputState(defaultGeneratorSettings.workoutTime);
    // @observable breakTime: InputState<number> = new InputState(defaultGeneratorSettings.breakTime);
    // @observable minRounds: InputState<number> = new InputState(defaultGeneratorSettings.minRounds);
    // @observable public maxRounds: InputState<number> = new InputState(this.selectedExercises.length);
    // @observable exercisesCount: number = Math.floor(Math.random() * (this.maxRounds.value - 10) + 10);
    @observable public focusedInput: string = '';

    // public timerSettingsState: TimerSettingsState = new TimerSettingsState();
    // public exercisesState: ExercisesState = new ExercisesState();

	public constructor() {
        makeAutoObservable(this);
        this.initializeStates();
    }

    private initializeStates() {
    // Initialize both states with default values
    // this.timerSettingsState = new TimerSettingsState();
    // this.exercisesState = new ExercisesState();

    // Update states with correct values
        // this.timerSettingsState.setMaxRounds(this.selectedExercises.length);
        // this.exercisesState.setMaxRounds(this.timerSettingsState.maxRounds.value);
    }

    // @computed public get selectedExercises(): Array<ExerciseType> {
    //     // Problem: timer needs exercises state
    //     return this.exercisesState.selectedExercises;
    // }
    // @computed public get maxRounds(): number {
    //     // Problem: timer needs exercises state
    //     return this.timerSettingsState.maxRounds.value;
    // }

    // @action setSelectCheckbox = (type: 'all' | 'none') => {
    //     if (type === 'all') {
    //         this.selectedExercises = this.exercises;
    //         this.exercises.forEach((exercise) => exercise.isSelected = true)
    //     } else {
    //         this.selectedExercises = [];
    //         this.exercises.forEach((exercise) => exercise.isSelected = false)
    //     }
    // }

    // @computed public get maxRounds(): InputState<number> {
    //     return new InputState(this.selectedExercises.length);
    // }

    // @computed public get totalRoundTime(): number {
    //     return this.workoutTime.value + this.breakTime.value;
    // }

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