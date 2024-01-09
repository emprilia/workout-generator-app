import { makeAutoObservable, observable, action } from 'mobx';

export class ImageUploadState {
    @observable public imageFile: File | null = null;
    @observable public imgUrl: string = '';

    constructor(
        private onChangeCB: (file: File | null) => void
    ) {
        makeAutoObservable(this);
    }

    @action public setImageFile = (file: File | null) => {
        this.imageFile = file;
        if (file) {
            this.imgUrl = URL.createObjectURL(file);
        } else {
            this.imgUrl = '';
        }
    }

    @action public onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        this.setImageFile(file);
        this.onChangeCB(this.imageFile ?? null);
    };

    @action public resetImage = () => {
        this.imageFile = null;
        this.imgUrl = '';
    }
}
