import styled from '@emotion/styled';
import { ChevronIcon } from '../../../assets/icons/ChevronIcon';
import { ImgIcon } from '../../../assets/icons/ImgIcon';

export const ExerciseThumbnailsWrapper = styled('div')`
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
`;

export const ExerciseThumbnailsContainer = styled('div')`
    overflow: auto hidden;
    border: 4px solid rgba(0, 69, 106, 0.7);
    border-radius: 8px;
    width: 280px;

    /* &::-webkit-scrollbar {
        display: none;
    } */ // TODO s
`;

interface ExerciseThumbnailsListPropsType {
    translateX: string | null;
}

export const ExerciseThumbnailsList = styled('ul')<ExerciseThumbnailsListPropsType>`
    display: flex;
    flex-flow: row nowrap;
    ${({ translateX }): string => translateX !== null ? `transform: translateX(${translateX})` : ''};
    transition: transform 0.5s ease-in-out;
    margin: 0;
    padding: 0;
    list-style: none;
    /* width: 280px; */
`;

interface ExerciseThumbnailPropsType {
    isActive: boolean;
}

export const ExerciseThumbnail = styled('li')<ExerciseThumbnailPropsType>`
    align-items: center;
    justify-content: center;
    background-color: ${({ isActive }): string => isActive ? 'var(--colorPrimary)' :  'var(--opacityPrimary)'};
    scroll-snap-stop: always;
    scroll-snap-align: start;
    height: 56px;
    width: 56px;
    transition: opacity .5s ease;
    opacity: ${({ isActive }): string => isActive ? '1' :  '0.4'};
    position: relative;
`;

export const ExerciseThumbnailImg = styled('img')`
    width: 40px;
    height: 40px;
    padding: 8px;
`

export const ExerciseNumber = styled('span')`
    font-size: 16px;
    font-weight: 700;
    position: absolute;
    left: 4px;
    text-shadow: 5px 2px 5px rgba(0, 0, 0, 0.6);
`;

interface ArrowPropsType {
    isDisabled: boolean;
}

export const ArrowButtonWrapper = styled('div')<ArrowPropsType>`
    height: 64px;
    width: 20px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    background-color: ${({ isDisabled }): string => isDisabled ? 'var(--shade1)' : 'var(--colorPrimary)'};
    ${({ isDisabled }): string => isDisabled ? 'opacity: .4' : ''};
    ${({ isDisabled }): string => isDisabled ? 'pointer-events: none' : ''};

    &:first-of-type {
        margin-right: 4px;
    }

    &:last-of-type {
        margin: 0 0 0 4px;
    }
`;

export const ArrowWrapper = styled(ChevronIcon)<ArrowPropsType>`
    width: 16px;
    height: 16px;
    fill: ${({ isDisabled }): string => isDisabled ? 'var(--opacityPrimary)' : 'var(--white)'};
`;

export const ImgPlaceholder = styled(ImgIcon)`
    width: 40px;
    height: 40px;
    padding: 8px;
    fill: currentcolor;
`;
