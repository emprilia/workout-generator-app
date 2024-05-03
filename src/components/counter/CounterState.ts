import { action, observable, makeAutoObservable } from 'mobx';
//@ts-expect-error
import ding from '../../assets/audio/ding.mp3';
//@ts-expect-error
import longDing from '../../assets/audio/longDing.mp3';
// @ts-expect-error
import tick from '../../assets/audio/tick.mp3'
import { TimerSettingType } from '../../api/supabaseTimerSettings';
import { ExercisesState } from '../exerciseList/ExercisesState';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const synthesis = window.speechSynthesis;

export class CounterState {
    @observable public currentSlide: number = 1;
    @observable public hasStarted: boolean = false;
    @observable public hasPaused: boolean = false;
    @observable public hasResumed: boolean = false;
    @observable public hasStopped: boolean = false;
    @observable public isWorkoutFinished: boolean = false;
    @observable public isWorkoutTime: boolean = false;
    @observable public isBreakTime: boolean = false;
    @observable public isPrepTime: boolean = false;
    @observable public isMuted: boolean = false;
    @observable public prepTime: number = this.currentSetting.prepTime;
    @observable public workoutTime: number = this.currentSetting.workoutTime;
    @observable public breakTime: number = this.currentSetting.breakTime;
    @observable public time: number = this.prepTime;
    @observable private prepTimeCounterReference: NodeJS.Timeout | undefined = undefined;
    @observable private breakTimeCounterReference: NodeJS.Timeout | undefined = undefined;
    @observable private workoutTimeCounterReference: NodeJS.Timeout | undefined = undefined;
    @observable public isTextToSpeechOn: boolean = false;
    @observable public isVoiceCommandOn: boolean = false;
    private recognition: SpeechRecognition;

