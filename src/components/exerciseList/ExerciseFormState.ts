import { makeAutoObservable, observable } from 'mobx';
import { action } from 'mobx';
import { InputState } from '../input/InputState';
import { createExercise } from '../../api/exercises';
import { ExerciseType } from './ExercisesState';

type ExerciseFormType = Omit<ExerciseType, 'id' | 'imgUrl'> & { imgUrl: File | null };

export type ExerciseCreateType = Omit<ExerciseFormType, 'id'>;

export class ExerciseFormState {
    @observable public label: InputState<string> = new InputState('');
    @observable public imgUrl: InputState<File | null> = new InputState(null);
    @observable public isBothSides: boolean = false;
    @observable public isSelected: boolean = true;
    @observable public isFavorite: boolean = false;
    @observable public isClearImgForm: boolean = false;

    public constructor() {
        makeAutoObservable(this);
    }

    @action setSelected = () => {
        this.isSelected = !this.isSelected;
    }

    @action setFavorite = () => {
        this.isFavorite = !this.isFavorite;
    }

    @action setBothSides = () => {
        this.isBothSides = !this.isBothSides;
    }

    @action onImgChangeCB = (file: File | null) => {
        const formData = new FormData();

        if (file !== null) {
            formData.append('file', file);
            this.imgUrl.setValue(file);
        }
    }

    @action onClearFormCB = () => {
        this.isClearImgForm = false;
    }

    @action clearForm = () => {
        this.label.setValue('');
        this.imgUrl.setValue(null);
        this.isBothSides = false;
        this.isSelected = true;
        this.isFavorite = false;
        this.isClearImgForm = true;
    }

    @action handleCreateExercise = async (): Promise<void> => {
        const data = {
            label: this.label.value,
            imgUrl: this.imgUrl.value,
            isBothSides: this.isBothSides,
            isSelected: this.isSelected,
            isFavorite: this.isFavorite
        }
        try {
            await createExercise(data);
            this.clearForm();
        } catch (error) {
            console.log('Error fetching data')
        }
    }
}
