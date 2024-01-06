import { makeAutoObservable, observable } from 'mobx';
import { action } from 'mobx';
import { AppState } from '../../AppState.state';
import { ExerciseType, ExercisesState } from '../exerciseList/ExercisesState';
import { ImageUploadState } from '../imgUpload/ImgUploadState';
import { InputState } from '../input/InputState';

export class ExerciseFormState {
    @observable public label: InputState<string> = new InputState('');
    @observable public imgUrl: InputState<string> = new InputState('');
    @observable public isBothSides: boolean = false;
    @observable public isSelected: boolean = true;
    @observable public isFavorite: boolean = false;

    public constructor(
        private exercisesState: ExercisesState,
        private imageUploadState: ImageUploadState
    ) {
        makeAutoObservable(this);
    }

    @action handleCreate = async (): Promise<void> => {
        const data = {
            label: this.label,
            imgUrl: this.imgUrl,
            isBothSides: this.isBothSides,
            isSelected: this.isSelected,
            isFavorite: this.isFavorite
        }
        // try {
        //     // temp fixed id since there is no way to add more timers to database
        //     await createExercise(data);
        //     this.exercisesState.refresh
        // } catch (error) {
        //     console.log('Error fetching data')
        // }
    }

    // @action setSelected = () => {
    //     this.exercise.isSelected = !this.exercise.isSelected;
    //     this.appState.exercisesState.tempSelectedExercises = this.appState.exercisesState.exercises.filter((exercise) => exercise.isSelected === true)
    // }

    // @action setFavorite = () => {
    //     this.exercise.isFavorite = !this.exercise.isFavorite;
    // }
}