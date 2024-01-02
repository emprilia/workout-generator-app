import React from 'react';
import { observer } from 'mobx-react-lite';
import { AppState } from './AppState.state';
import { AppWrapper } from './App.style';
import { ExerciseList } from './components/exerciseList/ExerciseList';
import { WorkoutGeneratorWrapper } from './components/generatorWrapper/GeneratorWrapper';

export const App = observer(() => {
  const [appState] = React.useState(() => new AppState());

  return (
      <AppWrapper>
        <ExerciseList appState={appState} />
        <WorkoutGeneratorWrapper appState={appState}></WorkoutGeneratorWrapper>
    </AppWrapper>
  )
})
