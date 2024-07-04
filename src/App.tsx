import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useLocation } from 'react-router-dom';
import { AppState } from './AppState.state';
import { WorkoutGenerator } from './components/workoutGenerator/WorkoutGenerator';
import { LoaderApp } from './components/loader/LoaderApp';

export const App = observer(() => {
    const currentView = useLocation().pathname;
    const [appState] = useState(() => new AppState());

    const { userState, isMobile } = appState;

    // temporary for recruitment purposes
    userState.signInUser();

    return (
        <>
            {userState.isLoading ? <LoaderApp isSignedUp={false} /> : <>
                {userState.userId ? <>
                    <WorkoutGenerator
                        userId={userState.userId}
                        isSignedUp={userState.isSignedUp}
                        signOutUser={userState.signOutUser}
                        isMobile={isMobile}
                        currentView={currentView}
                    />
               </> : null }
               {/* </> : <UserForm userState={userState} />} */}
            </>}
        </>
    );
});
