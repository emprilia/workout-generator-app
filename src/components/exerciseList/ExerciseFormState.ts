import { makeAutoObservable, observable, action } from 'mobx';
import { updateExercise, createExercise, ExerciseType } from '../../api/supabaseExercises';
import { InputState } from '../input/InputState';

export type ExerciseCreateType = Omit<ExerciseType, 'id' | 'imgUrl'> & { imgUrl: File | null, userId: string };

export class ExerciseFormState {
    @observable public id: number | null = this.exercise?.id ?? null;
    @observable public label: InputState<string> = new InputState(this.exercise?.label ?? '');
    @observable public imgFile: InputState<File | null> = new InputState(null);
    @observable public isBothSides: boolean = this.exercise?.isBothSides ?? false;
    @observable public isActive: boolean = this.exercise?.isActive ?? true;
    @observable public isFavorite: boolean = this.exercise?.isFavorite ?? false;
    @observable public isClearImgForm: boolean = false;
    @observable public isLoading: boolean = false;

    public constructor(
        private exercise: ExerciseType | null,
        private getExerciseList: () => Promise<void>,
        private closePopup: () => void,
        private readonly userId: string
    ) {
        makeAutoObservable(this);
    }

    @action setActive = () => {
        this.isActive = !this.isActive;
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
        this.isActive = true;
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
            isActive: this.isActive,
            isFavorite: this.isFavorite,
            userId: this.userId
        }

        try {
            this.setIsLoading();

            await createExercise(data);
            this.clearForm();
            this.getExerciseList();
            this.closePopup();
        } catch (error) {
            console.log('Error fetching data')
        } finally {
            this.setIsLoading();
        }
    }

    @action handleUpdateExercise = async (): Promise<void> => {
        const data = {
            label: this.label.value,
            imgUrl: this.imgFile.value,
            isBothSides: this.isBothSides,
            isActive: this.isActive,
            isFavorite: this.isFavorite,
            userId: this.userId
        }

        if (this.id !== null) {
            this.setIsLoading();

            try {
                await updateExercise(this.id, data);
                this.clearForm();
                this.getExerciseList();
                this.closePopup();
            } catch (error) {
                console.log('Error fetching data')
            } finally {
                this.setIsLoading();
            }
        }
    }

    @action private setIsLoading = (): void => {
        this.isLoading = !this.isLoading;
    }
}
