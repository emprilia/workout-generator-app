import { makeAutoObservable, observable, action, computed } from 'mobx';
import { signUpUser, signInUser, signOutUser, isUserAuth } from '../../api/supabaseUsers';
import { InputState, ValidationFunction } from '../input/InputState';

export class UserState {
    @observable public email: InputState;
    @observable public password: InputState;
    @observable public isAuth: boolean = false;
    @observable public isSignedUp: boolean = false;
    @observable public userId: string | null = null;
    @observable public formType: 'login' | 'signup' | 'reset-password' = 'login';
    @observable public formError: string | null = null;
    @observable public isLoading: boolean = true;

    public constructor() {
        makeAutoObservable(this);
        this.isUserAuth();
        this.email = new InputState('')
            .checkError(this.validateEmail());
        this.password  = new InputState('')
            .checkError(this.checkPassword());
    }

    @action public isUserAuth = async (): Promise<void> => {
        try {
            this.setIsLoading();
            const response = await isUserAuth();
            if (response) {
                this.setIsAuth();
                this.setUserId(response.user.id);
            }
        } catch (error) {
            console.log('Error authenticating user')
        }
    };

    @computed public get isSubmitDisabled(): boolean {
        const isEmpty = this.email.value === '' || this.password.value === '';
        const isError = this.email.error !== null || this.password.error !== null;
        return isEmpty || isError;
    }

    @action public signUpUser = async (): Promise<void> => {
        if (this.formError === null) {
            try {
                const { session, error } = await signUpUser(this.email.value, this.password.value);

                if (error) {
                    this.setError(error.message);
                } else if (session) {
                    this.setSignedUp();
                    this.setUserId(session.user.id);
                    this.setIsAuth();
                    this.setError(null);
                } else {
                    console.log('Something went wrong...')
                }
            } catch (error) {
                console.log('Error signing up')
            }
        }
    };

    @action public signInUser = async (): Promise<void> => {
        try {
            const { session, error } = await signInUser(this.email.value, this.password.value);

            if (error) {
                this.setError(error.message);
            } else if (session) {
                this.setIsAuth();
                this.setUserId(session.user.id);
                this.setError(null);
            } else {
                console.log('Something went wrong...');
            }
        } catch (err) {
            console.log('Something went wrong...');
        }
    };

    @action public signOutUser = async (): Promise<void> => {
        try {
            const error = await signOutUser();

            if (error) {
                console.log('Error logging out: ', error);
            } else {
                this.setIsAuth();
                this.setUserId(null);
                this.setError(null);
            }
        } catch (error) {
            console.log('Error logging out')
        }
    };

    @action public setFormType = (formType: 'signup' | 'login' | 'reset-password') => {
        this.formType = formType;
        this.setError(null);
    }

    @action private setSignedUp = (): void => {
        this.isSignedUp = true;
    }

    @action public setIsLoading = (): void => {
        this.isLoading = !this.isLoading;
    }

    @action private setIsAuth = (): void => {
        this.isAuth = !this.isAuth;
    }

    @action private setUserId = (userId: string | null): void => {
        this.userId = userId;
    }

    @action private setError = (error: string | null): void => {
        this.formError = error;
    }

    validateEmail = (): ValidationFunction => {
        return (value) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Incorrect e-mail format');
    }

    checkPassword = (): ValidationFunction => {
        console.log(this.formType)
        return (value) => {
            const hasMinLength = value.length >= 8;
            const hasNumber = /[0-9]/.test(value);
            const hasLowercase = /[a-z]/.test(value);
            const hasUppercase = /[A-Z]/.test(value);
            const hasSpecialChar = /[^0-9a-zA-Z]/.test(value);
    
            if (this.formType === 'login' || (hasMinLength && hasNumber && hasLowercase && hasUppercase && hasSpecialChar)) {
                return null;
            }
    
            return 'Password should be at least 8 characters long, have at least one uppercase and lowercase letter, at least one number and special character';
        };
    }
}
