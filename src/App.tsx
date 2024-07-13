import { observer } from 'mobx-react-lite';
import { useLocation } from 'react-router-dom';
import { UserForm } from './components/users/UserForm';
import { WorkoutGenerator } from './components/workoutGenerator/WorkoutGenerator';
import { LoaderApp } from './components/loader/LoaderApp';
import { useAppStateContext } from './AppStateContext';

export const App = observer(() => {
    const currentView = useLocation().pathname;
    const appState = useAppStateContext();

    const { userState } = appState;

    return (
        <>
            {userState.isLoading ? <LoaderApp isSignedUp={false} /> : <>
                {userState.isAuth && userState.userId ? <>
                    <WorkoutGenerator
                        userId={userState.userId}
                        isSignedUp={userState.isSignedUp}
                        signOutUser={userState.signOutUser}
                        currentView={currentView}
                    />
               </> : <UserForm userState={userState} />}
            </>}
        </>
    );
});
