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
        this.exercisesState = new ExercisesState(this.setActiveExercisesCount);
        this.timerSettingsState = new TimerSettingsState(this.exercisesState.activeExercises.length, this.setMinMaxRoundsLimits);
        this.initializeStates();
    }

    private initializeStates() {
        this.exercisesState.setMinMaxRoundsLimits(this.timerSettingsState.minRounds.value, this.timerSettingsState.maxRounds.value);
    }

    @action setMinMaxRoundsLimits = () => {
        this.exercisesState.setMinMaxRoundsLimits(this.timerSettingsState.minRounds.value, this.timerSettingsState.maxRounds.value);
    }

    @action setActiveExercisesCount = (value: number) => {
        this.timerSettingsState.setActiveExercisesCount(value);
    }

    @action setView = (view: ViewType) => {
        this.currentView = view;
    }
}
