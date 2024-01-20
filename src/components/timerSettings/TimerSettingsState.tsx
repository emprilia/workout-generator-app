import { makeAutoObservable, observable, action } from 'mobx';
import { TimerSettingType } from '../../api/supabaseTimerSettings';

export class TimerSettingsState {
    @observable public timerSettings: Array<TimerSettingType> | null = null;
    @observable public currentSetting: TimerSettingType | null = null;
    @observable public activeCount: number = 0;

    public constructor(
        public readonly getTimerSettings: () => Promise<void>,
    ) {
        makeAutoObservable(this);
    }

    @action setActiveExercisesCount = (value: number) => {
        this.activeCount = value;
    }

    @action public setTimerSettings(settings: Array<TimerSettingType>): void {
        this.timerSettings = settings;
    }

    @action public setCurrentSettings(setting: TimerSettingType): void {
        this.currentSetting = {
            ...setting,
            maxRounds: setting.maxRounds > this.activeCount ? this.activeCount : setting.maxRounds
        }
    }
}
