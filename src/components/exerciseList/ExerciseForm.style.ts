import styled from '@emotion/styled';
import { Header } from '../common/common.style';

export const OverlayWrapper = styled('div')`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: var(--opacityBlack68);
    z-index: 2;
`;

export const ExerciseFormWrapper = styled('div')`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    gap: 16px;
    width: 240px;
    padding: 24px;
    background-color: var(--colorSecondary);
    z-index: 2;
`;

export const ExerciseFormHeader = styled(Header)`
    font-size: 20px;
`;

export const ExerciseInputWrapper = styled('div')`
    width: 100%;
    background: var(--colorPrimary);
    color: var(--shade2);
    border-radius: 8px;
`;

export const ExerciseFormFieldsWrapper = styled('div')`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin: 8px 0;
    color: var(--shade2);
`;
