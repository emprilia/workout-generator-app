import { observer } from 'mobx-react-lite';
import { ExercisesState } from './ExercisesState';
import {
    ExerciseListActionsWrapper,
    ActionsWrapper,
    EditIconWrapper,
    TrashIconWrapper,
    ExitIconWrapper
} from './ExerciseList.style';
import { DiskIconWrapper } from '../common/common.style';
import { Checkbox } from '../checkbox/Checkbox';
import { Button } from '../button/Button';

interface ActionsContainerPropsType {
    exercisesState: ExercisesState;
}

export const ActionsContainer = observer((props: ActionsContainerPropsType) => {
    const { exercisesState } = props;

    const {
        showingExercises,
        selectedExercises,
        activeExercises,
        changedExercises,
        setEditMode,
        isEditMode,
        setSelectCheckbox,
        saveExercises,
        handleDeleteExercises
    } = exercisesState;

    return (
        <ExerciseListActionsWrapper>
            <ActionsWrapper>
                <Checkbox
                    label={isEditMode ? 'Select all' : 'Set all active'}
                    isChecked={isEditMode ? selectedExercises.length === showingExercises.length : activeExercises.length === showingExercises.length}
                    onChange={() => setSelectCheckbox('all')}
                />
                <Checkbox
                    label={isEditMode ? 'Select none' : 'Set all inactive'}
                    isChecked={isEditMode ? selectedExercises.length === 0 : activeExercises.length === 0}
                    onChange={() => setSelectCheckbox('none')}
                />
                {isEditMode ? `Delete: ${selectedExercises.length}/${showingExercises.length}` : `Active: ${activeExercises.length}/${showingExercises.length}`}
            </ActionsWrapper>
            <ActionsWrapper>
                <Button width='full' size='small' onClick={setEditMode}>
                    {isEditMode ? <><ExitIconWrapper /> Exit edit mode</> : <><EditIconWrapper /> Enter edit mode</>}
                </Button>
                {isEditMode ? <Button width='full' isDisabled={selectedExercises.length === 0} size='small' onClick={() => handleDeleteExercises(selectedExercises)}><TrashIconWrapper />Delete selected</Button> :
                    <Button width='full' isDisabled={changedExercises.length === 0} size='small' onClick={saveExercises}>
                        <DiskIconWrapper />{changedExercises.length === 0 ? 'No changes' : 'Save changes'}
                    </Button>
                }
            </ActionsWrapper>
        </ExerciseListActionsWrapper>
    );
});
