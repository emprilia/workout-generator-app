import React from 'react';
import { observer } from 'mobx-react-lite';
import { AppState } from './AppState.state';
import { AppWrapper } from './App.style';
import { TimerSettings } from './components/timerSettings/TimerSettings';
import { ExerciseList } from './components/exerciseList/ExerciseList';
import { WorkoutGeneratorWrapper } from './components/generatorWrapper/GeneratorWrapper';

export const App = observer(() => {
    const [appState] = React.useState(() => new AppState());

    return (
    <AppWrapper>
        <TimerSettings appState={appState} />
        <ExerciseList appState={appState} />
        <WorkoutGeneratorWrapper exercisesState={appState.exercisesState}></WorkoutGeneratorWrapper>
    </AppWrapper>
  )
})
