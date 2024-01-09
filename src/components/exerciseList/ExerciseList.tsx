import React from 'react';
import { observer } from 'mobx-react-lite';
import { ExercisesState } from './ExercisesState';
import {
    ExerciseListContainer,
    SelectedCount
} from './ExerciseList.style';
import { DiskIconWrapper, Header } from '../common/common.style';
import { Exercise } from './Exercise';
import { ExerciseForm } from './ExerciseForm';
import { Checkbox } from '../checkbox/Checkbox';
import { Button } from '../button/Button';

interface ExerciseListPropsType {
    exercisesState: ExercisesState;
}

export const ExerciseList = observer((props: ExerciseListPropsType) => {
    const { exercisesState } = props;

    const {
        allExercises,
        tempSelectedExercises,
        setSelectCheckbox,
        saveExercises,
        setAddNew,
        isAddNewView,
        getExerciseList
    } = exercisesState;

    return (
        <>
            {isAddNewView && <ExerciseForm isEditMode={false} getExerciseList={getExerciseList} closePopup={setAddNew} />}
            <Header>EXERCISES LIST</Header>
            <Button onClick={setAddNew}>+ Create new</Button>
            <Checkbox label='Select all' isChecked={tempSelectedExercises.length === allExercises.length} onChange={() => setSelectCheckbox('all')}/>
            <Checkbox label='Select none' isChecked={tempSelectedExercises.length === 0} onChange={() => setSelectCheckbox('none')}/>
            <ExerciseListContainer>
                {allExercises.map((exercise) => (
                    <React.Fragment key={exercise.id}>
                        <Exercise exercise={exercise} exercisesState={exercisesState} />
                    </React.Fragment>
                ))}
            </ExerciseListContainer>
            <SelectedCount>Selected: {`${tempSelectedExercises.length}/${allExercises.length}`}</SelectedCount>
            <Button onClick={saveExercises}>
                <DiskIconWrapper />
                SAVE EXERCISES
            </Button>
        </>
    );
});
