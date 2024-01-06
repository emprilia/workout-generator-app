import React from 'react';
import { observer } from 'mobx-react-lite';
import { AppState } from './AppState.state';
import { AppWrapper } from './App.style';
import { TimerSettings } from './components/timerSettings/TimerSettings';
import { ExerciseList } from './components/exerciseList/ExerciseList';
import { WorkoutGeneratorWrapper } from './components/generatorWrapper/GeneratorWrapper';
import { ImgUpload } from './components/imgUpload/ImgUpload';

export const App = observer(() => {
    const [appState] = React.useState(() => new AppState());

    return (
        <AppWrapper>
            {/* <ImgUpload /> */}
            {appState.timerSettingsState.timerSettings.label === 'default' ? <div>Loading</div> : <>
                {appState.currentView === 'timer-settings' ? <>
                    <div onClick={() => appState.setView('generator')}>generator</div>
                    <div onClick={() => appState.setView('exercises-list')}>exercises list</div>
                    <TimerSettings appState={appState} />
                </> : appState.currentView === 'exercises-list' ? <>
                    <div onClick={() => appState.setView('generator')}>generator</div>
                    <div onClick={() => appState.setView('timer-settings')}>timer settings</div>
                    <ExerciseList appState={appState} />
                </> : <>
                    <div onClick={() => appState.setView('timer-settings')}>timer settings</div>
                    <div onClick={() => appState.setView('exercises-list')}>exercises list</div>
                    <WorkoutGeneratorWrapper appState={appState} />
                </>}
            </>}
    </AppWrapper>
  )
})
