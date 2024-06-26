import { makeAutoObservable, observable, action } from 'mobx';
import { ExercisesState } from '../exerciseList/ExercisesState';
import { TimerSettingsState } from '../timerSettings/TimerSettingsState';
import { ExerciseType, getInitialExercises, getUserExercises, createInitialExercise } from '../../api/supabaseExercises';
import { TimerSettingType, getInitialTimerSettings, getTimerSettings, getCurrentTimerSettings, createInitialTimerSettings } from '../../api/supabaseTimerSettings';

export class WorkoutGeneratorState {
    @observable public exercisesState: ExercisesState;
    @observable public timerSettingsState: TimerSettingsState;
    @observable public initialExercisesCount: number;
    @observable public createdExercisesCount: number;

    public constructor(
        private readonly userId: string,
        private readonly isSignedUp: boolean
    ) {
        makeAutoObservable(this);
        this.getWorkoutGeneratorData();
        this.exercisesState = new ExercisesState(this.userId, this.getUserExerciseList);
        this.timerSettingsState = new TimerSettingsState(this.getUserTimerSettings);
        this.initialExercisesCount = 0;
        this.createdExercisesCount = 0;
    }

    @action public getWorkoutGeneratorData = async (): Promise<void> => {
        if (this.isSignedUp) {
            await this.getInitialExerciseList();
            await this.getInitialTimerSettings();
        } else {
            await this.getUserExerciseList();
            await this.getUserTimerSettings();
        }
    }

    @action private updateCreatedExercisesCount = () => {
        this.createdExercisesCount++;
    }

    @action private setInitialExercisesCount = (value: number) => {
        this.initialExercisesCount = value;
    }

    getInitialExerciseList = async (): Promise<void> => {
        try {
            const data = await getInitialExercises();
            if (data !== null) {
                this.setInitialExercisesCount(data.length);
                await this.handleCreateInitialExercises(data);
                await this.getUserExerciseList();
            }
        } catch (error) {
            console.log('Error fetching initial exercises')
        }
    };

    handleCreateInitialExercises = async (data: Array<ExerciseType>): Promise<void> => {
        for (const exercise of data) {
            const exeData = {
                ...exercise,
                userId: this.userId
            }
            try {
                this.updateCreatedExercisesCount();
                await createInitialExercise(exeData);
            } catch (error) {
                console.log('Error creating initial exercises')
            }
        }
    }

    getUserExerciseList = async (): Promise<void> => {
        try {
            const data = await getUserExercises();
            if (data !== null) {
                this.exercisesState.setExercises(data);
                this.timerSettingsState.setActiveExercisesCount(data.filter(x => x.isActive).length);
            }
        } catch (error) {
            console.log('Error fetching user exercises')
        }
    };

    getInitialTimerSettings = async (): Promise<void> => {
        try {
            const data = await getInitialTimerSettings();
            if (data !== null) {
                await this.handleCreateInitialTimerSettings(data);
                await this.getUserTimerSettings();
            }
        } catch (error) {
            console.log('Error fetching initial timer settings')
        }
    };

    getUserTimerSettings = async (): Promise<void> => {
        try {
            const data = await getTimerSettings();
            const currentData = await getCurrentTimerSettings();
            if (data !== null && currentData !== null) {
                this.timerSettingsState.setTimerSettings(data);
                this.timerSettingsState.setCurrentSettings(currentData);
                this.exercisesState.setMinMaxRoundsLimits(currentData.minRounds, currentData.maxRounds);
            }
        } catch (error) {
            console.log('Error fetching user timer settings')
        }
    };

    handleCreateInitialTimerSettings = async (data: Array<TimerSettingType>): Promise<void> => {
        for (const setting of data) {
            const settingData = {
                ...setting,
                isActive: true,
                user_id: this.userId
            }
            try {
                await createInitialTimerSettings(settingData);
            } catch (error) {
                console.log('Error creating initial timer settings')
            }
        }
    }
}
