import React from 'react';
import { observer } from 'mobx-react-lite';
import { AppState } from '../../AppState.state';
import { ExerciseState } from '../exercise/ExerciseState';
import { ExerciseType } from './ExercisesState';
import {
    ExerciseWrapper,
    ExerciseInfo,
    ExerciseLabel,
    ExerciseImg,
    StarIconWrapper,
} from './Exercise.style';

interface ExercisePropsType {
    exercise: ExerciseType;
    appState: AppState;
}

export const Exercise = observer((props: ExercisePropsType) => {
    const { exercise, appState } = props;

    const [exerciseState] = React.useState(() => new ExerciseState(exercise, appState));

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
