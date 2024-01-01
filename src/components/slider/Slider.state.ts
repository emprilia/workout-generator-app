import { makeAutoObservable } from 'mobx';
import { AppState } from '../../AppState.state';

export class SliderState {
    public mobileSliderWidth: number = 340;

	public constructor(
        private readonly appState: AppState
    ) {
		makeAutoObservable(this);
	}
    
    public get sliderWidth(): number {
        return this.mobileSliderWidth;
    }

    public get thumbnailsCount(): Array<number> {
        const thumbnailsCount: Array<number> = [];
        
        for (let i = 0; i < this.appState.generatedWorkout.length; i++) {
            thumbnailsCount.push(i + 1);
        }

        return thumbnailsCount;
    }
    
    public getActiveSlide = (slideId: number): void => {
        this.appState.currentExercise = slideId;
    };
    
    public get isFirstSlide(): boolean {
        return this.appState.currentExercise === 1;
    }

    public get isLastSlide(): boolean {
        return this.appState.currentExercise === this.thumbnailsCount.length;
    }

    public nextSlide = (): void => {
        this.appState.currentExercise = this.appState.currentExercise + 1;
    };
    
    public previousSlide = (): void => {
        this.appState.currentExercise = this.appState.currentExercise - 1;
    };

    public get translateSlide(): string | null {
        const activeSlide = this.appState.currentExercise - 2;
        const translate = activeSlide * 100;

        return `calc( -${translate}% - ${this.sliderWidth}px )`;
    }

    public get translateThumbnailMobile(): string {
        const lastTwo = this.thumbnailsCount.slice(-2);

        if (this.appState.currentExercise <= 3) {
            return ``;
        }

        if (lastTwo.includes(this.appState.currentExercise)) {
            // 168 = 56 * 3 (thumbnail width * 3)
            return `calc(-${(lastTwo[0]-1)*56}px + 168px)`;
        }

        return `calc(-${this.appState.currentExercise*56}px + 168px)`;
    };

    public get translateThumbnail(): string {
        return this.translateThumbnailMobile;
    }
}