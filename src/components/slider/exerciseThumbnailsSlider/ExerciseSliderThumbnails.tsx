import { observer } from 'mobx-react-lite';
import { SliderState } from '../Slider.state';
import { ExercisesState } from '../../exerciseList/ExercisesState';
import {
    ExerciseThumbnailsWrapper,
    ExerciseThumbnailsContainer,
    ExerciseThumbnailsList,
    ExerciseThumbnail,
    ExerciseThumbnailImg,
    ExerciseNumber,
    ArrowButtonWrapper,
    ArrowWrapper,
} from './ExerciseSliderThumbnails.style';

interface ExerciseSliderThumbnailsPropsType {
    exercisesState: ExercisesState;
    sliderState: SliderState;
}

export const ExerciseSliderThumbnails = observer((props: ExerciseSliderThumbnailsPropsType) => {
    const { exercisesState, sliderState } = props;

    const {
        sliderThumbnails,
        getActiveSlide,
        nextSlide,
        previousSlide,
        isFirstSlide,
        isLastSlide,
        translateThumbnail,
    } = sliderState;

    return (
        <ExerciseThumbnailsWrapper>
            <ArrowButtonWrapper isDisabled={isFirstSlide} onClick={previousSlide}>
                <ArrowWrapper isDisabled={isFirstSlide} position='right' />
            </ArrowButtonWrapper>

            <ExerciseThumbnailsContainer>
                <ExerciseThumbnailsList translateX={translateThumbnail}>
                    {sliderThumbnails.map((thumbnail) => (
                        <ExerciseThumbnail
                            key={thumbnail.label}
                            onClick={(): void => getActiveSlide(thumbnail.tempId)}
                            isActive={exercisesState.currentExercise === thumbnail.tempId}
                        >
                            <ExerciseNumber>{thumbnail.tempId}</ExerciseNumber>
                            <ExerciseThumbnailImg src={thumbnail.imgUrl} />
                        </ExerciseThumbnail>
                    ))}
                </ExerciseThumbnailsList>
            </ExerciseThumbnailsContainer>

            <ArrowButtonWrapper isDisabled={isLastSlide} onClick={nextSlide}>
                <ArrowWrapper isDisabled={isLastSlide} position='left' />
            </ArrowButtonWrapper>
        </ExerciseThumbnailsWrapper>
    );
});
