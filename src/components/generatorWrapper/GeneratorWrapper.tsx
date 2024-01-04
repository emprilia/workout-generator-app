import React from 'react';
import { observer } from 'mobx-react-lite';
import { ExercisesState } from '../exerciseList/ExercisesState';
import { SliderState } from '../slider/Slider.state';
import { Header } from '../common/common.style';
import { ExerciseSlider } from '../slider/exerciseSlider/ExerciseSlider';
import { ExerciseSliderThumbnails } from '../slider/exerciseThumbnailsSlider/ExerciseSliderThumbnails';

interface WorkoutGeneratorWrapperPropsType {
    exercisesState: ExercisesState;
}

export const WorkoutGeneratorWrapper = observer((props: WorkoutGeneratorWrapperPropsType) => {
    const { exercisesState } = props;
    const [sliderState] = React.useState(() => new SliderState(exercisesState));

    return (
        <>
            <Header>WORKOUT GENERATOR</Header>
            <ExerciseSlider exercisesState={exercisesState} sliderState={sliderState} />
            <ExerciseSliderThumbnails exercisesState={exercisesState} sliderState={sliderState} />
        </>
    );
});
