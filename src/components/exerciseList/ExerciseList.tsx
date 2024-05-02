import React from 'react';
import { observer } from 'mobx-react-lite';
import { ExercisesState } from './ExercisesState';
import { Header, InfoWrapper } from '../common/common.style';
import { ExerciseForm } from './ExerciseForm';
import { Filters } from '../filters/Filters';
import { ActionsContainer } from './ActionsContainer';
import { ExerciseListContainer } from './ExerciseListContainer';

interface ExerciseListPropsType {
    exercisesState: ExercisesState;
    userId: string;
    getExerciseList: () => Promise<void>;
}

export const ExerciseList = observer((props: ExerciseListPropsType) => {
    const { exercisesState, userId, getExerciseList } = props;

    const {
        setAddNew,
        isAddNewView,
    } = exercisesState;

    return (
        <>
            {isAddNewView && <ExerciseForm userId={userId} isEditMode={false} getExerciseList={getExerciseList} closePopup={setAddNew} />}
            <Header>EXERCISES LIST</Header>
            <InfoWrapper>Exercises marked as active will be included in the workout generation.
                Inactive exercises are transparent and can be added to your set by clicking on them.
                Enter edit mode to modify or delete chosen exercises.
            </InfoWrapper>

            <Filters exercisesState={exercisesState} />

            <ActionsContainer exercisesState={exercisesState} />

            <ExerciseListContainer getExerciseList={getExerciseList} userId={userId} exercisesState={exercisesState} />
        </>
    );
});
