import { makeAutoObservable, observable, action, computed } from 'mobx';
import { TimerSettingsState } from './timerSettings/TimerSettingsState';
import { ExerciseType, ExercisesState } from './exerciseList/ExercisesState';
import { exercises } from '../assets/mockData/exercises';

export interface TimerSettings {
    prepTime: number;
    workoutTime: number;
    breakTime: number;
    maxRounds: number;
    minRounds: number;
}

const defaultGeneratorSettings = {
    prepTime: 5,
    workoutTime: 45,
    breakTime: 15,
    minRounds: 10,
    maxRounds: 13,
}

export class WorkoutGeneratorState {
    @observable public exercises: Array<ExerciseType> = this.exercisesList;
    @observable public selectedExercises: Array<ExerciseType> = this.exercises.filter(exercise => exercise.isSelected === true);
    @observable public timerSettingsState: TimerSettingsState = new TimerSettingsState(this.timerSettings, this.selectedExercises.length);
    
    // @observable public maxRounds: number = this.timerSettingsState.maxRounds.value;
    @observable public maxRounds: number = this.timerSettingsState.maxRoundsmaxx.value;
    @observable public exercisesState: ExercisesState = new ExercisesState(this.maxRounds);

    public constructor() {
        makeAutoObservable(this);
    }

    @computed public get exercisesList(): Array<ExerciseType> {
        return exercises;
    }

    @action setSelectedExercises = (selectedExercises: Array<ExerciseType>) => {
        this.selectedExercises = selectedExercises;
        this.timerSettingsState = new TimerSettingsState(this.timerSettings, this.selectedExercises.length);
    }
    @action setMaxRounds = (maxRounds: number) => {
        this.maxRounds = maxRounds;
        // this.selectedExercises = selectedExercises;
        this.exercisesState = new ExercisesState(this.maxRounds);
    }

    @computed public get selectedExercisesList(): Array<ExerciseType> {
        return this.exercisesList.filter(exercise => exercise.isSelected === true);
    }

    @computed public get timerSettings(): TimerSettings {
        return defaultGeneratorSettings;
    }
}
