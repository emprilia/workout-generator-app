import { makeAutoObservable, action, computed, observable } from 'mobx';
import { quickUpdate, deleteExercise, ExerciseType } from '../../api/supabaseExercises';
import { TabType } from '../filters/FiltersState';

export class ExercisesState {
    @observable private exercises: Array<ExerciseType> | null = null;
    public originalExercises: Array<ExerciseType> = [];
    @observable public showingExercises: Array<ExerciseType> = [];
    @observable public selectedExercises: Array<number> = [];
    @observable public changedExercises: Array<ExerciseType> = [];
    @observable public currentExercise: number = 1; // TODO
    @observable public minRounds: number = 1;
    @observable public maxRounds: number = 1;
    @observable public generatedWorkout: Array<ExerciseType> = [];
    @observable public isAddNewView: boolean = false;
    @observable public isEditMode: boolean = false;
    @observable public isLoading: boolean = false;

    public constructor(
        private readonly userId: string,
        private readonly getExerciseList: () => Promise<void>,
    ) {
        makeAutoObservable(this);
    }

    @action public setExercises = (data: Array<ExerciseType>) => {
        // TODO: set sorting method
        this.exercises = data;
        this.originalExercises = this.allExercises;
        this.showingExercises = this.allExercises;
        this.maxRounds = this.activeExercises.length;
        this.generateWorkout();
    }

    @action setMinMaxRoundsLimits = (minRounds: number, maxRounds: number) => {
        if (minRounds !== this.minRounds || maxRounds !== this.maxRounds) {
            if (maxRounds <= this.activeExercises.length) {
                this.maxRounds = maxRounds;
            }
            this.minRounds = minRounds;
            this.generateWorkout();
        }
    }

    @computed public get allExercises(): Array<ExerciseType> {
        return this.exercises === null ? [] : this.exercises;
    }

    @computed public get activeExercises(): Array<ExerciseType> {
        return this.showingExercises.filter(exercise => exercise.isActive === true);
    }

    @computed public get exercisesCount(): number {
        return Math.floor(Math.random() * (this.maxRounds - this.minRounds) + this.minRounds);
    }

    @computed private get exercisesShuffled(): Array<ExerciseType> {
        return [...this.activeExercises].sort(() => 0.5 - Math.random());
    }

    @computed private get exercisesSliced(): Array<ExerciseType> {
        return this.exercisesShuffled.slice(0, this.exercisesCount);
    }

    @computed public get initialExerciseSuggestions(): Array<ExerciseType> {
        // if exercise is to be done on both sides, create it for other side
        const exercisesSet = this.exercisesSliced.flatMap((exercise) => {
            if (exercise.isBothSides === true) {
                return [
                    {
                        ...exercise,
                        label: `${exercise.label} (RIGHT)`,
                    },
                    {
                        ...exercise,
                        label: `${exercise.label} (LEFT)`,
                        bothSides: false,
                    }
                ]
            }
            return exercise;
        });

        if (exercisesSet.length > this.maxRounds) {
            const diff = exercisesSet.length - this.maxRounds;

            for (let i = 0; i < diff; i++) {
                const singleSide = exercisesSet.find(e => e.isBothSides === false);
                if (singleSide === undefined) {
                    // TODO if no single side exercise - get as close as possible to min/max exercises
                    return exercisesSet;
                }
                // if single side exercise exists - remove it
                const exerciseIndex = exercisesSet.indexOf(singleSide);
                exercisesSet.splice(exerciseIndex, 1);
            }
            return exercisesSet;
        }
        return exercisesSet;
    }

    @action generateWorkout = (): void => {
        this.generatedWorkout = this.initialExerciseSuggestions;
        // TODO: fix generating empty array
    }

    @action setAddNew = (): void => {
        this.isAddNewView = !this.isAddNewView;
    }

    @action setEditMode = (): void => {
        this.isEditMode = !this.isEditMode;
        this.selectedExercises = [];
    }

    @action setSelectCheckbox = (type: 'all' | 'none') => {
        if (type === 'all') {
            if (this.isEditMode) {
                for (const exercise of this.showingExercises) {
                    if (this.selectedExercises.includes(exercise.id) === false) {
                        this.selectedExercises.push(exercise.id);
                    }
                }
            } else {
                this.showingExercises.forEach((exercise) => exercise.isActive = true)
                for (const exercise of this.showingExercises) {
                    this.setChanged(exercise);
                }
            }
        } else {
            if (this.isEditMode) {
                this.selectedExercises = [];
            } else {
                this.showingExercises.forEach((exercise) => exercise.isActive = false)
                for (const exercise of this.showingExercises) {
                    this.setChanged(exercise);
                }
            }
        }
    }

    @action setSelectedExercises = (id: number): void => {
        this.selectedExercises.push(id);
    }

    @action updateShowing = (showing: Array<ExerciseType>, type?: TabType) => {
        this.showingExercises = showing;

        if (type === 'filter') {
            this.selectedExercises = [];
        }
    }

    @action setChanged = (exercise: ExerciseType) => {
        const showingIndex = this.showingExercises.findIndex(e => e.id === exercise.id);
        this.showingExercises[showingIndex] = exercise;

        const originalExercise = this.changedExercises.find(e => e.id === exercise.id);

        const isExerciseEqual = (exercise1: ExerciseType, exercise2: ExerciseType) => {
            return exercise1.isActive === exercise2.isActive && exercise1.isFavorite === exercise2.isFavorite;
        };

        if (originalExercise) {
            const changedIndex = this.changedExercises.findIndex(e => e.id === exercise.id);

            if (changedIndex !== -1) {
                if (isExerciseEqual(exercise, originalExercise)) {
                    this.changedExercises.splice(changedIndex, 1);
                } else {
                    this.changedExercises[changedIndex] = exercise;
                }
            }
        } else {
            this.changedExercises.push(exercise);
        }
    };

    @action handleQuickUpdate = async (): Promise<void> => {
        this.isLoading = true;
        for (const exercise of this.changedExercises) {
            if (exercise !== undefined) {
                const data = {
                    isActive: exercise.isActive,
                    isFavorite: exercise.isFavorite
                }
                try {
                    await quickUpdate(exercise.id, data);
                } catch (error) {
                    console.log('Error fetching data')
                }
            }
        }
        await this.getExerciseList();
        this.handleChangeDelete();
    }

    @action handleDeleteExercises = async (exercises: Array<number>): Promise<void> => {
        this.isLoading = true;
        for (const id of exercises) {
            try {
                await deleteExercise(id, this.userId);
            } catch (error) {
                console.log('Error fetching data')
            }
        }
        await this.getExerciseList();
        this.handleChangeDelete();
    }

    @action private handleChangeDelete = (): void => {
        this.changedExercises = [];
        this.selectedExercises = [];
        this.isLoading = false;
    }
}
