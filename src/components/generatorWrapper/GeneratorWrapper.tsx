import { observer } from 'mobx-react-lite';
import React from 'react';
import { ExerciseSlider } from '../slider/exerciseSlider/ExerciseSlider';
import { SliderState } from '../slider/Slider.state';
import { AppState } from '../../AppState.state';
import { Header } from '../common/common.style';
import { ExerciseSliderThumbnails } from '../slider/exerciseThumbnailsSlider/ExerciseSliderThumbnails';

interface WorkoutGeneratorWrapperPropsType {
    appState: AppState;
}

export const WorkoutGeneratorWrapper = observer((props: WorkoutGeneratorWrapperPropsType) => {
    const { appState } = props;
    const [sliderState] = React.useState(() => new SliderState(appState));

    return (
        <>
            <Header>WORKOUT GENERATOR</Header>
            <ExerciseSlider appState={appState} sliderState={sliderState} />
            <ExerciseSliderThumbnails appState={appState} sliderState={sliderState} />
        </>
    );
});
