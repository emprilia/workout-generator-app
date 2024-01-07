import React from 'react';
import { observer } from 'mobx-react-lite';
import { ImageUploadState } from './ImgUploadState';
import { ImgIconWrapper, ImgWrapper, UploadButtonWrapper } from './ImgUpload.style';

interface ImgUploadPropsType {
    previewSize: string;
    isClearImgForm: boolean;
    onChangeCB: (file: File | null) => void;
    onClearFormCB: () => void;
}

export const ImgUpload = observer((props: ImgUploadPropsType) => {
    const { previewSize, isClearImgForm, onChangeCB, onClearFormCB } = props;
    const [imageUploadState] = React.useState(() => new ImageUploadState(onChangeCB));

    if (isClearImgForm) {
        imageUploadState.resetImage();
        onClearFormCB();
    }

    return (
        <UploadButtonWrapper previewSize={previewSize}>
            {imageUploadState.imgUrl === '' ? <ImgIconWrapper /> : <ImgWrapper src={imageUploadState.imgUrl} alt="Uploaded exercise image preview" />}
            <input type='file' accept='image/jpeg, image/png, image/gif, image/webp, image/svg+xml' onChange={imageUploadState.onChange} hidden />
        </UploadButtonWrapper>
    );
});
