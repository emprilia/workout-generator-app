import React from 'react';
import { observer } from 'mobx-react-lite';
import { AppState } from '../../AppState.state';
import { SliderState } from '../slider/Slider.state';
import { Header } from '../common/common.style';
import { ExerciseSlider } from '../slider/exerciseSlider/ExerciseSlider';
import { ExerciseSliderThumbnails } from '../slider/exerciseThumbnailsSlider/ExerciseSliderThumbnails';

interface WorkoutGeneratorWrapperPropsType {
    appState: AppState;
}

export const WorkoutGeneratorWrapper = observer((props: WorkoutGeneratorWrapperPropsType) => {
    const { appState } = props;
    const { exercisesState } = appState;
    const [sliderState] = React.useState(() => new SliderState(exercisesState));

    return (
        <>
            <Header>WORKOUT GENERATOR</Header>
            <ExerciseSlider appState={appState} sliderState={sliderState} />
            <ExerciseSliderThumbnails exercisesState={exercisesState} sliderState={sliderState} />
        </>
    );
});
