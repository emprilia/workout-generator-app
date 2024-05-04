import React from 'react';
import { observer } from 'mobx-react-lite';
import { ExercisesState } from '../exerciseList/ExercisesState';
import { SliderState } from '../slider/Slider.state';
import { CounterState } from '../counter/CounterState';
import { TimerSettingType } from '../../api/supabaseTimerSettings';
import { ExerciseSlider } from '../slider/exerciseSlider/ExerciseSlider';
import { ExerciseSliderThumbnails } from '../slider/exerciseThumbnailsSlider/ExerciseSliderThumbnails';
import { VoiceOptions } from '../voiceOptions/VoiceOptions';

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
            <ExerciseSlider exercisesState={exercisesState} counterState={counterState}  sliderState={sliderState} />
            <ExerciseSliderThumbnails exercisesState={exercisesState} sliderState={sliderState} />
            <VoiceOptions
                isVoiceCommandOn={counterState.isVoiceCommandOn}
                startListening={counterState.startListening}
                abortListening={counterState.abortListening}
                isTextToSpeechOn={counterState.isTextToSpeechOn}
                setTextToSpeech={counterState.setTextToSpeech}
            />
        </>
    );
});
