import { action, observable, makeAutoObservable } from 'mobx';
//@ts-expect-error
import ding from '../../assets/audio/ding.mp3';
//@ts-expect-error
import longDing from '../../assets/audio/longDing.mp3';
// @ts-expect-error
import tick from '../../assets/audio/tick.mp3'
import { TimerSettingsState } from '../timerSettings/TimerSettingsState';
import { ExercisesState } from '../exerciseList/ExercisesState';

export class CounterState {
    @observable public currentExercise: number = 1;
    @observable public currentRound: number = 1;
    @observable public hasStarted: boolean = false;
    @observable public isWorkoutTime: boolean = false;
    @observable public isBreakTime: boolean = false;
    @observable public isMuted: boolean = false;
    @observable public prepTime: number = this.timerSettingsState.savedPrepTime;
    @observable public workoutTime: number = this.timerSettingsState.savedWorkoutTime;
    @observable public breakTime: number = this.timerSettingsState.savedBreakTime;
    @observable public time: number = this.prepTime;

    public constructor(
        private timerSettingsState: TimerSettingsState,
        private exercisesState: ExercisesState
    ) {
        makeAutoObservable(this);
    }

    @action public setIsMuted = (): void => {
        this.isMuted = !this.isMuted;
    }

    private playSound(): void {
        if (this.isMuted) {
            return;
        }

        if (this.isBreakTime === false && this.time % 10 === 0 && this.time !== 0) {
            const sound = new Audio(ding)
            sound.play();
        }

        if (this.time > 5) {
            const sound = new Audio(tick)
            sound.play();
        }

        if (this.time <= 5 && this.time > 1) {
            const sound = new Audio(ding)
            sound.play();
        }

        if (this.time === 1) {
            const sound = new Audio(longDing)
            sound.play();
        }
    }

    @action private setTime = (value: number): void => {
        this.time = value;
    }

    @action private setHasStarted = (): void => {
        this.hasStarted = !this.hasStarted;
    }

    @action private setIsBreakTime = (): void => {
        this.isBreakTime = !this.isBreakTime;
    }

    @action private setIsWorkoutTime = (): void => {
        this.isWorkoutTime = !this.isWorkoutTime;
    }

    @action public startTimer = async (): Promise<void> => {
        if (this.hasStarted) {
            return; // TODO: temporary workaround - add stop/refresh and pause method
        }

        await this.startOfCountdown(this.prepTime);

        for (let i = 0; i < this.exercisesState.initialExerciseSuggestions.length + 1; i++) {
            await this.workoutTimer(i, this.workoutTime);

            if (i !== this.exercisesState.initialExerciseSuggestions.length) {
                await this.breakTimer(this.breakTime);
            }
        }
    }

    @action private startOfCountdown(prepTime: number): Promise<number> {
        const prepDuration = prepTime * 1000;

        setTimeout(() => {
            this.setIsBreakTime();
            this.setHasStarted();
        }, 1000);

        return new Promise((resolve) => {
            const timer = setInterval(() => {
                this.setTime(prepTime--);
                this.playSound();
            }, 1000);

            setTimeout(() => { clearInterval(timer); resolve(this.prepTime) }, prepDuration);
        });
    }

    @action private workoutTimer(i: number, workoutTime: number): Promise<number> {
        const workoutDuration = workoutTime * 1000;

        setTimeout(() => {
            this.setIsBreakTime();
            this.setIsWorkoutTime();
        }, 1000);

        return new Promise((resolve) => {
            const timer = setInterval(() => {
                this.currentRound = i + 1;
                this.setTime(workoutTime--);
                this.playSound();
            }, 1000);
            setTimeout(() => { clearInterval(timer); resolve(workoutTime) }, workoutDuration);
        });
    }

    @action private breakTimer(breakTime: number): Promise<number> {
        const breakDuration = breakTime * 1000;
        this.setIsBreakTime();
        this.nextSlide();

        return new Promise((resolve) => {
            const timer = setInterval(() => {
                this.setTime(breakTime--);
                this.playSound();
            }, 1000);
            setTimeout(() => { clearInterval(timer); resolve(breakTime) }, breakDuration);
        });
    }

    @action public nextSlide = (): void => {
        this.exercisesState.currentExercise = this.exercisesState.currentExercise + 1;
    };
}
