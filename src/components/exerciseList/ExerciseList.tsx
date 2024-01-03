import { observer } from 'mobx-react-lite';
import {
    ExerciseListContainer,
    SelectedCount,
} from './ExerciseList.style';
import { Header } from '../common/common.style';
import { Exercise } from './Exercise';
import { Checkbox } from '../checkbox/Checkbox';
import { ExercisesState } from './ExercisesState';
import { WorkoutGeneratorState } from '../WorkoutGeneratorState';

interface ExerciseListPropsType {
    exercisesState: ExercisesState;
    workoutGeneratorState: WorkoutGeneratorState;
}

export const ExerciseList = observer((props: ExerciseListPropsType) => {
    const { exercisesState, workoutGeneratorState } = props;

    const {
        exercises,
        selectedExercises,
        setSelectCheckbox
    } = exercisesState;

    return (
        <>
            <Header>EXERCISES LIST</Header>
            <Checkbox label='Select all' isChecked={selectedExercises.length === exercises.length} onChange={() => setSelectCheckbox('all')}/>
            <Checkbox label='Select none' isChecked={selectedExercises.length === 0} onChange={() => setSelectCheckbox('none')}/>
            <ExerciseListContainer>
                {workoutGeneratorState.exercises.map((exercise) => (
                    <Exercise key={exercise.id} exercise={exercise} exercisesState={exercisesState} workoutGeneratorState={workoutGeneratorState} />
                    ))}
            </ExerciseListContainer>
            <SelectedCount>Selected: {`${workoutGeneratorState.selectedExercises.length}/${exercises.length}`}</SelectedCount>
        </>
    );
});
