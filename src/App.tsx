import React from 'react';
import { observer } from 'mobx-react-lite';
import { AppState } from './AppState.state';
import { AppWrapper, LogoutIconWrapper } from './App.style';
import { Button } from './components/button/Button';
import { UserForm } from './components/users/UserForm';
import { WorkoutGenerator } from './components/workoutGenerator/WorkoutGenerator';

export const App = observer(() => {
    const [appState] = React.useState(() => new AppState());

    const { userState, currentView, setView } = appState;

    // TODO: add loader

    return (
        <AppWrapper>
            {userState.isAuth && userState.userId ? <>
                <WorkoutGenerator userId={userState.userId} isSignedUp={userState.isSignedUp} currentView={currentView} setView={setView}/>
                <Button onClick={userState.signOutUser}><LogoutIconWrapper /> Logout</Button>
            </> : <UserForm userState={appState.userState} />}
        </AppWrapper>
    );
});
