import { makeAutoObservable, observable, action } from 'mobx';
import { updateExercise, createExercise, ExerciseType } from '../../api/supabaseExercises';
import { InputState } from '../input/InputState';

export type ExerciseCreateType = Omit<ExerciseType, 'id' | 'imgUrl'> & { imgUrl: File | null, userId: string };

export class ExerciseFormState {
    @observable public id: number | null = this.exercise?.id ?? null;
    @observable public label: InputState = new InputState(this.exercise?.label ?? '');
    @observable public imgFile: File | null = null;
    @observable public isBothSides: boolean = this.exercise?.isBothSides ?? false;
    @observable public isActive: boolean = this.exercise?.isActive ?? true;
    @observable public isFavorite: boolean = this.exercise?.isFavorite ?? false;
    @observable public isClearImgForm: boolean = false;
    @observable public formError: string | null = null;
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
    };

    @action setFavorite = () => {
        this.isFavorite = !this.isFavorite;
    };

    @action setBothSides = () => {
        this.isBothSides = !this.isBothSides;
    };

    @action onImgChangeCB = (file: File | null) => {
        const formData = new FormData();

        if (file !== null) {
            formData.append('file', file);
            this.imgFile = file;
        }
    };

    @action onClearFormCB = () => {
        this.isClearImgForm = false;
    };

    @action clearForm = () => {
        this.label.setValue('');
        this.imgFile = null;
        this.isBothSides = false;
        this.isActive = true;
        this.isFavorite = false;
        this.isClearImgForm = true;
    };

    @action setClosePopup = () => {
        this.clearForm();
        this.closePopup();
        this.setError(null);
    };

    @action handleCreateExercise = async (): Promise<void> => {
        const data = {
            label: this.label.value,
            imgUrl: this.imgFile,
            isBothSides: this.isBothSides,
            isActive: this.isActive,
            isFavorite: this.isFavorite,
            userId: this.userId
        };

        try {
            this.setIsLoading();
            const error = await createExercise(data);

            if (error) {
                this.setError(error.message);
                console.log(error.message);
            } else {
                this.getExerciseList();
                this.setClosePopup();
            }
        } catch (error) {
            console.log('Error creating exercise');
            this.setError('Something went wrong');
        } finally {
            this.setIsLoading();
        }
    };

    @action handleUpdateExercise = async (): Promise<void> => {
        const data = {
            label: this.label.value,
            imgUrl: this.imgFile,
            isBothSides: this.isBothSides,
            isActive: this.isActive,
            isFavorite: this.isFavorite,
            userId: this.userId
        };

        if (this.id !== null) {
            this.setIsLoading();

            try {
                const error = await updateExercise(this.id, data);
                if (error) {
                    this.setError(error.message);
                } else {
                    this.getExerciseList();
                    this.setClosePopup();
                }
            } catch (error) {
                console.log('Error updating exercise');
                this.setError('Something went wrong');
            } finally {
                this.setIsLoading();
            }
        }
    };

    @action private setIsLoading = (): void => {
        this.isLoading = !this.isLoading;
    };

    @action private setError = (error: string | null): void => {
        this.formError = error;
    };
}
