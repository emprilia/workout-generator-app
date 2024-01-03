import { observer } from 'mobx-react-lite';
import React from 'react';
import { ExerciseSlider } from '../slider/exerciseSlider/ExerciseSlider';
import { SliderState } from '../slider/Slider.state';
import { AppState } from '../../AppState.state';
import { Header } from '../common/common.style';
import { ExerciseSliderThumbnails } from '../slider/exerciseThumbnailsSlider/ExerciseSliderThumbnails';
import { WorkoutGeneratorState } from '../WorkoutGeneratorState';

interface WorkoutGeneratorWrapperPropsType {
    workoutGeneratorState: WorkoutGeneratorState;
}

export const WorkoutGeneratorWrapper = observer((props: WorkoutGeneratorWrapperPropsType) => {
    const { workoutGeneratorState } = props;
    const [sliderState] = React.useState(() => new SliderState(workoutGeneratorState.exercisesState));

    return (
        <>
            <Header>WORKOUT GENERATOR</Header>
            <ExerciseSlider exercisesState={workoutGeneratorState.exercisesState} sliderState={sliderState} />
            <ExerciseSliderThumbnails exercisesState={workoutGeneratorState.exercisesState} sliderState={sliderState} />
        </>
    );
});
