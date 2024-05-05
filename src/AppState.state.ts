import { makeAutoObservable, observable, action } from 'mobx';
import { UserState } from './components/users/UserState';

export type ViewType = 'generator' | 'exercises-list' | 'timer-settings';

export class AppState {
    @observable public userState: UserState;
    @observable public currentView: ViewType = 'generator';
    @observable public isMobile: boolean = false;

    public constructor() {
        makeAutoObservable(this);
        this.userState = new UserState();
        this.detectMobile();
        window.addEventListener('resize', this.detectMobile);
    }

    @action setView = (view: ViewType) => {
        this.currentView = view;
    }

    @action private detectMobile = () => {
        if (window.matchMedia("(max-width: 767px)").matches) {
            this.isMobile = true;
        } else {
            this.isMobile = false;
        }
    }
}
