import styled from '@emotion/styled';
import { AppLogoLarge, Header } from '../common/common.style';
import { Input } from '../input/Input';

export const UserFormWrapper = styled('div')`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    gap: 16px;
    width: 350px;
    background-color: var(--colorSecondary);
`;

export const UserFormHeader = styled(Header)`
    font-size: 20px;
`;

export const UserInputWrapper = styled(Input)`
    width: 100%;
    background: var(--colorPrimary);
    color: var(--shade2);
    border-radius: 8px;
`;

export const FormFooter = styled('span')`
    font-size: 14px;
    display: flex;
    flex-flow: column nowrap;
    gap: 16px;
    width: 100%;
`;

export const AppLogoWrapper = styled(AppLogoLarge)`
    margin-bottom: 32px;
`;
