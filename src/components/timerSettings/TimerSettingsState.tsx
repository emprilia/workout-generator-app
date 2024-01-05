import { makeAutoObservable, observable, computed, action } from 'mobx';
import { InputState } from '../input/InputState';
import {
    PrepIconWrapper,
    WorkoutIconWrapper,
    BreakIconWrapper,
    MinMaxIconWrapper,
} from './TimerSettings.style';

interface WorkoutGeneratorPropsType {
    id: number;
    prepTime: number;
    workoutTime: number;
    breakTime: number;
    minRounds: number;
    maxRounds: number;
}

const defaultGeneratorSettings: WorkoutGeneratorPropsType = {
    id: 1,
    prepTime: 5,
    workoutTime: 45,
    breakTime: 15,
    maxRounds: 20,
    minRounds: 10,
}

interface InputDataPropsType {
    label: string;
    value: string;
    icon: JSX.Element;
    info: string;
    stateValue: InputState<number>;
}

export class TimerSettingsState {
    @observable public savedPrepTime: number = defaultGeneratorSettings.prepTime;
    @observable public savedWorkoutTime: number = defaultGeneratorSettings.workoutTime;
    @observable public savedBreakTime: number = defaultGeneratorSettings.breakTime;
    @observable public savedMinRounds: number = defaultGeneratorSettings.minRounds;
    @observable public savedMaxRounds: number = defaultGeneratorSettings.maxRounds;
    @observable public prepTime: InputState<number> = new InputState(defaultGeneratorSettings.prepTime);
    @observable public workoutTime: InputState<number> = new InputState(defaultGeneratorSettings.workoutTime);
    @observable public breakTime: InputState<number> = new InputState(defaultGeneratorSettings.breakTime);
    @observable public minRounds: InputState<number> = new InputState(defaultGeneratorSettings.minRounds);
    @observable public maxRounds: InputState<number> = new InputState(defaultGeneratorSettings.maxRounds > this.selectedCount ? this.selectedCount : defaultGeneratorSettings.maxRounds);
    @observable public focusedInput: string = '';
    @observable public openInfo: string = '';;

    
    public constructor(
        private readonly selectedCount: number,
        private readonly setMinMaxRoundsLimits: () => void
    ) {
        makeAutoObservable(this);
    }

    @computed public get totalRoundTime(): number {
        return this.workoutTime.value + this.breakTime.value;
    }

    @computed public get inputData(): Array<InputDataPropsType> {
        const inputData = [
            {
                label: 'Prep time',
                value: 'prepTime',
                icon: <PrepIconWrapper />,
                info: 'Prep time is the initial countdown time before the workout begins.',
                stateValue: this.prepTime,
            },
            {
                label: 'Workout time',
                value: 'workoutTime',
                icon: <WorkoutIconWrapper />,
                info: 'Workout time is the time spent doing the exercise.',
                stateValue: this.workoutTime,
            },
            {
                label: 'Break time',
                value: 'breakTime',
                icon: <BreakIconWrapper />,
                info: 'Break time is the time between each exercise to get some rest or adjust your position.',
                stateValue: this.breakTime,
            },
            {
                label: 'Min rounds',
                value: 'minRounds',
                icon: <MinMaxIconWrapper isMin={true} />,
                info: 'Min rounds is the minimum number of full rounds.',
                stateValue: this.minRounds,
            },
            {
                label: 'Max rounds',
                value: 'maxRounds', // ???
                icon: <MinMaxIconWrapper />,
                info: `Max rounds is the maximum number of rounds. Cannot be higher than current number of available exercises (${this.selectedCount}).`,
                stateValue: this.maxRounds,
            },
        ];
        return inputData;
    }

    @action setSelectedExercisesCount = (value: number) => {
        if (this.savedMaxRounds >= value) {
            this.maxRounds.setValue(value);
            this.savedMaxRounds = value;
        }
    }

    @action saveTimer = () => {
        if (this.savedMinRounds !== this.minRounds.value || this.savedMaxRounds !== this.maxRounds.value) { 
            this.setMinMaxRoundsLimits();
        }

        this.savedPrepTime = this.prepTime.value;
        this.savedWorkoutTime = this.workoutTime.value;
        this.savedBreakTime = this.breakTime.value;
        this.savedMinRounds = this.minRounds.value;
        this.savedMaxRounds = this.maxRounds.value;
    }

    @action onDivFocus = (value: string) => {
        this.focusedInput = value;
    }

    @action onInputFocus = (value: string) => { // ??? move to input state?
        this.focusedInput = value;
    }

    @action onBlur = () => { // ??? move to input state?
        this.focusedInput = '';
    }

    @action setOpenInfo = (value: string) => {
        if (this.openInfo === value) {
            this.openInfo = ''
        } else {
            this.openInfo = value;
        }
    }
}
