import React from 'react';
import { observer } from 'mobx-react-lite';
import { useLocation } from 'react-router-dom';
import { AppState } from './AppState.state';
import { UserForm } from './components/users/UserForm';
import { WorkoutGenerator } from './components/workoutGenerator/WorkoutGenerator';
import { LoaderApp } from './components/loader/LoaderApp';

export const App = observer(() => {
    const currentView = useLocation().pathname;
    const [appState] = React.useState(() => new AppState());

    const { userState, isMobile } = appState;

    return (
        <>
            {userState.isLoading ? <LoaderApp isSignedUp={false} /> : <>
                {userState.isAuth && userState.userId ? <>
                    <WorkoutGenerator
                        userId={userState.userId}
                        isSignedUp={userState.isSignedUp}
                        signOutUser={userState.signOutUser}
                        isMobile={isMobile}
                        currentView={currentView}
                    />
               </> : <UserForm userState={userState} />}
            </>}
        </>
    );
});
