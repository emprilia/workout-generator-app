import React from 'react';
import { observer } from 'mobx-react-lite';
import { AppState } from './AppState.state';
import { AppWrapper, MenuWrapper } from './App.style';
import { TimerSettings } from './components/timerSettings/TimerSettings';
import { ExerciseList } from './components/exerciseList/ExerciseList';
import { WorkoutGeneratorWrapper } from './components/generatorWrapper/GeneratorWrapper';
import { Button } from './components/button/Button';

export const App = observer(() => {
    const [appState] = React.useState(() => new AppState());

    const {
        currentView,
        setView,
        timerSettingsState,
        exercisesState
    } = appState;

    // TODO: add loader

    return (
        <AppWrapper>
            {timerSettingsState.timerSettings.label === 'initial' || exercisesState.allExercises.length === 0 ? <div>Loading</div> : <>
                <MenuWrapper>
                    <Button version={`${currentView === 'generator' ? 'secondary' : 'primary'}`} onClick={() => setView('generator')}>Main</Button>
                    <Button version={`${currentView === 'timer-settings' ? 'secondary' : 'primary'}`} onClick={() => setView('timer-settings')}>Timer Settings</Button>
                    <Button version={`${currentView === 'exercises-list' ? 'secondary' : 'primary'}`} onClick={() => setView('exercises-list')}>All Exercises</Button>
                </MenuWrapper>
                {currentView === 'timer-settings' && <TimerSettings timerSettingsState={appState.timerSettingsState} />}
                {currentView === 'exercises-list' && <ExerciseList exercisesState={appState.exercisesState} />}
                {currentView === 'generator' && <WorkoutGeneratorWrapper appState={appState} />}
            </>}
        </AppWrapper>
  )
})
