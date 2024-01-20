import React from 'react';
import { observer } from 'mobx-react-lite';
import { WorkoutGeneratorState } from './WorkoutGeneratorState';
import { MenuWrapper } from '../../App.style';
import { Button } from '../button/Button';
import { TimerSettings } from '../timerSettings/TimerSettings';
import { ExerciseList } from '../exerciseList/ExerciseList';
import { WorkoutGeneratorWrapper } from '../generatorWrapper/GeneratorWrapper';
import { ViewType } from '../../AppState.state';

interface WorkoutGeneratorPropsType {
    userId: string;
    isSignedUp: boolean;
    currentView: ViewType;
    setView: (value: ViewType) => void;
}

export const WorkoutGenerator = observer((props: WorkoutGeneratorPropsType) => {
    const { userId, isSignedUp, currentView, setView } = props;

    const [workoutGeneratorState] = React.useState(() => new WorkoutGeneratorState(userId, isSignedUp));

    const {
        timerSettingsState,
        exercisesState
    } = workoutGeneratorState;

    // add loader

    return (
        <>
            {timerSettingsState.currentSetting === null || exercisesState.allExercises.length === 0 ? <div>Loading</div> : <>
                <MenuWrapper>
                    <Button version={`${currentView === 'generator' ? 'secondary' : 'primary'}`} onClick={() => setView('generator')}>Main</Button>
                    <Button version={`${currentView === 'timer-settings' ? 'secondary' : 'primary'}`} onClick={() => setView('timer-settings')}>Timer Settings</Button>
                    <Button version={`${currentView === 'exercises-list' ? 'secondary' : 'primary'}`} onClick={() => setView('exercises-list')}>All Exercises</Button>
                </MenuWrapper>
                {currentView === 'timer-settings' && <TimerSettings timerSettingsState={timerSettingsState} />} 
                {currentView === 'exercises-list' && <ExerciseList getExerciseList={workoutGeneratorState.getUserExerciseList} userId={userId} exercisesState={exercisesState} />}
                {currentView === 'generator' && <WorkoutGeneratorWrapper currentSetting={timerSettingsState.currentSetting} exercisesState={exercisesState} />}
            </>}
        </>
  )
})
