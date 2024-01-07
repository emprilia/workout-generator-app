import { makeAutoObservable, action, computed, observable } from 'mobx';
import { exercises } from '../../assets/mockData/exercises';

export interface ExerciseType {
    id: number;
    label: string;
    imgUrl: string;
    isBothSides: boolean;
    isSelected: boolean;
    isFavorite: boolean
}

export class ExercisesState {
    @observable public exercises: Array<ExerciseType> = exercises;
    @observable public tempSelectedExercises: Array<ExerciseType> = exercises.filter(exercise => exercise.isSelected === true);
    @observable public selectedExercises: Array<ExerciseType> = exercises.filter(exercise => exercise.isSelected === true);
    @observable public tempFavoriteExercises: Array<ExerciseType> = exercises.filter(exercise => exercise.isFavorite === true);
    @observable public favoriteExercises: Array<ExerciseType> = exercises.filter(exercise => exercise.isFavorite === true);
    @observable public currentExercise: number = 1;
    @observable public minRounds: number = 12;
    @observable public maxRounds: number = this.selectedExercises.length;
    @observable public generatedWorkout: Array<ExerciseType> = this.initialExerciseSuggestions;
    @observable public isAddNewView: boolean = false;

    public constructor(
        private readonly setSelectedExercisesCount: (value: number) => void
    ) {
        makeAutoObservable(this);
    }

    @action setMinMaxRoundsLimits = (minRounds: number, maxRounds: number) => {
        if (maxRounds <= this.selectedExercises.length) {
            this.maxRounds = maxRounds;
        }
        this.minRounds = minRounds;
    }

    @action setSelectCheckbox = (type: 'all' | 'none') => {
        if (type === 'all') {
            this.selectedExercises = this.exercises;
            this.tempSelectedExercises = this.exercises;
            this.exercises.forEach((exercise) => exercise.isSelected = true)
        } else {
            this.selectedExercises = [];
            this.tempSelectedExercises = [];
            this.exercises.forEach((exercise) => exercise.isSelected = false)
        }
    }

    @action saveExercises = () => {
        this.selectedExercises = this.exercises.filter((exercise) => exercise.isSelected === true);
        this.favoriteExercises = this.exercises.filter((exercise) => exercise.isFavorite === true);
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
            const singleSide = exercisesSet.find(e => e.isBothSides === false);
            if (singleSide === undefined) {
                // TODO if no single side exercise - get as close as possible to min/max exercises
                return exercisesSet;
            }
            // if single side exercise exists - remove it
            const exerciseIndex = exercisesSet.indexOf(singleSide);
            exercisesSet.splice(exerciseIndex, 1);

            return exercisesSet;
            // ??? for
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