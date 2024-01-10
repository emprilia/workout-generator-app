import styled from '@emotion/styled';
import { SerializedStyles, css } from '@emotion/react';
import { EditIcon } from '../../assets/icons/EditIcon';
import { StarIcon } from '../../assets/icons/StarIcon';

interface ExercisePropsType {
    isActive: boolean;
    isEditMode: boolean;
    isSelected: boolean;
}

export const ExerciseWrapper = styled('li')<ExercisePropsType>`
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-evenly;
    align-items: center;
    height: 94px;
    width: 94px;
    padding: 8px;
    border-radius: 4px;
    background-color: var(--colorPrimary);
    color: var(--shade2);
    ${({ isSelected }): string => isSelected === false ? '' : `outline: 2px solid var(--warning); outline-offset: -3px;`};
    ${({ isEditMode, isActive }): string => isEditMode || isActive ? '' : 'opacity: .4'};
    transition: opacity .2s ease;
`;

export const ExerciseInfo = styled('div')<ExercisePropsType>`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    gap: 4px;
`;

export const ExerciseImg = styled('img')`
    height: 56px;
    width: 56px;
`;

export const ExerciseLabel = styled('span')`
    font-size: 10px;
    font-weight: 500;
    text-align: center;
    text-transform: uppercase;
    text-shadow: 4px 4px 10px rgba(0, 0, 0, 0.6);
`;

const setIcon = (): SerializedStyles => {
    return css`
        position: absolute;
        top: 0;
        right: 0;
        width: 16px;
        height: 16px;
        fill: currentcolor;
        padding: 4px;
        filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.4));
    `;
};

export const EditIconWrapper = styled(EditIcon)`
    ${(): SerializedStyles => setIcon()};
`;

export const StarIconWrapper = styled(StarIcon)`
    ${(): SerializedStyles => setIcon()};
`;


