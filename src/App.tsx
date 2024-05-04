import React from 'react';
import { observer } from 'mobx-react-lite';
import { AppState } from './AppState.state';
import { UserForm } from './components/users/UserForm';
import { WorkoutGenerator } from './components/workoutGenerator/WorkoutGenerator';
import { LoaderApp } from './components/loader/LoaderApp';

export const App = observer(() => {
    const [appState] = React.useState(() => new AppState());

    const { userState, currentView, setView } = appState;

    return (
        <>
            {userState.isLoading ? <LoaderApp isSignedUp={false} /> : <>
                {userState.isAuth && userState.userId ? <>
                    <WorkoutGenerator
                        userId={userState.userId}
                        isSignedUp={userState.isSignedUp}
                        signOutUser={userState.signOutUser}
                        currentView={currentView}
                        setView={setView}
                    />
               </> : <UserForm userState={userState} />}
            </>}
        </>
    );
});
