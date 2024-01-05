import { makeAutoObservable, observable, action } from 'mobx';
import { TimerSettingsState } from './components/timerSettings/TimerSettingsState';
import { ExercisesState } from './components/exerciseList/ExercisesState';

export class AppState {
    @observable public exercisesState: ExercisesState;
    @observable public timerSettingsState: TimerSettingsState;
    @observable public currentView: 'generator' | 'exercises-list' | 'timer-settings' = 'generator';

	public constructor() {
        makeAutoObservable(this);
        this.exercisesState = new ExercisesState(this.setSelectedExercisesCount);
        this.timerSettingsState = new TimerSettingsState(this.exercisesState.selectedExercises.length, this.setMinMaxRoundsLimits);
        this.initializeStates();
    }

    private initializeStates() {
        this.exercisesState.setMinMaxRoundsLimits(this.timerSettingsState.minRounds.value, this.timerSettingsState.maxRounds.value);
    }

    @action setMinMaxRoundsLimits = () => {
        if (this.timerSettingsState.savedMinRounds !== this.timerSettingsState.minRounds.value || this.timerSettingsState.savedMaxRounds !== this.timerSettingsState.maxRounds.value) {
            this.exercisesState.setMinMaxRoundsLimits(this.timerSettingsState.minRounds.value, this.timerSettingsState.maxRounds.value);
        }
    }

    @action setSelectedExercisesCount = (value: number) => {
        this.timerSettingsState.setSelectedExercisesCount(value);
    }

    @action setView = (view: 'generator' | 'exercises-list' | 'timer-settings') => {
        this.currentView = view;
    }
}
