import React from 'react';
import { observer } from 'mobx-react-lite';
import { WorkoutGeneratorState } from './WorkoutGeneratorState';
import { AppWrapper, MenuHeader, AppLogoWrapper, MenuWrapper, MenuItem, LogoutIconWrapper } from '../../App.style';
import { LoaderApp } from '../loader/LoaderApp';
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
                <MenuHeader>
                    <AppLogoWrapper onClick={() => setView('generator')} />
                        <MenuWrapper>
                            <MenuItem isActive={currentView === 'generator'} onClick={() => setView('generator')}>MAIN</MenuItem>
                            <MenuItem isActive={currentView === 'timer-settings'} onClick={() => setView('timer-settings')}>TIMER</MenuItem>
                            <MenuItem isActive={currentView === 'exercises-list'} onClick={() => setView('exercises-list')}>EXERCISES</MenuItem>
                        </MenuWrapper>
                        <LogoutIconWrapper onClick={signOutUser} />
                </MenuHeader>
                <AppWrapper>
                    {currentView === 'timer-settings' && <TimerSettings timerSettingsState={timerSettingsState} />}
                    {currentView === 'exercises-list' && <ExerciseList getExerciseList={workoutGeneratorState.getUserExerciseList} userId={userId} exercisesState={exercisesState} />}
                    {currentView === 'generator' && <WorkoutGeneratorWrapper currentSetting={timerSettingsState.currentSetting} exercisesState={exercisesState} />}
                </AppWrapper>
            </>}
        </>
  )
})
