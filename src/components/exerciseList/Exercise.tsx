import React from 'react';
import { observer } from 'mobx-react-lite';
import { ExerciseState } from './ExerciseState';
import { ExerciseType, ExercisesState } from './ExercisesState';
import {
    ExerciseWrapper,
    ExerciseInfo,
    ExerciseLabel,
    ExerciseImg,
    StarIconWrapper,
} from './Exercise.style';

interface ExercisePropsType {
    exercise: ExerciseType;
    exercisesState: ExercisesState;
}

export const Exercise = observer((props: ExercisePropsType) => {
    const { exercise, exercisesState } = props;

    const [exerciseState] = React.useState(() => new ExerciseState(exercise, exercisesState));

    const { setSelected, setFavorite } = exerciseState;
    const { label, imgUrl, isSelected, isFavorite } = exercise;

    return (
        <ExerciseWrapper isSelected={isSelected}>
            <ExerciseInfo>
                <ExerciseImg src={imgUrl} alt={`Picture of ${label} exercise`} onClick={setSelected} />
                <ExerciseLabel>{label}</ExerciseLabel>
            </ExerciseInfo>
            <StarIconWrapper isFilled={isFavorite} onClick={setFavorite} />
        </ExerciseWrapper>
    );
});
