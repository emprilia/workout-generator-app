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
import { ExercisesState } from '../../exerciseList/ExercisesState';

interface ExerciseSliderPropsType {
    exercisesState: ExercisesState;
    sliderState: SliderState;
}

export const ExerciseSlider = observer((props: ExerciseSliderPropsType) => {
    const { exercisesState, sliderState } = props;

    const {
        generatedWorkout,
        generateNewWorkout
    } = exercisesState;

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
