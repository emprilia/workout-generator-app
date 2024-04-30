import React from 'react';
import { observer } from 'mobx-react-lite';
import { WorkoutGeneratorState } from './WorkoutGeneratorState';
import { LogoutIconWrapper, MenuWrapper } from '../../App.style';
import { LoaderApp } from '../loader/LoaderApp';
import { Button } from '../button/Button';
import { TimerSettings } from '../timerSettings/TimerSettings';
import { ExerciseList } from '../exerciseList/ExerciseList';
import { WorkoutGeneratorWrapper } from '../generatorWrapper/GeneratorWrapper';
import { ViewType } from '../../AppState.state';

interface WorkoutGeneratorPropsType {
    userId: string;
    isSignedUp: boolean;
    signOutUser: () => Promise<void>;
    currentView: ViewType;
    setView: (value: ViewType) => void;
}

export const WorkoutGenerator = observer((props: WorkoutGeneratorPropsType) => {
    const { userId, isSignedUp, signOutUser, currentView, setView } = props;

    const [workoutGeneratorState] = React.useState(() => new WorkoutGeneratorState(userId, isSignedUp));

    const {
        timerSettingsState,
        exercisesState,
        createdExercisesCount,
        initialExercisesCount
    } = workoutGeneratorState;

    return (
        <>
            {timerSettingsState.currentSetting === null || exercisesState.allExercises.length === 0 ? <LoaderApp isSignedUp={isSignedUp} createdExercisesCount={createdExercisesCount} initialExercisesCount={initialExercisesCount}/> : <>
                <MenuWrapper>
                    <Button size='small' version={`${currentView === 'generator' ? 'secondary' : 'primary'}`} onClick={() => setView('generator')}>Main</Button>
                    <Button size='small' version={`${currentView === 'timer-settings' ? 'secondary' : 'primary'}`} onClick={() => setView('timer-settings')}>Timer</Button>
                    <Button size='small' version={`${currentView === 'exercises-list' ? 'secondary' : 'primary'}`} onClick={() => setView('exercises-list')}>Exercises</Button>
                    <Button size='small' onClick={signOutUser}><LogoutIconWrapper /> Logout</Button>
                </MenuWrapper>
                {currentView === 'timer-settings' && <TimerSettings timerSettingsState={timerSettingsState} />} 
                {currentView === 'exercises-list' && <ExerciseList getExerciseList={workoutGeneratorState.getUserExerciseList} userId={userId} exercisesState={exercisesState} />}
                {currentView === 'generator' && <WorkoutGeneratorWrapper currentSetting={timerSettingsState.currentSetting} exercisesState={exercisesState} />}
            </>}
        </>
  )
})
