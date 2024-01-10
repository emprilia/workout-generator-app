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

const buildBtnSize = (size: 'small' | 'default' | 'large'): SerializedStyles => {
    if (size === 'large') {
        return css`
            font-size: 16px;
            height: 40px;
            padding: 10px 12px;
        `;
    }

    if (size === 'small') {
        return css`
            font-size: 12px;
            height: 28px;
            padding: 10px 12px;
        `;
    }

    return css`
        font-size: 14px;
        height: 40px;
        padding: 10px 12px;
    `;
};

type ButtonPropsType = {
    version: 'primary' | 'secondary';
    width: 'full' | 'default';
    size: 'small' | 'default' | 'large';
}

export const ButtonWrapper = styled('button')<ButtonPropsType>`
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    gap: 4px;
    font-family: var(--fontPrimary);
    font-weight: 700;
    border-style: solid;
    border-width: 2px;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
    transition: opacity 0.2s ease;
    ${({ size }): SerializedStyles => buildBtnSize(size)};
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
