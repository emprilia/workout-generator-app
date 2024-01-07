import { observer } from 'mobx-react-lite';
import { ExercisesState } from './ExercisesState';
import {
    BackButton,
    ExerciseListContainer,
    SelectedCount
} from './ExerciseList.style';
import { DiskIconWrapper, Header } from '../common/common.style';
import { Exercise } from './Exercise';
import { Checkbox } from '../checkbox/Checkbox';
import { Button } from '../button/Button';
import { ExerciseForm } from './ExerciseForm';
import { OverlayWrapper } from './ExerciseForm.style';

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
        isAddNewView
    } = exercisesState;

    return (
        <>
            {isAddNewView && <>
                <OverlayWrapper onClick={setAddNew} />
                <ExerciseForm />
                <BackButton onClick={setAddNew}>Back to all exercises</BackButton>
            </>}
            <Header>EXERCISES LIST</Header>
            <Button onClick={setAddNew}>+ Create new</Button>
            <Checkbox label='Select all' isChecked={tempSelectedExercises.length === allExercises.length} onChange={() => setSelectCheckbox('all')}/>
            <Checkbox label='Select none' isChecked={tempSelectedExercises.length === 0} onChange={() => setSelectCheckbox('none')}/>
            <ExerciseListContainer>
                {allExercises.map((exercise) => (
                    <Exercise key={exercise.id} exercise={exercise} exercisesState={exercisesState} />
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
