import { makeAutoObservable, action, computed, observable } from 'mobx';
import { exercises } from '../../assets/mockData/exercises';
import { getAllExercises } from '../../api/exercises';

export interface ExerciseType {
    id: number;
    label: string;
    imgUrl: string;
    isBothSides: boolean;
    isSelected: boolean;
    isFavorite: boolean
}

export class ExercisesState {
    @observable public exercises: Array<ExerciseType> | null = [];
    @observable public tempSelectedExercises: Array<ExerciseType> = [];
    @observable public selectedExercises: Array<ExerciseType> = [];
    @observable public tempFavoriteExercises: Array<ExerciseType> = [];
    @observable public favoriteExercises: Array<ExerciseType> = [];
    @observable public currentExercise: number = 1;
    @observable public minRounds: number = 1;
    @observable public maxRounds: number = 1;
    @observable public generatedWorkout: Array<ExerciseType> = [];
    @observable public isAddNewView: boolean = false;

    public constructor(
        private readonly setSelectedExercisesCount: (value: number) => void
    ) {
        makeAutoObservable(this);
        this.initializeExerciseList();
    }

    @action private async initializeExerciseList(): Promise<void> {
        try {
            const data = await getAllExercises();
            this.setExercises(data);
            this.generateWorkout();
        } catch (error) {
            console.error('Error fetching timer settings', error);
        }
    }

    @action private setExercises = (data: Array<ExerciseType>) => {
        this.exercises = [...exercises, ...data];
        this.selectedExercises = this.allExercises.filter(exercise => exercise.isSelected === true);
        this.favoriteExercises = this.allExercises.filter(exercise => exercise.isFavorite === true);
        this.maxRounds = this.selectedExercises.length;
    }

    @computed public get allExercises(): Array<ExerciseType> {
        return this.exercises === null ? [] : this.exercises;
    }

    @action setMinMaxRoundsLimits = (minRounds: number, maxRounds: number) => {
        if (maxRounds <= this.selectedExercises.length) {
            this.maxRounds = maxRounds;
        }
        this.minRounds = minRounds;
    }

    @action setSelectCheckbox = (type: 'all' | 'none') => {
        if (type === 'all') {
            this.selectedExercises = this.allExercises;
            this.tempSelectedExercises = this.allExercises;
            this.allExercises.forEach((exercise) => exercise.isSelected = true)
        } else {
            this.selectedExercises = [];
            this.tempSelectedExercises = [];
            this.allExercises.forEach((exercise) => exercise.isSelected = false)
        }
    }

    @action saveExercises = () => {
        this.selectedExercises = this.allExercises.filter((exercise) => exercise.isSelected === true);
        this.favoriteExercises = this.allExercises.filter((exercise) => exercise.isFavorite === true);
        this.setSelectedExercisesCount(this.selectedExercises.length);
    }

    @computed public get exercisesCount(): number {
        return Math.floor(Math.random() * (this.maxRounds - this.minRounds) + this.minRounds);
    }

    @computed private get exercisesShuffled(): Array<ExerciseType> {
        return [...this.selectedExercises].sort(() => 0.5 - Math.random());
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
}