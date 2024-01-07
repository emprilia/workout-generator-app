import { makeAutoObservable, observable, computed, action } from 'mobx';
import { getSingleGeneratorSettings, updateSingleGeneratorSettings } from '../../api/timerSettings';
import { InputState } from '../input/InputState';
import {
    PrepIconWrapper,
    WorkoutIconWrapper,
    BreakIconWrapper,
    MinMaxIconWrapper,
} from './TimerSettings.style';

export interface WorkoutGeneratorPropsType {
    id: number;
    label: string;
    prepTime: number;
    workoutTime: number;
    breakTime: number;
    minRounds: number;
    maxRounds: number;
}

const defaultGeneratorSettings: WorkoutGeneratorPropsType = {
    id: 0,
    label: 'default',
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
    @observable public timerSettings: WorkoutGeneratorPropsType = defaultGeneratorSettings;
    @observable public savedPrepTime: number = this.timerSettings.prepTime;
    @observable public savedWorkoutTime: number = this.timerSettings.workoutTime;
    @observable public savedBreakTime: number = this.timerSettings.breakTime;
    @observable public savedMinRounds: number = this.timerSettings.minRounds;
    @observable public savedMaxRounds: number = this.timerSettings.maxRounds;
    @observable public prepTime: InputState<number> = new InputState(this.timerSettings.prepTime); // saved?
    @observable public workoutTime: InputState<number> = new InputState(this.timerSettings.workoutTime);
    @observable public breakTime: InputState<number> = new InputState(this.timerSettings.breakTime);
    @observable public minRounds: InputState<number> = new InputState(this.timerSettings.minRounds);
    @observable public maxRounds: InputState<number> = new InputState(this.timerSettings.maxRounds > this.selectedCount ? this.selectedCount : this.timerSettings.maxRounds);
    @observable public focusedInput: string = '';
    @observable public openInfo: string = '';

    public constructor(
        private readonly selectedCount: number,
        private readonly setMinMaxRoundsLimits: () => void,
    ) {
        makeAutoObservable(this);
        this.initializeTimerSettings();
    }

    @action private async initializeTimerSettings(): Promise<void> {
        try {
            // temp fixed id since there is no way to add more timers to database
            const data = await getSingleGeneratorSettings(1);
            this.setTimerSettings(data);
            this.setMinMaxRoundsLimits();
        } catch (error) {
            console.error('Error fetching timer settings', error);
        }
    }

    @action private setTimerSettings(settings: WorkoutGeneratorPropsType): void {
        this.timerSettings = settings;
        this.prepTime.setValue(this.timerSettings.prepTime);
        this.workoutTime.setValue(this.timerSettings.workoutTime);
        this.breakTime.setValue(this.timerSettings.breakTime);
        this.minRounds.setValue(this.timerSettings.minRounds);
        this.maxRounds.setValue(this.timerSettings.maxRounds);
        this.savedPrepTime = this.timerSettings.prepTime;
        this.savedWorkoutTime = this.timerSettings.workoutTime;
        this.savedBreakTime = this.timerSettings.breakTime;
        this.savedMinRounds = this.timerSettings.minRounds;
        this.savedMaxRounds = this.timerSettings.maxRounds;
    }

    @computed public get defaultTimerSettings(): WorkoutGeneratorPropsType {
        return {
            ...this.timerSettings,
            prepTime: this.timerSettings.prepTime,
            workoutTime: this.timerSettings.workoutTime,
            breakTime: this.timerSettings.breakTime,
            minRounds: this.timerSettings.minRounds,
            maxRounds: this.timerSettings.maxRounds
        };
    }

    @action updateTimerSettings = async (): Promise<void> => {
        try {
            // temp fixed id since there is no way to add more timers to database
            await updateSingleGeneratorSettings(1, this.timerSettings);
        } catch (error) {
            console.log('Error fetching data')
        }
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
                value: 'maxRounds',
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

    @action saveTimer = async (): Promise<void> => {
        if (this.savedMinRounds !== this.minRounds.value || this.savedMaxRounds !== this.maxRounds.value) { 
            this.setMinMaxRoundsLimits();
        }

        this.savedPrepTime = this.prepTime.value;
        this.savedWorkoutTime = this.workoutTime.value;
        this.savedBreakTime = this.breakTime.value;
        this.savedMinRounds = this.minRounds.value;
        this.savedMaxRounds = this.maxRounds.value;

        this.timerSettings = {
            ...this.timerSettings,
            prepTime: this.savedPrepTime,
            workoutTime: this.savedWorkoutTime,
            breakTime: this.savedBreakTime,
            minRounds: this.savedMinRounds,
            maxRounds: this.savedMaxRounds
        }

        await this.updateTimerSettings();
    }

    @action onDivFocus = (value: string) => {
        this.focusedInput = value;
    }

    @action onBlur = () => {
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
