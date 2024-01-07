import styled from '@emotion/styled';
import { ImgIcon } from '../../assets/icons/ImgIcon';

interface ImgPreviewPropsType {
    previewSize: string;
}

export const UploadButtonWrapper = styled('label')<ImgPreviewPropsType>`
    height: ${({ previewSize }): string => `${previewSize}px`};
    width: ${({ previewSize }): string => `${previewSize}px`};
    cursor: pointer;
    margin: 0 auto;
`;

export const ImgIconWrapper = styled(ImgIcon)`
    height: 100%;
    width: 100%;
    fill: currentcolor;
`;

export const ImgWrapper = styled('img')`
    max-height: 100%;
    max-width: 100%;
`;
