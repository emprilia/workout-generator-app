import { SerializedStyles, css } from '@emotion/react';
import styled from '@emotion/styled';
import { RefreshIcon } from '../../../assets/icons/RefreshIcon';

interface ExercisePropsType {
    width: number;
}

export const ExerciseContainer = styled('div')<ExercisePropsType>`
    width:  ${({ width }): string => `${width}px`};
    overflow: hidden;
    margin-bottom: 16px;
    border-radius: 8px;

    &::-webkit-scrollbar {
        display: none;
    }
`;

interface ExerciseListPropsType {
    translateX: string | null;
}

export const ExerciseList = styled('ul')<ExerciseListPropsType>`
    display: flex;
    flex-flow: row nowrap;
    ${({ translateX }): string => translateX !== null ? `transform: translateX(${translateX})` : ''};
    transition: transform 0.5s ease-in-out;
    padding: 0;
    margin: 0;
`;

export const Exercise = styled('li')<ExercisePropsType>`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    background-color: var(--colorPrimary);
    flex: 0 0 100%;
    // *** width and left/right padding have to sum up to width ***
    max-width: ${({ width }): string => `calc(${width}px - 64px)`};
    padding: 32px;
`;

export const ExerciseImg = styled('img')`
    height: 240px;
`;

export const ExerciseHeader = styled('div')`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-flow: row nowrap;
    width: 100%;
    height: 24px;
`;

export const ExerciseLabel = styled('span')`
    font-size: 20px;
    font-weight: 700;
    text-transform: uppercase;
    text-shadow: 4px 4px 10px rgba(0, 0, 0, 0.6);
`;

const setIcon = (): SerializedStyles => {
    return css`
        flex: 0 0 20px;
        width: 20px;
        height: 20px;
        fill: var(--white);
        filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.6));
    `;
};

export const RefreshIconWrapper = styled(RefreshIcon)`
    ${(): SerializedStyles => setIcon()};
    margin-left: 8px;
`;
