import { makeAutoObservable, observable, action } from 'mobx';
import { UserState } from './components/users/UserState';

export type ViewType = 'generator' | 'exercises-list' | 'timer-settings';

export class AppState {
    @observable public userState: UserState;
    @observable public currentView: ViewType = 'generator';

    public constructor() {
        makeAutoObservable(this);
        this.userState = new UserState();
    }

    @action setView = (view: ViewType) => {
        this.currentView = view;
    }
}
