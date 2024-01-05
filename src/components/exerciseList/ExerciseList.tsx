import { observer } from 'mobx-react-lite';
import { AppState } from '../../AppState.state';
import {
    ExerciseListContainer,
    SelectedCount
} from './ExerciseList.style';
import { DiskIconWrapper, Header } from '../common/common.style';
import { Exercise } from './Exercise';
import { Checkbox } from '../checkbox/Checkbox';
import { Button } from '../button/Button';

interface ExerciseListPropsType {
    appState: AppState;
}

export const ExerciseList = observer((props: ExerciseListPropsType) => {
    const { appState } = props;
    const { exercisesState } = appState;

    const {
        exercises,
        tempSelectedExercises,
        setSelectCheckbox,
        saveExercises
    } = exercisesState;

    return (
        <>
            <Header>EXERCISES LIST</Header>
            <Checkbox label='Select all' isChecked={tempSelectedExercises.length === exercises.length} onChange={() => setSelectCheckbox('all')}/>
            <Checkbox label='Select none' isChecked={tempSelectedExercises.length === 0} onChange={() => setSelectCheckbox('none')}/>
            <ExerciseListContainer>
                {exercises.map((exercise) => (
                    <Exercise key={exercise.id} exercise={exercise} appState={appState} />
                ))}
            </ExerciseListContainer>
            <SelectedCount>Selected: {`${tempSelectedExercises.length}/${exercises.length}`}</SelectedCount>
            <Button onClick={saveExercises}>
                <DiskIconWrapper />
                SAVE EXERCISES
            </Button>
        </>
    );
});
