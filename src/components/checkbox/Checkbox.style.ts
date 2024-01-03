import styled from '@emotion/styled';
import { SerializedStyles, css } from '@emotion/react';
import { CheckIcon } from '../../assets/icons/CheckboxIcon';

interface CheckboxPropsType {
    isChecked: boolean,
    isDisabled?: boolean
}

export const buildCheckbox = (isChecked: boolean): SerializedStyles => {
    if (isChecked === true) {
        return css`
            border: 1px solid var(--shade1);
            background: var(--colorPrimary);
    `;
    }
    return css`
        border: 1px solid var(--shade3);
        background: transparent;
    `;
};

export const CheckboxWrapper = styled('span')<CheckboxPropsType>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 12px;
    height: 12px;
    ${({ isChecked }): SerializedStyles => buildCheckbox(isChecked)};
    ${({ isDisabled }): string => isDisabled ? 'pointer-events: none' : ''};
    transition: background-color .2s ease;
    border-radius: 2px;
`;

export const CheckboxContainer = styled('div')<CheckboxPropsType>`
    position: relative;
    display: flex;
    align-items: center;
    ${({ isDisabled }): string => isDisabled ? 'opacity: .4' : ''};
    ${({ isDisabled }): string => isDisabled ? 'cursor: not-allowed' : ''};
`;

export const CheckIconWrapper = styled(CheckIcon)`
    position: absolute;
    width: 10px;
    fill: var(--shade1);
`;

export const Label = styled('span')`
    font-size: 14px;
    margin-left: 4px;
`;
