import styled from '@emotion/styled';

interface InputElementPropsType {
    inputSize?: 'default' | 'large' | 'small';
}

export const InputWrapper = styled('div')``;

export const InputElement = styled('input')<InputElementPropsType>`
    background-color: transparent;
    border: none;
    outline: none;
    font-family: var(--fontPrimary);
    font-size: 14px;
    font-weight: 700;
    font-size: ${({ inputSize }): string => inputSize === 'large' ? '24px' : '14px'};
    color: currentcolor;
    height: 24px;
    width: 100%;
    line-height: 1.4;
    padding: 8px 0;
    text-align: center;
    color-scheme: dark;

    &::placeholder {
        color: var(--shade2);
        font-weight: 400;
    }
`;

export const InputLabel = styled('label')`
    font-size: 14px;
    font-weight: 500;
    margin: 0;
`;

export const ErrorMessage = styled('div')`
    font-size: 14px;
    padding-left: 8px;
    padding: 8px;
    border-radius: 0 0 4px 4px;
    background: var(--warning);
    color: var(--white);
`;