    public constructor(
        private currentSetting: TimerSettingType,
        private exercisesState: ExercisesState
    ) {
        makeAutoObservable(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        window.addEventListener('keydown', this.handleKeyDown);
        this.recognition = new SpeechRecognition();
        this.recognition.lang = 'en-US';
        this.recognition.continuous = true;
        this.recognition.onstart = this.handleVoiceStart;
        this.recognition.onresult = this.handleVoiceResult;
        this.recognition.onerror = this.handleVoiceError;
    }

    @action public setTextToSpeech = (): void => {
        this.isTextToSpeechOn = !this.isTextToSpeechOn;
    }

    private readText = (text: string): void => {
        if (this.isTextToSpeechOn) {
            const read = new SpeechSynthesisUtterance(text);
            synthesis.speak(read);
        }
    }

    @action public startListening = (): void => {
        this.recognition.start();
    }

    @action public abortListening = (): void => {
        this.recognition.abort();
        this.isVoiceCommandOn = false;
    }

    private handleVoiceResult = (event: SpeechRecognitionEvent): void => {
        const command = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();

        if (this.hasStarted) {
            if (this.hasPaused && command === 'start') {
                this.resumeTimer();
            }
            if (command === 'stop') {
                this.stopTimer();
            }
            if (this.isPrepTime === false && command === 'pause') {
                this.pauseTimer();
            }
        } else if (command === 'start') {
            this.runTimer();
        }
    }

    @action private handleVoiceStart = (): void => {
        this.isVoiceCommandOn = true;
    }

    @action private handleVoiceError = (): void => {
        this.isVoiceCommandOn = false;
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

    @action private setIsPrepTime = (): void => {
        this.isPrepTime = !this.isPrepTime;
    }

    @action private setIsBreakTime = (): void => {
        this.isBreakTime = !this.isBreakTime;
    }

    @action private setIsWorkoutTime = (): void => {
        this.isWorkoutTime = !this.isWorkoutTime;
    }

    @action private clearIntervals = (): void => {
        clearInterval(this.prepTimeCounterReference);
        clearInterval(this.workoutTimeCounterReference);
        clearInterval(this.breakTimeCounterReference);
        this.prepTimeCounterReference = undefined;
        this.workoutTimeCounterReference = undefined;
        this.breakTimeCounterReference = undefined;
    }

    @action public stopTimer = (): void => {
        this.clearIntervals();
        this.hasStarted = false;
        this.hasResumed = false;
        this.hasPaused = false;
        this.time = this.prepTime;
        this.currentSlide = 1;
        this.exercisesState.currentExercise = 1;
        this.isBreakTime = false;
        this.isWorkoutTime = false;
    }

    @action public runTimer = async (): Promise<void> => {
        this.isWorkoutFinished = false;
        this.hasStarted = true;

        await this.startOfCountdown(this.prepTime);
        this.isPrepTime = false;
        this.isWorkoutTime = true;

        for (let i = 0; i <= this.exercisesState.generatedWorkout.length - 1; i++) {
            if (this.hasStarted && this.hasPaused === false && this.isWorkoutTime) {
                await this.timer(this.workoutTime, i);
            }

            if (this.isWorkoutFinished === false && this.isBreakTime) {
                if (this.hasStarted && this.hasPaused === false) {
                    await this.timer(this.breakTime, i);
                }
            }
        }
    }

    public handleKeyDown = (event: KeyboardEvent): void => {
        switch (event.code) {
            case 'KeyM':
                event.preventDefault();
                this.setIsMuted();
            break;
            case 'KeyR':
                event.preventDefault();
                this.generateWorkout();
            break;
            case 'ArrowLeft':
                event.preventDefault();
                this.previousSlide();
            break;
            case 'ArrowRight':
                event.preventDefault();
                this.nextSlide();
            break;
            case 'Space':
                event.preventDefault();
                if (this.hasStarted) {
                    if (this.isPrepTime) {
                        this.stopTimer();
                    } else {
                        if (this.hasPaused) {
                            this.resumeTimer();
                        } else {
                            this.pauseTimer();
                        }
                    }
                } else {
                    this.runTimer();
                }
            break;
        }
    }

    @action public pauseTimer = (): void => {
        this.hasPaused = true;
        this.hasResumed = false;
        this.clearIntervals();
    }

    @action public resumeTimer = async (): Promise<void> => {
        this.hasResumed = true;
        this.hasPaused = false;

        const currentSlide = this.isWorkoutTime ? this.currentSlide - 1 : this.currentSlide - 2;

        for (let i = currentSlide; i <= this.exercisesState.generatedWorkout.length - 1; i++) {
            if (this.isWorkoutTime) {
                if (this.hasResumed === false) {
                    if (this.hasPaused === false && this.hasStopped === false) {
                        await this.timer(this.workoutTime, i);
                    }
                } else if (this.hasPaused === false && this.hasStopped === false) {
                    await this.timer(this.time, i);
                    this.hasResumed = false;
                }
            }

            if (this.isWorkoutFinished === false && this.isBreakTime) {
                if (this.hasResumed === false) {
                    if (this.hasPaused === false && this.hasStopped === false) {
                        await this.timer(this.breakTime, i);
                    }
                } else if (this.hasPaused === false && this.hasStopped === false) {
                    await this.timer(this.time, i);
                    this.hasResumed = false;
                }
            }
        }
    }

    @action private counterInterval(time: number): Promise<number> {
        const timeDuration = time * 1000;

        return new Promise((resolve) => {
            const timer = setInterval(() => {
                this.setTime(time--);
                this.playSound();
            }, 1000);

            if (this.isPrepTime) {
                this.prepTimeCounterReference = timer;
            } else if (this.isBreakTime) {
                this.breakTimeCounterReference = timer;
            } else {
                this.workoutTimeCounterReference = timer;
            }

            setTimeout(() => { clearInterval(timer); resolve(time) }, timeDuration);
        });
    }

    @action private startOfCountdown(prepTime: number): Promise<number> {
        this.setIsPrepTime();
        const exerciseLabel = this.exercisesState.generatedWorkout[0].label;
        this.readText(exerciseLabel);
        return this.counterInterval(prepTime);
    }

    @action private timer = async (time: number, i?: number) => {
        if (this.hasResumed === false) {
            if (this.isBreakTime) {
                this.nextSlide();

                if (i !== undefined) {
                    const exerciseLabel = this.exercisesState.generatedWorkout[i + 1].label;
                    this.readText(exerciseLabel);
                }
            }
        }

        await this.counterInterval(time);

        if (i === this.exercisesState.generatedWorkout.length - 1) {
            this.setIsWorkoutTime();
            this.isWorkoutFinished = true;
        } else {
            if (this.hasPaused === false) {
                this.setIsBreakTime();
                this.setIsWorkoutTime();
            }
        }
    }

    @action public generateWorkout = (): void => {
        this.stopTimer();
        this.exercisesState.generateWorkout();
    };

    @action private nextSlide = (): void => {
        this.currentSlide = this.currentSlide + 1;
        this.exercisesState.currentExercise = this.currentSlide;
    };

    @action private previousSlide = (): void => {
        this.currentSlide = this.currentSlide - 1;
        this.exercisesState.currentExercise = this.currentSlide;
    };
}
