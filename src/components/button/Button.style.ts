import { css, SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';

const buildBtnVersion = (version: 'primary' | 'secondary'): SerializedStyles => {
    if (version === 'secondary') {
        return css`
            background: var(--colorSecondary);
            color: var(--shade2);
            border-color: var(--shade2);
        `;
    }

    return css`
        background: var(--shade2);
        color: var(--colorSecondary);
        border-color: var(--shade2);
    `;
};

type ButtonPropsType = {
    version: 'primary' | 'secondary';
    width?: 'full' | 'default';
}

export const ButtonWrapper = styled('button')<ButtonPropsType>`
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    gap: 4px;
    height: 40px;
    padding: 10px 12px;
    font-family: var(--fontPrimary);
    font-size: 14px;
    font-weight: 700;
    border-style: solid;
    border-width: 2px;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
    transition: opacity 0.2s ease;
    ${({ version }): SerializedStyles => buildBtnVersion(version)};
    ${({ width }): string => width === 'full' ? 'width: 100%' : ''};

    &:hover {
        opacity: .8;
    }

    &:disabled {
        cursor: not-allowed;
        opacity: .4;
        pointer-events: none;
    }
`;
