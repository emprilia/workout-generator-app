import React from 'react';
import { observer } from 'mobx-react-lite';
import { ExerciseState } from './ExerciseState';
import {
    ExerciseWrapper,
    ExerciseInfo,
    ExerciseLabel,
    ExerciseImg,
    StarIconWrapper,
} from './Exercise.style';
import { ExercisesState, ExerciseType } from './ExercisesState';
import { WorkoutGeneratorState } from '../WorkoutGeneratorState';

interface ExercisePropsType {
    exercise: ExerciseType;
    exercisesState: ExercisesState;
    workoutGeneratorState: WorkoutGeneratorState;
}

export const Exercise = observer((props: ExercisePropsType) => {
    const { exercise, exercisesState, workoutGeneratorState } = props;

    const [exerciseState] = React.useState(() => new ExerciseState(exercise, exercisesState, workoutGeneratorState));

    const { setSelected, setFavorite } = exerciseState;
    const { title, url, isSelected, isFavorite } = exercise;

    return (
        <ExerciseWrapper isSelected={isSelected}>
            <ExerciseInfo>
                <ExerciseImg src={url} alt={`Picture of ${title} exercise`} onClick={setSelected} />
                <ExerciseLabel>{title}</ExerciseLabel>
            </ExerciseInfo>
            <StarIconWrapper isFilled={isFavorite} onClick={setFavorite} />
        </ExerciseWrapper>
    );
});
