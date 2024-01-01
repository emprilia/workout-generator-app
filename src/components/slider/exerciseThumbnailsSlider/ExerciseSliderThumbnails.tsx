import { observer } from 'mobx-react-lite';
import { AppState } from '../../../AppState.state';
import { SliderState } from '../Slider.state';
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
//@ts-ignore
import ExerciseImage from '../../../assets/icons/rsz_yoga.png';

interface ExerciseSliderThumbnailsPropsType {
    appState: AppState;
    sliderState: SliderState;
}

export const ExerciseSliderThumbnails = observer((props: ExerciseSliderThumbnailsPropsType) => {
    const { appState, sliderState } = props;

    const {
        thumbnailsCount,
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
                    {thumbnailsCount.map((thumbnailCount) => ( // TODO: needs to be displayOrder
                        <ExerciseThumbnail
                            key={thumbnailCount}
                            onClick={(): void => getActiveSlide(thumbnailCount)}
                            isActive={appState.currentExercise === thumbnailCount}
                        >
                            <ExerciseNumber>{thumbnailCount}</ExerciseNumber>
                            {/* TODO: needs to be actual exercise image */}
                            <ExerciseThumbnailImg src={ExerciseImage} />
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
