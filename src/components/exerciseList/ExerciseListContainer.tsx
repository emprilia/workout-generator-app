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
    userId: string;
    getExerciseList: () => Promise<void>;
}

export const ExerciseListContainer = observer((props: ExerciseListContainerPropsType) => {
    const { exercisesState, userId, getExerciseList } = props;

    const {
        showingExercises,
        setEditMode,
        isEditMode,
        setAddNew
    } = exercisesState;

    return (
        <ExerciseListWrapper>
            <CreateExerciseWrapper>
                <Button onClick={setAddNew} dataTest="create-new-button">
                    + Create new
                </Button>
            </CreateExerciseWrapper>
            {showingExercises.map((exercise) => (
                <React.Fragment key={exercise.id}>
                    <Exercise getExerciseList={getExerciseList} userId={userId} setEditMode={setEditMode} isEditMode={isEditMode} exercise={exercise} exercisesState={exercisesState} />
                </React.Fragment>
            ))}
        </ExerciseListWrapper>
    );
});
