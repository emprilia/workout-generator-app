import React from 'react';
import { observer } from 'mobx-react-lite';
import { ExercisesState } from './ExercisesState';
import {
    ExerciseListContainer,
    CreateExerciseWrapper,
    ExerciseListActionsWrapper,
    ActionsWrapper,
    InfoWrapper,
    EditIconWrapper,
    TrashIconWrapper,
    ExitIconWrapper
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
        allExercisesSorted,
        selectedExercises,
        tempActiveExercises,
        changedExercises,
        setEditMode,
        isEditMode,
        setSelectCheckbox,
        saveExercises,
        setAddNew,
        isAddNewView,
        getExerciseList,
        handleDeleteExercises
    } = exercisesState;

    return (
        <>
            {isAddNewView && <ExerciseForm isEditMode={false} getExerciseList={getExerciseList} closePopup={setAddNew} />}
            <Header>EXERCISES LIST</Header>
            <InfoWrapper>Exercises marked as active will be included in the workout generation.
                Inactive exercises are transparent and can be added to your set by clicking on them.
                Enter edit mode to modify or delete chosen exercises.
            </InfoWrapper>

            <ExerciseListActionsWrapper>
                <ActionsWrapper>
                    <Checkbox
                        label={isEditMode ? 'Select all' : 'Set all active'}
                        isChecked={isEditMode ? selectedExercises.length === allExercisesSorted.length : tempActiveExercises.length === allExercisesSorted.length}
                        onChange={() => setSelectCheckbox('all')}
                    />
                    <Checkbox
                        label={isEditMode ? 'Select none' : 'Set all inactive'}
                        isChecked={isEditMode ? selectedExercises.length === 0 : tempActiveExercises.length === 0}
                        onChange={() => setSelectCheckbox('none')}
                    />
                    {isEditMode ? `Delete: ${selectedExercises.length}/${allExercisesSorted.length}` : `Active: ${tempActiveExercises.length}/${allExercisesSorted.length}`}
                </ActionsWrapper>
                <ActionsWrapper>
                    <Button width='full' size='small' onClick={setEditMode}>
                        {isEditMode ? <><ExitIconWrapper /> Exit edit mode</> : <><EditIconWrapper /> Enter edit mode</>}
                    </Button>
                    {isEditMode ? <Button width='full' isDisabled={selectedExercises.length === 0} size='small' onClick={() => handleDeleteExercises(selectedExercises)}><TrashIconWrapper />Delete selected</Button> : <Button width='full' isDisabled={changedExercises.length === 0} size='small' onClick={saveExercises}>
                        <DiskIconWrapper />{changedExercises.length === 0 ? 'No changes' : 'Save changes'}</Button>}
                </ActionsWrapper>
            </ExerciseListActionsWrapper>

            <ExerciseListContainer>
                <CreateExerciseWrapper>
                    <Button onClick={setAddNew}>
                        + Create new
                    </Button>
                </CreateExerciseWrapper>
                {allExercisesSorted.map((exercise) => (
                    <React.Fragment key={exercise.id}>
                        <Exercise setEditMode={setEditMode} isEditMode={isEditMode} exercise={exercise} exercisesState={exercisesState} />
                    </React.Fragment>
                ))}
            </ExerciseListContainer>
        </>
    );
});
