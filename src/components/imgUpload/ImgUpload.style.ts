import styled from '@emotion/styled';
import { ImgIcon } from '../../assets/icons/ImgIcon';

interface UploadImageType {
    hasFullWidthPreview?: boolean;
}

export const UploadWrapper = styled('div')<UploadImageType>`
    ${({ hasFullWidthPreview }): string => hasFullWidthPreview !== true ? `
        display: flex;
        flex-flow: row nowrap;
        align-items: flex-end;
    ` : ''};
    margin: 4px 0 16px 0;
`;

export const ImgPlaceholder = styled('div')<UploadImageType>`
    font-family: var(--fontFamilyPrimary);
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 14;
    font-weight: 700;
    background-color: purple;
    ${({hasFullWidthPreview}): string => hasFullWidthPreview === true ? 'width: 100%; margin-bottom: 8px;' : 'width: 140px;'}
    height: 80px;
    border-radius: 8px;
    border: 2px solid green;
`;

export const ImgItem = styled('img')<UploadImageType>`
    ${({hasFullWidthPreview}): string => hasFullWidthPreview === true ? `
        width: auto;
        max-width: 100%;
        height: auto;
    ` : `
        width: 140px;
        height: 80px;
    `}
    object-fit: fill;
    border-radius: 8px;
    border: 2px solid red;
`;

export const UploadButtonsWrapper = styled('div')`
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: flex-end;
`;

export const UploadButtonWrapper = styled('label') <UploadImageType>`
width: 150px;
height: 150px;
background: red;
    ${({ hasFullWidthPreview }): string => hasFullWidthPreview === true ? '' : 'margin-left: 8px'};
    cursor: pointer;
    margin-right: 8px;
    &:hover {
        button {
            opacity: 0.8;
            pointer-events: none;
        }
    }
`;

export const ImgIconWrapper = styled(ImgIcon)`
    height: 40px;
    width: 40px;
    fill: var(--shade2)
`;

// use ::file-selector-button to style this component
export const UploadInput = styled('input')`
    display: none;
`;

export const WarningMessageWrapper = styled('div')`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    background-color: red;
    gap: 16px;
    padding: 16px;
`;
