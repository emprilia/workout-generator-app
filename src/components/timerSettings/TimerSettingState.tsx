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
    stateValue: InputState;
}

export class TimerSettingState {
    @observable public label: string = this.timerSetting.label;
    @observable public id: number = this.timerSetting.id;

    @observable public prepTime: InputState = new InputState(this.timerSetting.prepTime.toString());
    @observable public workoutTime: InputState = new InputState(this.timerSetting.workoutTime.toString());
    @observable public breakTime: InputState = new InputState(this.timerSetting.breakTime.toString());
    @observable public minRounds: InputState;
    @observable public maxRounds: InputState = new InputState(this.timerSetting.maxRounds.toString());

    @observable public focusedInput: string = '';
    @observable public formError: string | null = null;
    @observable public isLoading: boolean = false;

    public constructor(
        private readonly timerSetting: TimerSettingType,
        private readonly timerSettingsState: TimerSettingsState,
    ) {
        makeAutoObservable(this);
        this.minRounds = new InputState(this.timerSetting.minRounds.toString()).checkError(this.minRoundsError);
    }

    @computed public get totalRoundTime(): number {
        return parseInt(this.workoutTime.value, 10) + parseInt(this.breakTime.value, 10);
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
        const data = {
            ...this.timerSetting,
            prepTime: parseInt(this.prepTime.value, 10),
            workoutTime: parseInt(this.workoutTime.value, 10),
            breakTime: parseInt(this.breakTime.value, 10),
            minRounds: parseInt(this.minRounds.value, 10),
            maxRounds: parseInt(this.maxRounds.value, 10)
        }

        try {
            this.setIsLoading();

            const error = await updateTimerSettings(this.id, data);

            if (error) {
                this.setError(error.message);
            } else {
                await this.timerSettingsState.getTimerSettings();
                this.setError(null);
            }

        } catch (error) {
            console.log('Error fetching data')
            this.setError('Something went wrong');
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

    @action private setIsLoading = (): void => {
        this.isLoading = !this.isLoading;
    }

    @action private setError = (error: string | null): void => {
        this.formError = error;
    }

    minRoundsError = (value: string): string | null => {
        const numberValue = parseInt(value, 10);
        return numberValue > this.timerSettingsState.activeCount ? 'Min rounds cannot be higher than max rounds' : null;
    };
}
