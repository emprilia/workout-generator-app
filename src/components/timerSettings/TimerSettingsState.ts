import { makeAutoObservable, observable } from 'mobx';
import { action } from 'mobx';

export class TimerSettingsState {
    @observable public openInfo: string = '';

    public constructor() {
        makeAutoObservable(this);
    }

    @action setOpenInfo = (value: string) => {
        if (this.openInfo === value) {
            this.openInfo = ''
        } else {
            this.openInfo = value;
        }
    }
}
