import React from 'react';
import { observer } from 'mobx-react-lite';
import { WorkoutGeneratorState } from '../workoutGenerator/WorkoutGeneratorState';
import { SliderState } from '../slider/Slider.state';
import { CounterState } from '../counter/CounterState';
import { Header } from '../common/common.style';
import { ExerciseSlider } from '../slider/exerciseSlider/ExerciseSlider';
import { ExerciseSliderThumbnails } from '../slider/exerciseThumbnailsSlider/ExerciseSliderThumbnails';

interface WorkoutGeneratorWrapperPropsType {
    workoutGeneratorState: WorkoutGeneratorState;
}

export const WorkoutGeneratorWrapper = observer((props: WorkoutGeneratorWrapperPropsType) => {
    const { workoutGeneratorState } = props;
    const { timerSettingsState, exercisesState } = workoutGeneratorState;
    const [sliderState] = React.useState(() => new SliderState(exercisesState));
    const [counterState] = React.useState(() => new CounterState(timerSettingsState, exercisesState));

    return (
        <>
            <Header>WORKOUT GENERATOR</Header>
            <ExerciseSlider workoutGeneratorState={workoutGeneratorState} counterState={counterState}  sliderState={sliderState} />
            <ExerciseSliderThumbnails exercisesState={exercisesState} sliderState={sliderState} />
        </>
    );
});
