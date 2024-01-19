import { makeAutoObservable, observable, action} from 'mobx';
import { ExercisesState } from '../exerciseList/ExercisesState';
import { TimerSettingsState, WorkoutGeneratorPropsType } from '../timerSettings/TimerSettingsState';
import { getUserExercises, getInitialExercises, createInitialExercise, ExerciseType } from '../../api/supabaseExercises';
import { createTimerSettings, getInitialTimerSettings, getTimerSettings } from '../../api/supabaseTimerSettings';

export class WorkoutGeneratorState {
    @observable public exercisesState: ExercisesState;
    @observable public timerSettingsState: TimerSettingsState;

    public constructor(
        private readonly userId: string,
        private readonly isSignedUp: boolean
    ) {
        makeAutoObservable(this);
        this.getExercisesList();
        this.getTimerSettings();
        this.exercisesState = new ExercisesState(this.getUserExerciseList);
        this.timerSettingsState = new TimerSettingsState(this.exercisesState.activeExercises.length, this.getUserTimerSettings);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////

    @action public getExercisesList = async (): Promise<void> => {
        if (this.isSignedUp) {
            await this.getInitialExerciseList();
        } else {
            await this.getUserExerciseList();
        }
    };

    getInitialExerciseList = async (): Promise<void> => {
        try {
            const data = await getInitialExercises();
            if (data !== null) {
                await this.handleCreateInitialExercises(data);
                await this.getUserExerciseList();
            }
        } catch (error) {
            console.log('Error fetching data')
        }
    };

    handleCreateInitialExercises = async (data: Array<ExerciseType>): Promise<void> => {
        for (const exercise of data) {
            const exeData = {
                ...exercise,
                userId: this.userId
            }
            try {
                await createInitialExercise(exeData);
            } catch (error) {
                console.log('Error fetching data')
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
            console.log('Error fetching data')
        }
    };

    @action public getTimerSettings = async (): Promise<void> => {
        if (this.isSignedUp) {
            await this.getInitialTimerSettings();
        } else {
            await this.getUserTimerSettings();
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
            console.log('Error fetching data')
        }
    };

    getUserTimerSettings = async (): Promise<void> => {
        try {
            const data = await getTimerSettings();
            if (data !== null) {
                this.timerSettingsState.setTimerSettings(data);
                this.exercisesState.setMinMaxRoundsLimits(this.timerSettingsState.minRounds.value, this.timerSettingsState.maxRounds.value);
            }
        } catch (error) {
            console.log('Error fetching data')
        }
    };

    handleCreateInitialTimerSettings = async (data: Array<WorkoutGeneratorPropsType>): Promise<void> => {
        for (const exercise of data) {
            const exeData = {
                ...exercise,
                user_id: this.userId
            }
            try {
                await createTimerSettings(exeData);
            } catch (error) {
                console.log('Error fetching data')
            }
        }
    }
}
