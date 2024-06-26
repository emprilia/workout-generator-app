import React from 'react';
import { observer } from 'mobx-react-lite';
import { ExercisesState } from './ExercisesState';
import { ExerciseState } from './ExerciseState';
import { ExerciseType } from '../../api/supabaseExercises';
import {
    ExerciseWrapper,
    ExerciseInfo,
    ExerciseLabel,
    ExerciseImg,
    EditIconWrapper,
    StarIconWrapper,
    ImgPlaceholder
} from './Exercise.style';
import { ExerciseForm } from './ExerciseForm';

interface ExercisePropsType {
    exercise: ExerciseType;
    exercisesState: ExercisesState;
    isEditMode: boolean;
    setEditMode: () => void;
    userId: string;
    getExerciseList: () => Promise<void>;
}

export const Exercise = observer((props: ExercisePropsType) => {
    const { exercise, exercisesState, isEditMode, userId, getExerciseList } = props;

    const [exerciseState] = React.useState(() => new ExerciseState(exercise, exercisesState));

    const { setSelected, setFavorite, isEditExercise, setEditExercise } = exerciseState;
    const { label, imgUrl, isActive, isFavorite } = exercise;

    const isSelected = exercisesState.selectedExercises.includes(exercise.id);

    return (
        <>
            {isEditExercise && <ExerciseForm userId={userId} exercise={exercise} isEditMode={true} getExerciseList={getExerciseList} closePopup={setEditExercise} />}
            <ExerciseWrapper isActive={isActive} isEditMode={isEditMode} isSelected={isSelected} data-test={`exercise-wrapper-${label}`}>
                <ExerciseInfo isActive={isActive} isEditMode={isEditMode} isSelected={isSelected} onClick={setSelected} data-test={`exercise-container`}>
                    {imgUrl === null ? <ImgPlaceholder /> : <ExerciseImg src={imgUrl} alt={`Picture of ${label} exercise`} />}
                    <ExerciseLabel data-test='created-exercise-label'>{label}</ExerciseLabel>
                </ExerciseInfo>
                {isEditMode ? <EditIconWrapper onClick={setEditExercise} /> : <StarIconWrapper isFilled={isFavorite} onClick={setFavorite} />}
            </ExerciseWrapper>
        </>
    );
});
