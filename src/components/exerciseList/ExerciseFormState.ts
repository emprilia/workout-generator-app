import { makeAutoObservable, observable } from 'mobx';
import { action } from 'mobx';
import { InputState } from '../input/InputState';
import { createExercise, updateExercise } from '../../api/exercises';
import { ExerciseType } from './ExercisesState';

export type ExerciseCreateType = Omit<ExerciseType, 'id' | 'imgUrl'> & { imgUrl: File | null };

export class ExerciseFormState {
    @observable public id: number | null = this.exercise?.id ?? null;
    @observable public label: InputState<string> = new InputState(this.exercise?.label ?? '');
    @observable public imgFile: InputState<File | null> = new InputState(null);
    @observable public isBothSides: boolean = this.exercise?.isBothSides ?? false;
    @observable public isSelected: boolean = this.exercise?.isSelected ?? true;
    @observable public isFavorite: boolean = this.exercise?.isFavorite ?? false;
    @observable public isClearImgForm: boolean = false;

    public constructor(
        private exercise: ExerciseType | null,
        private getExerciseList: () => Promise<void>,
        private closePopup: () => void
    ) {
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
            this.imgFile.setValue(file);
        }
    }

    @action onClearFormCB = () => {
        this.isClearImgForm = false;
    }

    @action clearForm = () => {
        this.label.setValue('');
        this.imgFile.setValue(null);
        this.isBothSides = false;
        this.isSelected = true;
        this.isFavorite = false;
        this.isClearImgForm = true;
    }

    @action setClosePopup = () => {
        this.clearForm();
        this.closePopup();
    }

    @action handleCreateExercise = async (): Promise<void> => {
        const data = {
            label: this.label.value,
            imgUrl: this.imgFile.value,
            isBothSides: this.isBothSides,
            isSelected: this.isSelected,
            isFavorite: this.isFavorite
        }
        try {
            await createExercise(data);
            this.clearForm();
            this.getExerciseList();
            this.closePopup();
        } catch (error) {
            console.log('Error fetching data')
        }
    }

    @action handleUpdateExercise = async (): Promise<void> => {
        const data = {
            label: this.label.value,
            imgUrl: this.imgFile.value,
            isBothSides: this.isBothSides,
            isSelected: this.isSelected,
            isFavorite: this.isFavorite
        }

        if (this.id !== null) {
            try {
                await updateExercise(this.id, data);
                this.clearForm();
                this.getExerciseList();
                this.closePopup();
            } catch (error) {
                console.log('Error fetching data')
            }
        }
    }
}
