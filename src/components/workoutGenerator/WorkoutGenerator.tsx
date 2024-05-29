import React from 'react';
import { observer } from 'mobx-react-lite';
import { WorkoutGeneratorState } from './WorkoutGeneratorState';
import { AppWrapper, MenuHeader, MenuWrapper, MenuItem, LogoutIconWrapper } from '../../App.style';
import { LoaderApp } from '../loader/LoaderApp';
import { TimerSettings } from '../timerSettings/TimerSettings';
import { ExerciseList } from '../exerciseList/ExerciseList';
import { WorkoutGeneratorWrapper } from '../generatorWrapper/GeneratorWrapper';
import { Route, Routes, Link } from 'react-router-dom';
import { AppLogoSmall } from '../common/common.style';

interface WorkoutGeneratorPropsType {
    userId: string;
    isSignedUp: boolean;
    signOutUser: () => Promise<void>;
    isMobile: boolean;
    currentView: string;
}

type ViewPropsType = {
    name: string;
    path: string;
    component: JSX.Element;
    dataTest: string;
}

export const WorkoutGenerator = observer((props: WorkoutGeneratorPropsType) => {
    const { userId, isSignedUp, signOutUser, isMobile, currentView } = props;

    const [workoutGeneratorState] = React.useState(() => new WorkoutGeneratorState(userId, isSignedUp));

    const {
        timerSettingsState,
        exercisesState,
        createdExercisesCount,
        initialExercisesCount
    } = workoutGeneratorState;

    if (timerSettingsState.currentSetting === null || exercisesState.allExercises.length === 0) {
        return <LoaderApp isSignedUp={isSignedUp} createdExercisesCount={createdExercisesCount} initialExercisesCount={initialExercisesCount}/>;
    }

    const mainNavPaths: Array<ViewPropsType> = [
        {
            name: "MAIN",
            path: "/",
            component: <WorkoutGeneratorWrapper
                currentSetting={timerSettingsState.currentSetting}
                exercisesState={exercisesState}
                isMobile={isMobile}
            />,
            dataTest: "generator-section"
        },
        {
            name: "EXERCISES",
            path: "/exercises-list",
            component: <ExerciseList
                getExerciseList={workoutGeneratorState.getUserExerciseList}
                userId={userId} exercisesState={exercisesState}
            />,
            dataTest: "exercises-section"

        },
        {
            name: "TIMER",
            path: "/timer-settings",
            component: <TimerSettings timerSettingsState={timerSettingsState} />,
            dataTest: "timer-section"
        },
    ];

    return (
        <>
            <MenuHeader>
                <Link to="/">
                    <AppLogoSmall />
                </Link>

                <MenuWrapper>
                    {mainNavPaths.map(path => (
                        <MenuItem
                            key={path.path}
                            isActive={currentView === path.path}
                            data-test={path.dataTest}
                            to={path.path}
                        >
                            {path.name}
                        </MenuItem>
                    ))}
                </MenuWrapper>
                <LogoutIconWrapper onClick={signOutUser} />
            </MenuHeader>
            <AppWrapper>
                <Routes>
                    {mainNavPaths.map(path => (
                        <Route
                            key={path.path}
                            element={path.component}
                            path={path.path}
                        >
                            {path.name}
                        </Route>
                    ))}
                </Routes>
            </AppWrapper>
        </>
    )
});
