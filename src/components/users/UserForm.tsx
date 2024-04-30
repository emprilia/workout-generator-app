import { observer } from 'mobx-react-lite';
import { Input } from '../input/Input';
import { Button } from '../button/Button';
import { UserState } from './UserState';
import { ExerciseFormHeader, ExerciseFormWrapper } from '../exerciseList/ExerciseForm.style';

interface ExerciseFormPropsType {
    userState: UserState;
}

export const UserForm = observer((props: ExerciseFormPropsType) => {
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

    // TODO input style internal autofill selected

    return (
        <>
            <ExerciseFormWrapper>
                <ExerciseFormHeader>{formType === 'login' ? 'LOGIN' : 'SIGN UP'}</ExerciseFormHeader>
                    <Input
                        placeholder='E-mail'
                        stateValue={email}
                    />
                    <Input
                        placeholder='Password'
                        stateValue={password}
                        type='password'
                    />
                    {formError && <span>{formError}</span>}
                    <Button isDisabled={isSubmitDisabled} width='full' onClick={formType === 'login' ? signInUser : signUpUser}>
                        {formType === 'login' ? 'Login' : formType === 'signup' ? 'Sign up' : 'Reset password'}
                    </Button>
            </ExerciseFormWrapper>
            {formType === 'login' ? <span onClick={() => setFormType('signup')}>Sign up</span> : <span onClick={() => setFormType('login')}>Login</span>}
        </>
  );
});
