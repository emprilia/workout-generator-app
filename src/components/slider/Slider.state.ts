import { makeAutoObservable } from 'mobx';
import { ExercisesState } from '../exerciseList/ExercisesState';

export class SliderState {
    public mobileSliderWidth: number = 340;

	public constructor(
        private readonly exercisesState: ExercisesState
    ) {
		makeAutoObservable(this);
	}
    
    public get sliderWidth(): number {
        return this.mobileSliderWidth;
    }

    public get thumbnailsCount(): Array<number> {
        const thumbnailsCount: Array<number> = [];
        
        for (let i = 0; i < this.exercisesState.generatedWorkout.length; i++) {
            thumbnailsCount.push(i + 1);
        }

        return thumbnailsCount;
    }
    
    public getActiveSlide = (slideId: number): void => {
        this.exercisesState.currentExercise = slideId;
    };
    
    public get isFirstSlide(): boolean {
        return this.exercisesState.currentExercise === 1;
    }

    public get isLastSlide(): boolean {
        return this.exercisesState.currentExercise === this.thumbnailsCount.length;
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
        const lastTwo = this.thumbnailsCount.slice(-2);

        if (this.exercisesState.currentExercise <= 3) {
            return ``;
        }

        if (lastTwo.includes(this.exercisesState.currentExercise)) {
            // 168 = 56 * 3 (thumbnail width * 3)
            return `calc(-${(lastTwo[0]-1)*56}px + 168px)`;
        }

        return `calc(-${this.exercisesState.currentExercise*56}px + 168px)`;
    };

    public get translateThumbnail(): string {
        return this.translateThumbnailMobile;
    }
}