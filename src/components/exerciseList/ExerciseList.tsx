import { observer } from 'mobx-react-lite';
import { AppState } from '../../AppState.state';
import {
    ExerciseListContainer,
    SelectedCount,
} from './ExerciseList.style';
import { Header } from '../common/common.style';
import { Exercise } from './Exercise';
import { Checkbox } from '../checkbox/Checkbox';

interface ExerciseListPropsType {
    appState: AppState;
}

export const ExerciseList = observer((props: ExerciseListPropsType) => {
    const { appState } = props;

    const {
        exercises,
        selectedExercises,
        setSelectCheckbox
    } = appState;

    return (
        <>
            <Header>EXERCISES LIST</Header>
            <Checkbox label='Select all' isChecked={selectedExercises.length === exercises.length} onChange={() => setSelectCheckbox('all')}/>
            <Checkbox label='Select none' isChecked={selectedExercises.length === 0} onChange={() => setSelectCheckbox('none')}/>
            <ExerciseListContainer>
                {exercises.map((exercise) => (
                    <Exercise key={exercise.id} exercise={exercise} appState={appState} />
                    ))}
            </ExerciseListContainer>
            <SelectedCount>Selected: {`${selectedExercises.length}/${exercises.length}`}</SelectedCount>
        </>
    );
});
