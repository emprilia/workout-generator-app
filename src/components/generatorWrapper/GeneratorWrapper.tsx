import React from 'react';
import { observer } from 'mobx-react-lite';
import { ExercisesState } from '../exerciseList/ExercisesState';
import { SliderState } from '../slider/Slider.state';
import { CounterState } from '../counter/CounterState';
import { TimerSettingType } from '../../api/supabaseTimerSettings';
import { Header } from '../common/common.style';
import { ExerciseSlider } from '../slider/exerciseSlider/ExerciseSlider';
import { ExerciseSliderThumbnails } from '../slider/exerciseThumbnailsSlider/ExerciseSliderThumbnails';

interface WorkoutGeneratorWrapperPropsType {
    exercisesState: ExercisesState;
    currentSetting: TimerSettingType;
}

export const WorkoutGeneratorWrapper = observer((props: WorkoutGeneratorWrapperPropsType) => {
    const { exercisesState, currentSetting } = props;
    const [sliderState] = React.useState(() => new SliderState(exercisesState));
    const [counterState] = React.useState(() => new CounterState(currentSetting, exercisesState));

    return (
        <>
            <Header>WORKOUT GENERATOR</Header>
            <ExerciseSlider exercisesState={exercisesState} counterState={counterState}  sliderState={sliderState} />
            <ExerciseSliderThumbnails exercisesState={exercisesState} sliderState={sliderState} />
        </>
    );
});
