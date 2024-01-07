import { makeAutoObservable, observable, action } from 'mobx';
import { TimerSettingsState } from './components/timerSettings/TimerSettingsState';
import { ExercisesState } from './components/exerciseList/ExercisesState';

type ViewType = 'generator' | 'exercises-list' | 'timer-settings';

export class AppState {
    @observable public exercisesState: ExercisesState;
    @observable public timerSettingsState: TimerSettingsState;
    @observable public currentView: ViewType = 'generator';

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
        this.exercisesState.setMinMaxRoundsLimits(this.timerSettingsState.minRounds.value, this.timerSettingsState.maxRounds.value);
    }

    @action setSelectedExercisesCount = (value: number) => {
        this.timerSettingsState.setSelectedExercisesCount(value);
    }

    @action setView = (view: ViewType) => {
        this.currentView = view;
    }
}
