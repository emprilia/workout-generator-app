import { observer } from 'mobx-react-lite';
import { Button } from '../button/Button';
import { UserState } from './UserState';
import { AppLogoWrapper, UserFormHeader, UserFormWrapper, UserInputWrapper, FormFooter } from './UserForm.style';
import { Header } from '../common/common.style';

interface UserFormPropsType {
    userState: UserState;
}

export const UserForm = observer((props: UserFormPropsType) => {
    const { userState } = props;
    const {
        email,
        password,
        signInUser,
        signUpUser,
        formType,
        setFormType,
        formError,
        isSubmitDisabled
    } = userState;

    return (
        <UserFormWrapper>
            <Header>WORKOUT GENERATOR</Header>
            <AppLogoWrapper />
            <UserFormHeader>{formType === 'login' ? 'LOGIN' : 'SIGN UP'}</UserFormHeader>
            <UserInputWrapper
                placeholder='E-mail'
                stateValue={email}
            />
            <UserInputWrapper
                placeholder='Password'
                stateValue={password}
                type='password'
            />
            {formError && <span>{formError}</span>}
            <Button isDisabled={isSubmitDisabled} width='full' onClick={formType === 'login' ? signInUser : signUpUser}>
                {formType === 'login' ? 'Login' : formType === 'signup' ? 'Sign up' : 'Reset password'}
            </Button>
            <FormFooter>
                {formType === 'login' ? <span onClick={() => setFormType('signup')}>Or sign up</span> : <span onClick={() => setFormType('login')}>Login</span>}
                <span>Test access credentials: test@test.com, Test1234!</span>
            </FormFooter>
        </UserFormWrapper>
    );
});
