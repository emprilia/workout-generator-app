import React from 'react';
import { observer } from 'mobx-react-lite';
import { AppState } from '../../AppState.state';
import { SliderState } from '../slider/Slider.state';
import { Header } from '../common/common.style';
import { ExerciseSlider } from '../slider/exerciseSlider/ExerciseSlider';
import { ExerciseSliderThumbnails } from '../slider/exerciseThumbnailsSlider/ExerciseSliderThumbnails';
import { CounterState } from '../counter/CounterState';

interface WorkoutGeneratorWrapperPropsType {
    appState: AppState;
}

export const WorkoutGeneratorWrapper = observer((props: WorkoutGeneratorWrapperPropsType) => {
    const { appState } = props;
    const { timerSettingsState, exercisesState } = appState;
    const [sliderState] = React.useState(() => new SliderState(exercisesState));
    const [counterState] = React.useState(() => new CounterState(timerSettingsState, exercisesState));

    return (
        <>
            <Header>WORKOUT GENERATOR</Header>
            <ExerciseSlider appState={appState} counterState={counterState}  sliderState={sliderState} />
            <ExerciseSliderThumbnails exercisesState={exercisesState} sliderState={sliderState} />
        </>
    );
});
