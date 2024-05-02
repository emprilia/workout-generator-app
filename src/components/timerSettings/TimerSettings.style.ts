import styled from '@emotion/styled';
import { SerializedStyles, css } from '@emotion/react';
import { StopwatchIcon } from '../../assets/icons/StopwatchIcon';
import { PrepIcon } from '../../assets/icons/PrepIcon';
import { WorkoutIcon } from '../../assets/icons/WorkoutIcon';
import { BreakIcon } from '../../assets/icons/BreakIcon';
import { MinMaxIcon } from '../../assets/icons/MinMaxIcon';
import { InfoIcon } from '../../assets/icons/InfoIcon';
import { InfoWrapper } from '../common/common.style';

interface InputWrapperPropsType {
    isFocused: boolean;
    isNoneFocused: boolean;
}

export const TimerSettingsWrapper = styled('div')`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    margin: 16px 0;
`;

export const InputWrapper = styled('label')<InputWrapperPropsType>`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    background: var(--colorPrimary);
    border-radius: 8px;
    height: 150px;
    width: 150px;
    font-size: 14px;
    font-weight: 500;
    text-shadow: 4px 4px 10px rgba(0, 0, 0, 0.6);
    text-transform: lowercase;
    transition: opacity .2 ease;
`;

export const TimerInputWrapper = styled('div')<InputWrapperPropsType>`
    position: relative;
    ${({ isNoneFocused, isFocused }): string => isNoneFocused || isFocused ? '' : 'opacity: .4'};
    color: ${({ isFocused, isNoneFocused }): string => isNoneFocused || isFocused === false ? 'var(--shade2)' : 'var(--white)'};
`;

export const FakeInputWrapper = styled(InputWrapper)`
    background: var(--opacityPrimary);
    color: var(--white);
`;

export const FakeInput = styled('div')`
    font-size: 24px;
    font-weight: 700;
    height: 24px;
    width: 100%;
    padding: 8px 0;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
`

const setIcon = (): SerializedStyles => {
    return css`
        width: 40px;
        height: 40px;
        fill: currentcolor;
        margin: 4px 0;
        filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.6));
    `;
};

export const StopwatchIconWrapper = styled(StopwatchIcon)`
    ${(): SerializedStyles => setIcon()};
`
export const PrepIconWrapper = styled(PrepIcon)`
    ${(): SerializedStyles => setIcon()};
`

export const WorkoutIconWrapper = styled(WorkoutIcon)`
    ${(): SerializedStyles => setIcon()};
`

export const BreakIconWrapper = styled(BreakIcon)`
    ${(): SerializedStyles => setIcon()};
    transform: scaleX(-1);
`

export const MinMaxIconWrapper = styled(MinMaxIcon)<{isMin?: boolean}>`
    ${(): SerializedStyles => setIcon()};
    ${({ isMin }): string => isMin === true ? 'transform: scaleX(-1)' : ''};
`

export const TimerInfoWrapper = styled(InfoWrapper)`
    position: absolute;
    top: 8px;
    right: 20px;
    margin: 0 8px;
`;

export const InfoIconWrapper = styled(InfoIcon)`
    position: absolute;
    top: 0;
    right: 0;
    width: 16px;
    height: 16px;
    fill: currentcolor;
    padding: 8px;
    filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.4));
`
