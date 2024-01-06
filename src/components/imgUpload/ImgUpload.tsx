import React from 'react';
import { observer } from 'mobx-react-lite';
import { ImageUploadState } from './ImgUploadState';
import { ImgIconWrapper, UploadButtonWrapper } from './ImgUpload.style';

export const ImgUpload = observer(() => {
    const [imageUploadState] = React.useState(() => new ImageUploadState());

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        imageUploadState.setImageFile(file);
    };

    return (
        <>
            <UploadButtonWrapper>
                {imageUploadState.imgUrl === null ? <ImgIconWrapper /> : <>
                    <div>
                        <img src={imageUploadState.imgUrl} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />
                    </div>
                </>}
                <input type='file' accept='image/jpeg, image/png, image/gif, image/webp, image/svg+xml' onChange={handleFileChange} hidden />
            </UploadButtonWrapper>
            <button type="submit" disabled={imageUploadState.isUploading} onClick={imageUploadState.onSave}>
                    Upload
            </button>
        </>
  );
});