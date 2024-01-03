import React from 'react';
import { observer } from 'mobx-react-lite';
import { AppState } from './AppState.state';
import { AppWrapper } from './App.style';
import { TimerSettings } from './components/timerSettings/TimerSettings';
import { ExerciseList } from './components/exerciseList/ExerciseList';
import { WorkoutGeneratorWrapper } from './components/generatorWrapper/GeneratorWrapper';
import { WorkoutGeneratorState } from './components/WorkoutGeneratorState';

export const App = observer(() => {
    const [appState] = React.useState(() => new AppState());
    const [workoutGeneratorState] = React.useState(() => new WorkoutGeneratorState());
    
    const {
        exercisesState,
        timerSettingsState
    } = workoutGeneratorState;

  return (
    <AppWrapper>
          <TimerSettings appState={appState} workoutGeneratorState={workoutGeneratorState} timerSettingsState={timerSettingsState} />
          {/* <ExerciseList appState={appState} /> */}
          max rounds wgs: {workoutGeneratorState.maxRounds}
          max rounds ts: {timerSettingsState.maxRoundsmaxx.value}
        <ExerciseList workoutGeneratorState={workoutGeneratorState} exercisesState={exercisesState} />
        <WorkoutGeneratorWrapper workoutGeneratorState={workoutGeneratorState}></WorkoutGeneratorWrapper>
    </AppWrapper>
  )
})
