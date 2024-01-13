import React from 'react';
import { observer } from 'mobx-react-lite';
import { ExercisesState } from './ExercisesState';
import {
    ExerciseListWrapper,
    CreateExerciseWrapper,
} from './ExerciseList.style';
import { Exercise } from './Exercise';
import { Button } from '../button/Button';

interface ExerciseListContainerPropsType {
    exercisesState: ExercisesState;
}

export const ExerciseListContainer = observer((props: ExerciseListContainerPropsType) => {
    const { exercisesState } = props;

    const {
        showingExercises,
        setEditMode,
        isEditMode,
        setAddNew
    } = exercisesState;

    return (
        <ExerciseListWrapper>
            <CreateExerciseWrapper>
                <Button onClick={setAddNew}>
                    + Create new
                </Button>
            </CreateExerciseWrapper>
            {showingExercises.map((exercise) => (
                <React.Fragment key={exercise.id}>
                    <Exercise setEditMode={setEditMode} isEditMode={isEditMode} exercise={exercise} exercisesState={exercisesState} />
                </React.Fragment>
            ))}
        </ExerciseListWrapper>
    );
});
