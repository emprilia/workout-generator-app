import { makeAutoObservable, observable, action } from 'mobx';
import { TimerSettingsState } from './components/timerSettings/TimerSettingsState';
import { ExercisesState } from './components/exerciseList/ExercisesState';

export class AppState {
    @observable public exercisesState: ExercisesState = new ExercisesState();
    @observable public timerSettingsState: TimerSettingsState = new TimerSettingsState(this.exercisesState.selectedExercises.length);

	public constructor() {
        makeAutoObservable(this);
        this.initializeStates();
    }

    private initializeStates() {
        this.exercisesState.setMinMaxRounds(this.timerSettingsState.minRounds.value, this.timerSettingsState.maxRounds.value);
    }

    @action updateExercisesStateRoundsCount = () => { 
        this.timerSettingsState.onBlur();
        // TODO: only if rounds counts have changed
        this.exercisesState.setMinMaxRounds(this.timerSettingsState.minRounds.value, this.timerSettingsState.maxRounds.value);
    }

    @action setSelectedExercisesCount = (value: number) => {
        this.timerSettingsState.setSelectedExercisesCount(value);
    }
}