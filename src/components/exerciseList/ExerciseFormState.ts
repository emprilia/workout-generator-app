import { makeAutoObservable, observable } from 'mobx';
import { action } from 'mobx';
import { InputState } from '../input/InputState';
import { createExercise, updateExercise } from '../../api/exercises';
import { ExerciseType } from './ExercisesState';
import { getImageFromIndexedDB, saveImageToIndexedDB } from '../../localStorage/exercises';

export type ExerciseCreateType = Omit<ExerciseType, 'id' | 'imgUrl'> & { imgUrl: File | null };

export class ExerciseFormState {
    @observable public id: number | null = this.exercise?.id ?? null;
    @observable public label: InputState<string> = new InputState(this.exercise?.label ?? '');
    @observable public imgFile: InputState<File | null> = new InputState(null);
    @observable public isBothSides: boolean = this.exercise?.isBothSides ?? false;
    @observable public isActive: boolean = this.exercise?.isActive ?? true;
    @observable public isFavorite: boolean = this.exercise?.isFavorite ?? false;
    @observable public isClearImgForm: boolean = false;
    @observable public blabla: string = '';

    public constructor(
        private exercise: ExerciseType | null,
        private getExerciseList: () => Promise<void>,
        private closePopup: () => void
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
        await this.saveImage();
        const data = {
            label: this.label.value,
            imgUrl: this.imgFile.value,
            isBothSides: this.isBothSides,
            isActive: this.isActive,
            isFavorite: this.isFavorite
        }
        const dataLocal = {
            label: this.label.value,
            imgUrl: this.blabla,
            isBothSides: this.isBothSides,
            isActive: this.isActive,
            isFavorite: this.isFavorite
        }

        const exercisesLocal = JSON.parse(localStorage.getItem('exercisesLocal') || '[]');
        exercisesLocal.push(dataLocal);
        localStorage.setItem('exercisesLocal', JSON.stringify(exercisesLocal));
        // this.getExerciseList();
        // this.closePopup();

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
        await this.saveImage();
        const data = {
            label: this.label.value,
            imgUrl: this.imgFile.value,
            isBothSides: this.isBothSides,
            isActive: this.isActive,
            isFavorite: this.isFavorite
        }
        if (this.id !== null) {
            const dataLocal = {
                id: this.id,
                label: this.label.value,
                imgUrl: this.blabla,
                isBothSides: this.isBothSides,
                isActive: this.isActive,
                isFavorite: this.isFavorite
            }

            try {
                const exercisesLocal: Array<ExerciseType> = JSON.parse(localStorage.getItem('exercises') || '[]');
                const index = exercisesLocal.findIndex(e => e.id === this.id);
                if (index !== -1) {
                    exercisesLocal[index] = dataLocal;
                    localStorage.setItem('exercises', JSON.stringify(exercisesLocal));
                }
                } catch (error) {
                    console.log('Error processing data', error);
            }

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

    ////////////////////////////////////////////////////////////////////////////////////////////////

    @action handleCreateNewwwwwww = async (): Promise<void> => {
        const data = {
            label: this.label.value,
            imgUrl: this.imgFile.value,
            isBothSides: this.isBothSides,
            isActive: this.isActive,
            isFavorite: this.isFavorite
        }
        try {
            await this.saveImage();
        } catch (error) {
            console.log('Error fetching data')
        }
    }

    @action saveImage = async (): Promise<void> => {
        if (this.imgFile.value) {
            const imageId = 'exerciseImage_' + Date.now(); // Unique ID for the image
            await saveImageToIndexedDB(imageId, this.imgFile.value);
            // localStorage.setItem(this.label.value, imageId); // Store reference with label as key
            // update exercises?
        }
        this.loadImage('test');
    };

    // New method to load an image from IndexedDB using the reference in Local Storage
    loadImage = async (label: string): Promise<string | null> => {
        const imageId = localStorage.getItem(label);
        if (imageId) {
            const imageBlob = await getImageFromIndexedDB(imageId);
            this.blabla = URL.createObjectURL(imageBlob);
            console.log(URL.createObjectURL(imageBlob));
            return URL.createObjectURL(imageBlob); // Convert Blob to URL for display
        }
        return null;
    };
}
