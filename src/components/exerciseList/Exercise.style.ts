import styled from '@emotion/styled';
import { StarIcon } from '../../assets/icons/StarIcon';

interface ExercisePropsType {
    isSelected: boolean;
}

export const ExerciseWrapper = styled('li')<ExercisePropsType>`
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-evenly;
    align-items: center;
    height: 84px;
    width: 84px;
    padding: 8px;
    border-radius: 4px;
    background-color: var(--colorPrimary);
    ${({ isSelected }): string => isSelected ? '' : 'opacity: .4'};
    transition: opacity .2s ease;
`;

export const ExerciseInfo = styled('div')`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
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

interface StarIconPropsType {
    isFilled: boolean;
}

export const StarIconWrapper = styled(StarIcon)<StarIconPropsType>`
    position: absolute;
    top: 0;
    right: 0;
    width: 12px;
    height: 12px;
    fill: var(--shade2);
    padding: 4px;
    filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.4));
`;
