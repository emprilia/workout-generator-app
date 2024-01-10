import { makeAutoObservable, action, computed, observable } from 'mobx';
import { getAllExercises, quickUpdate, deleteExercise } from '../../api/exercises';

export interface ExerciseType {
    id: number;
    label: string;
    imgUrl: string;
    isBothSides: boolean;
    isActive: boolean;
    isFavorite: boolean
}

export class ExercisesState {
    @observable private exercises: Array<ExerciseType> | null = [];
    public originalExercises: Array<ExerciseType> = [];
    @observable public changedExercises: Array<ExerciseType> = [];
    @observable public selectedExercises: Array<number> = [];
    @observable public tempActiveExercises: Array<ExerciseType> = [];
    @observable public activeExercises: Array<ExerciseType> = [];
    @observable public tempFavoriteExercises: Array<ExerciseType> = [];
    @observable public favoriteExercises: Array<ExerciseType> = [];
    @observable public currentExercise: number = 1;
    @observable public minRounds: number = 1;
    @observable public maxRounds: number = 1;
    @observable public generatedWorkout: Array<ExerciseType> = [];
    @observable public isAddNewView: boolean = false;
    @observable public isEditMode: boolean = false;

    public constructor(
        private readonly setActiveExercisesCount: (value: number) => void
    ) {
        makeAutoObservable(this);
        this.initializeExerciseList();
    }

    @action private async initializeExerciseList(): Promise<void> {
        await this.getExerciseList();
        this.generateWorkout();
    }

    @action public getExerciseList = async (): Promise<void> => {
        try {
            const data = await getAllExercises();
            this.exercises = data;
            this.setExercises(data);
        } catch (error) {
            console.error('Error fetching exercise list', error);
        }
    };

    @action private setExercises = (data: Array<ExerciseType>) => {
        this.originalExercises = data;
        this.activeExercises = this.allExercises.filter(exercise => exercise.isActive === true);
        this.tempActiveExercises = this.activeExercises;
        this.favoriteExercises = this.allExercises.filter(exercise => exercise.isFavorite === true);
        this.tempFavoriteExercises = this.favoriteExercises;
        this.maxRounds = this.activeExercises.length;
        this.setActiveExercisesCount(this.activeExercises.length);
    }

    @computed public get allExercises(): Array<ExerciseType> {
        return this.exercises === null ? [] : this.exercises;
    }

    @computed public get allExercisesSorted(): Array<ExerciseType> {
        return this.allExercises.slice().sort((a, b) => b.id - a.id);;
    }

    @action setMinMaxRoundsLimits = (minRounds: number, maxRounds: number) => {
        if (maxRounds <= this.activeExercises.length) {
            this.maxRounds = maxRounds;
        }
        this.minRounds = minRounds;
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
                this.allExercises.map((exercise) => this.selectedExercises.push(exercise.id));
            } else {
                this.allExercises.forEach((exercise) => exercise.isActive = true)
                this.tempActiveExercises = this.allExercises;
                for (const exercise of this.allExercises) {
                    this.setChanged(exercise);
                }
            }
        } else {
            if (this.isEditMode) {
                this.selectedExercises = [];
            } else {
                this.allExercises.forEach((exercise) => exercise.isActive = false)
                this.tempActiveExercises = [];
                for (const exercise of this.allExercises) {
                    this.setChanged(exercise);
                }
            }
        }
    }

    @action setSelectedExercises = (id: number): void => {
        this.selectedExercises.push(id);
    }

    @action setChanged = (exercise: ExerciseType) => {
        const originalExercise = this.originalExercises.find(e => e.id === exercise.id);

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
            } else if (isExerciseEqual(exercise, originalExercise) === false) {
                this.changedExercises.push(exercise);
            }
        }
    };

    @action saveExercises = () => {
        this.handleQuickUpdate();
        this.changedExercises = [];
    }

    @action handleQuickUpdate = async (): Promise<void> => {
        for (const exercise of this.changedExercises) {
            if (exercise !== undefined) {
                const data = {
                    isActive: exercise.isActive,
                    isFavorite: exercise.isFavorite
                }
                try {
                    await quickUpdate(exercise.id, data);
                    this.updateExerciseList();
                } catch (error) {
                    console.log('Error fetching data')
                }
            }
        }
    }

    @action public updateExerciseList = async (): Promise<void> => {
        try {
            const data = await getAllExercises();
            this.setExercises(data);
        } catch (error) {
            console.error('Error fetching exercise list', error);
        }
    };

    @action handleDeleteExercises = async (exercises: Array<number>): Promise<void> => {
        for (const id of exercises) {
            try {
                await deleteExercise(id);
                this.getExerciseList();
            } catch (error) {
                console.log('Error fetching data')
            }
        }
    }
}
