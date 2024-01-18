import React from 'react';
import { observer } from 'mobx-react-lite';
import { WorkoutGeneratorState } from '../../workoutGenerator/WorkoutGeneratorState';
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
    StopIconWrapper,
    RefreshIconWrapper,
    SpeakerIconWrapper,
    SpeakerMuteIconWrapper,
    NextLabel
} from './ExerciseSlider.style';
import { CounterIconWrapper } from '../../counter/Counter.style';

interface ExerciseSliderPropsType {
    workoutGeneratorState: WorkoutGeneratorState;
    sliderState: SliderState;
    counterState: CounterState;
}

export const ExerciseSlider = observer((props: ExerciseSliderPropsType) => {
    const { workoutGeneratorState, sliderState, counterState } = props;
    const { exercisesState } = workoutGeneratorState;

    const { 
        time,
        runTimer,
        hasStarted,
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
                    {hasStarted ? <StopIconWrapper onClick={runTimer} /> : <PlayIconWrapper onClick={runTimer} />}
                    <RefreshIconWrapper onClick={generateWorkout} />
                    {isMuted ? <SpeakerMuteIconWrapper onClick={setIsMuted} /> : <SpeakerIconWrapper onClick={setIsMuted} />}
                </ControlsWrapper>
            </ExerciseHeader>
            <ExerciseList translateX={translateSlide}>
                {generatedWorkout.map((exercise) => (
                    <Exercise key={exercise.label} width={sliderWidth}>
                        <ExerciseImg src={exercise.imgUrl} alt={`Picture of ${exercise.label} exercise`} />
                        <ExerciseLabel>{exercise.label}</ExerciseLabel>
                    </Exercise>
                ))}
            </ExerciseList>
        </ExerciseContainer>
    );
});
