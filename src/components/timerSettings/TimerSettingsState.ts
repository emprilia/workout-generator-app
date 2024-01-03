import { makeAutoObservable, observable, action, computed } from 'mobx';
import { InputState } from '../input/InputState';
import { ExerciseType } from '../../AppState.state';
import { TimerSettings } from '../WorkoutGeneratorState';

// const defaultGeneratorSettings = {
//     prepTime: 5,
//     workoutTime: 45,
//     breakTime: 15,
//     maxRounds: 14,
//     minRounds: 10,
// }

export class TimerSettingsState {
    // @observable public prepTime: InputState<number> = new InputState(defaultGeneratorSettings.prepTime);
    @observable public prepTime: InputState<number> = new InputState(this.timerSettingsData.prepTime);
    @observable public workoutTime: InputState<number> = new InputState(this.timerSettingsData.workoutTime);
    @observable public breakTime: InputState<number> = new InputState(this.timerSettingsData.breakTime);
    @observable public minRounds: InputState<number> = new InputState(this.timerSettingsData.minRounds);
    // @observable public maxRounds: InputState<number> = new InputState(this.exercisesCount);
    // @observable public maxRounds: InputState<number> = new InputState(this.exercisesCount < this.timerSettingsData.maxRounds ? this.exercisesCount : this.timerSettingsData.maxRounds);
    @observable public openInfo: string = '';

    public constructor(
        private timerSettings: TimerSettings,
        private readonly exercisesCount: number
    ) {
        makeAutoObservable(this);
    }

    @computed public get maxRoundsmaxx(): InputState<number> {
        console.log(this.exercisesCount, 'ex count')
        return new InputState(this.exercisesCount > this.timerSettingsData.maxRounds ? this.exercisesCount : this.timerSettingsData.maxRounds);
    }

    @computed public get timerSettingsData() { 
        // console.log(this.exercisesCount);
        return this.timerSettings;
    }

    @computed public get maxRoundsMax(): InputState<number> {
        // console.log(this.blablaRounds);
        return this.maxRoundsmaxx;
    }

    @computed public get totalRoundTime(): number {
        return this.workoutTime.value + this.breakTime.value;
    }

    @action setOpenInfo = (value: string) => {
        if (this.openInfo === value) {
            this.openInfo = ''
        } else {
            this.openInfo = value;
        }
    }
}
