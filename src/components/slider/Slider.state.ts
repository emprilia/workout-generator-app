import { makeAutoObservable } from 'mobx';
import { ExerciseType, ExercisesState } from '../exerciseList/ExercisesState';

interface ExerciseTypeTemp extends ExerciseType {
    tempId: number;
}

export class SliderState {
    public mobileSliderWidth: number = 340;
    public mobileThumbnailWidth: number = 56;

	public constructor(
        private readonly exercisesState: ExercisesState
    ) {
		makeAutoObservable(this);
	}
    
    public get sliderWidth(): number {
        return this.mobileSliderWidth;
    }

    public get sliderThumbnails(): Array<ExerciseTypeTemp> {
        return this.exercisesState.generatedWorkout.map((exercise, index) => ({
            ...exercise,
            tempId: index + 1
        }));
    }
    
    public getActiveSlide = (slideId: number): void => {
        this.exercisesState.currentExercise = slideId;
    };
    
    public get isFirstSlide(): boolean {
        return this.exercisesState.currentExercise === 1;
    }

    public get isLastSlide(): boolean {
        return this.exercisesState.currentExercise === this.sliderThumbnails.length;
    }

    public nextSlide = (): void => {
        this.exercisesState.currentExercise = this.exercisesState.currentExercise + 1;
    };
    
    public previousSlide = (): void => {
        this.exercisesState.currentExercise = this.exercisesState.currentExercise - 1;
    };

    public get translateSlide(): string | null {
        const activeSlide = this.exercisesState.currentExercise - 2;
        const translate = activeSlide * 100;

        return `calc( -${translate}% - ${this.sliderWidth}px )`;
    }

    public get translateThumbnailMobile(): string {
        const lastTwo = this.sliderThumbnails.slice(-2);

        if (this.exercisesState.currentExercise <= 3) {
            return ``;
        }

        if (lastTwo.some(exercise => exercise.tempId === this.exercisesState.currentExercise)) {
            // 168 = 56 * 3 (thumbnail width * 3)
            const position = `calc(-${(lastTwo[0].tempId - 1) * 56}px + 168px)`;
            return position;
        }

        return `calc(-${this.exercisesState.currentExercise*56}px + 168px)`;
    };

    public get translateThumbnail(): string {
        return this.translateThumbnailMobile;
    }
}