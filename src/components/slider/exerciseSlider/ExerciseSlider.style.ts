import { SerializedStyles, css } from '@emotion/react';
import styled from '@emotion/styled';
import { PlayIcon } from '../../../assets/icons/PlayIcon';
import { SquareIcon } from '../../../assets/icons/SquareIcon';
import { RefreshIcon } from '../../../assets/icons/RefreshIcon';
import { SpeakerIcon } from '../../../assets/icons/SpeakerIcon';
import { SpeakerMuteIcon } from '../../../assets/icons/SpeakerMuteIcon';
import { ImgIcon } from '../../../assets/icons/ImgIcon';

interface ExercisePropsType {
    width: number;
}

export const ExerciseContainer = styled('div')<ExercisePropsType>`
    width:  ${({ width }): string => `${width}px`};
    overflow: hidden;
    margin-bottom: 16px;
    border-radius: 8px;
    background-color: var(--colorPrimary);
    color: var(--white);

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
    padding: 0 32px 32px;
`;

export const ExerciseImg = styled('img')`
    height: 240px;
    width: 240px;
`;

export const ExerciseHeader = styled('div')`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    padding: 8px 16px 0;
`;

export const ExerciseLabel = styled('span')`
    font-size: 20px;
    font-weight: 700;
    text-transform: uppercase;
    text-shadow: 4px 4px 10px rgba(0, 0, 0, 0.6);
`;

export const NextLabel = styled('span')`
    font-size: 24px;
    font-weight: 700;
    color: var(--shade1);
    text-shadow: 4px 4px 10px rgba(0, 0, 0, 0.6);
`;

export const ControlsWrapper = styled('div')`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
`;

const setIcon = (): SerializedStyles => {
    return css`
        flex: 0 0 20px;
        width: 20px;
        height: 20px;
        fill: currentcolor;
        filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.6));
        margin-left: 8px;
    `;
};

export const PlayIconWrapper = styled(PlayIcon)`
    ${(): SerializedStyles => setIcon()};
    margin-left: 0;
`;

export const StopIconWrapper = styled(SquareIcon)`
    ${(): SerializedStyles => setIcon()};
    margin-left: 0;
`;

export const RefreshIconWrapper = styled(RefreshIcon)`
    ${(): SerializedStyles => setIcon()};
`;

export const SpeakerIconWrapper = styled(SpeakerIcon)`
    ${(): SerializedStyles => setIcon()};
`;

export const SpeakerMuteIconWrapper = styled(SpeakerMuteIcon)`
    ${(): SerializedStyles => setIcon()};
`;

export const ImgPlaceholder = styled(ImgIcon)`
    height: 200px;
    width: 200px;
    fill: currentcolor;
    margin-bottom: 40px;
`;
