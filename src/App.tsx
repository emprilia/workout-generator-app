import React from 'react';
import { observer } from 'mobx-react-lite';
import { AppState } from './AppState.state';
import { AppWrapper } from './App.style';
import { WorkoutGeneratorWrapper } from './components/generatorWrapper/GeneratorWrapper';

export const App = observer(() => {
  const [appState] = React.useState(() => new AppState());

  return (
    <AppWrapper>
        <WorkoutGeneratorWrapper appState={appState}></WorkoutGeneratorWrapper>
    </AppWrapper>
  )
})
