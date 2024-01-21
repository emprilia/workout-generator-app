import { makeAutoObservable, observable, computed, action } from 'mobx';
import { TimerSettingType, updateTimerSettings } from '../../api/supabaseTimerSettings';
import { TimerSettingsState } from './TimerSettingsState';
import { InputState } from '../input/InputState';
import {
    PrepIconWrapper,
    WorkoutIconWrapper,
    BreakIconWrapper,
    MinMaxIconWrapper,
} from './TimerSettings.style';

interface InputDataPropsType {
    label: string;
    value: string;
    icon: JSX.Element;
    info: string;
    stateValue: InputState<number>;
}

export class TimerSettingState {
    @observable public label: string = this.timerSetting.label;
    @observable public id: number = this.timerSetting.id;

    @observable public savedPrepTime: number = this.timerSetting.prepTime;
    @observable public savedWorkoutTime: number = this.timerSetting.workoutTime;
    @observable public savedBreakTime: number = this.timerSetting.breakTime;
    @observable public savedMinRounds: number = this.timerSetting.minRounds;
    @observable public savedMaxRounds: number = this.timerSetting.maxRounds;

    @observable public prepTime: InputState<number> = new InputState(this.timerSetting.prepTime);
    @observable public workoutTime: InputState<number> = new InputState(this.timerSetting.workoutTime);
    @observable public breakTime: InputState<number> = new InputState(this.timerSetting.breakTime);
    @observable public minRounds: InputState<number> = new InputState(this.timerSetting.minRounds);
    @observable public maxRounds: InputState<number> = new InputState(this.timerSetting.maxRounds);

    @observable public focusedInput: string = '';
    @observable public openInfo: string = '';
    @observable public isLoading: boolean = false;

    public constructor(
        private readonly timerSetting: TimerSettingType,
        private readonly timerSettingsState: TimerSettingsState,
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
                value: 'maxRounds',
                icon: <MinMaxIconWrapper />,
                info: `Max rounds is the maximum number of rounds. Cannot be higher than current number of available exercises: (${this.timerSettingsState.activeCount}).`,
                stateValue: this.maxRounds,
            },
        ];
        return inputData;
    }

    @action saveTimer = async (): Promise<void> => {
        this.savedPrepTime = this.prepTime.value;
        this.savedWorkoutTime = this.workoutTime.value;
        this.savedBreakTime = this.breakTime.value;
        this.savedMinRounds = this.minRounds.value;
        this.savedMaxRounds = this.maxRounds.value;

        const data = {
            ...this.timerSetting,
            prepTime: this.savedPrepTime,
            workoutTime: this.savedWorkoutTime,
            breakTime: this.savedBreakTime,
            minRounds: this.savedMinRounds,
            maxRounds: this.savedMaxRounds
        }

        try {
            this.setIsLoading();

            await updateTimerSettings(this.id, data);
            await this.timerSettingsState.getTimerSettings();
        } catch (error) {
            console.log('Error fetching data')
        } finally {
            this.setIsLoading();
        }
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

    @action private setIsLoading = (): void => {
        this.isLoading = !this.isLoading;
    }
}
