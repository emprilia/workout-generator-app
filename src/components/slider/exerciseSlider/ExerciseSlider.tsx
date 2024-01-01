import { observer } from 'mobx-react-lite';
import { AppState } from '../../../AppState.state';
import { SliderState } from '../Slider.state';
import {
    ExerciseContainer,
    ExerciseList,
    Exercise,
    ExerciseHeader,
    ExerciseLabel,
    RefreshIconWrapper,
    ExerciseImg,
} from './ExerciseSlider.style';

interface ExerciseSliderPropsType {
    appState: AppState;
    sliderState: SliderState;
}

export const ExerciseSlider = observer((props: ExerciseSliderPropsType) => {
    const { appState, sliderState } = props;

    const {
        generatedWorkout,
        generateNewWorkout
    } = appState;

    const {
        sliderWidth,
        translateSlide
    } = sliderState;

    return (
        <ExerciseContainer width={sliderWidth}>
            <ExerciseList translateX={translateSlide}>
                {generatedWorkout.map((exercise) => (
                    <Exercise key={exercise.title} width={sliderWidth}>
                        <ExerciseHeader>
                            <RefreshIconWrapper onClick={generateNewWorkout} />
                        </ExerciseHeader>
                        <ExerciseImg src={exercise.url} alt={`Picture of ${exercise.title} exercise`} />
                        <ExerciseLabel>{exercise.title}</ExerciseLabel>
                    </Exercise>
                ))}
            </ExerciseList>
        </ExerciseContainer>
    );
});
