import React from 'react';
import { observer } from 'mobx-react-lite';
import { SliderState } from '../Slider.state';
import { CounterState } from '../../counter/CounterState';
import {
    ExerciseContainer,
    ExerciseList,
    Exercise,
    ExerciseHeader,
    ExerciseLabel,
    ExerciseImg,
    ControlsWrapper,
    PlayIconWrapper,
    RefreshIconWrapper,
    SpeakerIconWrapper,
    SpeakerMuteIconWrapper,
    NextLabel
} from './ExerciseSlider.style';
import { CounterIconWrapper } from '../../counter/Counter.style';
import { AppState } from '../../../AppState.state';

interface ExerciseSliderPropsType {
    appState: AppState;
    sliderState: SliderState;
}

export const ExerciseSlider = observer((props: ExerciseSliderPropsType) => {
    const { appState, sliderState } = props;
    const { timerSettingsState, exercisesState } = appState;
    const [counterState] = React.useState(() => new CounterState(timerSettingsState, exercisesState));

    const { 
        time,
        startTimer,
        isMuted,
        setIsMuted
    } = counterState;

    const {
        generatedWorkout,
        generateWorkout
    } = exercisesState;

    const {
        sliderWidth,
        translateSlide
    } = sliderState;

    return (
        <ExerciseContainer width={sliderWidth}>
            <ExerciseHeader>
                <CounterIconWrapper time={time} />
                {counterState.isBreakTime ? <NextLabel>NEXT</NextLabel>: null}
                <ControlsWrapper>
                    <PlayIconWrapper onClick={startTimer} />
                    <RefreshIconWrapper onClick={generateWorkout} />
                    {isMuted ? <SpeakerMuteIconWrapper onClick={setIsMuted} /> : <SpeakerIconWrapper onClick={setIsMuted} />}
                </ControlsWrapper>
            </ExerciseHeader>
            <ExerciseList translateX={translateSlide}>
                {generatedWorkout.map((exercise) => (
                    <Exercise key={exercise.title} width={sliderWidth}>
                        <ExerciseImg src={exercise.url} alt={`Picture of ${exercise.title} exercise`} />
                        <ExerciseLabel>{exercise.title}</ExerciseLabel>
                    </Exercise>
                ))}
            </ExerciseList>
        </ExerciseContainer>
    );
});
