import React from 'react';
import { observer } from 'mobx-react-lite';
import { FiltersState } from './FiltersState';
import { FiltersContainer } from './Filters.style';
import { ExercisesState } from '../exerciseList/ExercisesState';
import { FiltersWrapper } from './FiltersWrapper';

interface FiltersPropsType {
    exercisesState: ExercisesState;
}

export const Filters = observer((props: FiltersPropsType) => {
    const { exercisesState } = props;
    const {
        allExercises,
        updateShowing
    } = exercisesState;

    const [filtersState] = React.useState(() => new FiltersState(allExercises, updateShowing));

    return (
        <FiltersContainer>
            <FiltersWrapper filtersState={filtersState} type='filter'/>
            <FiltersWrapper filtersState={filtersState} type='sort'/>
        </FiltersContainer>
    );
});
