import { observer } from 'mobx-react-lite';
import { ExercisesState } from '../../exerciseList/ExercisesState';
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
    ImgPlaceholder,
    RoundLabel,
    PauseIconWrapper,
    FinishedWrapper,
    FinishedText,
    FinishedControlsWrapper,
    SuccessIconWrapper
} from './ExerciseSlider.style';
import { CounterIconWrapper } from '../../counter/Counter.style';
import { Button } from '../../button/Button';

interface ExerciseSliderPropsType {
    exercisesState: ExercisesState;
    sliderState: SliderState;
    counterState: CounterState;
}

export const ExerciseSlider = observer((props: ExerciseSliderPropsType) => {
    const { exercisesState, sliderState, counterState } = props;

    const {
        time,
        runTimer,
        hasStarted,
        pauseTimer,
        hasPaused,
        stopTimer,
        resumeTimer,
        isMuted,
        setIsMuted,
        isPrepTime,
        isBreakTime,
        isWorkoutTime,
        isWorkoutFinished,
        generateWorkout,
        handleGoAgain,
        handleGoNew
    } = counterState;

    const {
        generatedWorkout,
    } = exercisesState;

    const {
        sliderWidth,
        translateSlide
    } = sliderState;

    return (
        <ExerciseContainer width={sliderWidth}>
            {isWorkoutFinished ? <FinishedWrapper>
                <FinishedText>WELL DONE!</FinishedText>
                <SuccessIconWrapper />
                <FinishedControlsWrapper>
                    <Button size='small' onClick={handleGoAgain}>Do it again?</Button>
                    <Button size='small' onClick={handleGoNew}>Start new?</Button>
                </FinishedControlsWrapper>
                <div onClick={handleGoNew}>End for today</div>
            </FinishedWrapper> : <>
                <ExerciseHeader>
                    <CounterIconWrapper time={time} />
                    {
                        isPrepTime ? <RoundLabel>GET READY</RoundLabel> :
                        isBreakTime ? <RoundLabel>NEXT</RoundLabel> :
                        isWorkoutTime ? <RoundLabel>GO</RoundLabel> :
                        null
                    }
                    <ControlsWrapper>
                        {hasPaused ? <>
                            <PlayIconWrapper onClick={resumeTimer} />
                            <StopIconWrapper onClick={stopTimer} />
                        </> : hasStarted ? <>
                            {isPrepTime ? null : <PauseIconWrapper onClick={pauseTimer} />}
                            <StopIconWrapper onClick={stopTimer} />
                        </> : <PlayIconWrapper onClick={runTimer} />}
                        <RefreshIconWrapper onClick={generateWorkout} />
                        {isMuted ? <SpeakerMuteIconWrapper onClick={setIsMuted} /> : <SpeakerIconWrapper onClick={setIsMuted} />}
                    </ControlsWrapper>
                </ExerciseHeader>
                <ExerciseList translateX={translateSlide}>
                    {generatedWorkout.map((exercise) => (
                        <Exercise key={exercise.label} width={sliderWidth}>
                            {exercise.imgUrl === null ? <ImgPlaceholder /> : <ExerciseImg src={exercise.imgUrl} alt={`Picture of ${exercise.label} exercise`} />}
                            <ExerciseLabel>{exercise.label}</ExerciseLabel>
                        </Exercise>
                    ))}
                </ExerciseList>
            </>}
        </ExerciseContainer>
    );
});
