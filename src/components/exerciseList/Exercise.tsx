import React from 'react';
import { observer } from 'mobx-react-lite';
import { ExerciseState } from './ExerciseState';
import { ExerciseType, ExercisesState } from './ExercisesState';
import {
    ExerciseWrapper,
    ExerciseInfo,
    ExerciseLabel,
    ExerciseImg,
    EditIconWrapper,
    StarIconWrapper
} from './Exercise.style';
import { ExerciseForm } from './ExerciseForm';

interface ExercisePropsType {
    exercise: ExerciseType;
    exercisesState: ExercisesState;
}

export const Exercise = observer((props: ExercisePropsType) => {
    const { exercise, exercisesState } = props;

    const [exerciseState] = React.useState(() => new ExerciseState(exercise, exercisesState));

    const { getExerciseList } = exercisesState;
    const { setSelected, setFavorite, setEditMode, isEditMode } = exerciseState;
    const { label, imgUrl, isSelected, isFavorite } = exercise;

    return (
        <>
            {isEditMode && <ExerciseForm exercise={exercise} isEditMode={true} getExerciseList={getExerciseList} closePopup={setEditMode} />}
            <ExerciseWrapper isSelected={isSelected}>
                <ExerciseInfo>
                    <ExerciseImg src={imgUrl} alt={`Picture of ${label} exercise`} onClick={setSelected} />
                    <ExerciseLabel>{label}</ExerciseLabel>
                </ExerciseInfo>
                <EditIconWrapper onClick={setEditMode} />
                <StarIconWrapper isFilled={isFavorite} onClick={setFavorite} />
            </ExerciseWrapper>
        </>
    );
});
