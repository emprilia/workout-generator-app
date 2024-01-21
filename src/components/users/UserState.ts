import { makeAutoObservable, observable, action } from 'mobx';
import { signUpUser, signInUser, signOutUser, isUserAuth } from '../../api/supabaseUsers';
import { InputState } from '../input/InputState';

export class UserState {
    @observable public email: InputState<string> = new InputState('');
    @observable public password: InputState<string> = new InputState('');
    @observable public isAuth: boolean = false;
    @observable public isSignedUp: boolean = false;
    @observable public userId: string | null = null;
    @observable public formType: 'login' | 'signup' | 'reset-password' = 'login';

    public constructor() {
        makeAutoObservable(this);
        this.isUserAuth();
    }

    @action public isUserAuth = async (): Promise<void> => {
        try {
            const response = await isUserAuth();
            if (response) {
                this.setIsAuth();
                this.setUserId(response.user.id)
            }
        } catch (error) {
            console.log('Error signing up')
        }
    };

    @action private setSignedUp = () => {
        this.isSignedUp = true;
    }

    @action public signUpUser = async (): Promise<void> => {
        try {
            const response = await signUpUser(this.email.value, this.password.value);

            if (response) {
                this.setSignedUp();
                this.setUserId(response.user.id);
                this.setIsAuth();
            }
        } catch (error) {
            console.log('Error signing up')
        }
    };

    @action public signInUser = async (): Promise<void> => {
        try {
            const data = await signInUser(this.email.value, this.password.value);
            if (data !== null) {
                this.setIsAuth();
                this.setUserId(data.user.id);
            } else {
                console.log(data)
            }
        } catch (error) {
            console.log('Error logging in')
        }
    };

    @action public signOutUser = async (): Promise<void> => {
        try {
            await signOutUser();
            this.setIsAuth();
        } catch (error) {
            console.log('Error logging out')
        }
    };

    @action public setFormType = (formType: 'signup' | 'login' | 'reset-password') => {
        this.formType = formType;
    }

    @action public setIsAuth = () => {
        this.isAuth = !this.isAuth;
    }

    @action public setUserId = (userId: string) => {
        this.userId = userId;
    }
}
