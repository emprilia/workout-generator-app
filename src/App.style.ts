import styled from '@emotion/styled';
import { LogoutIcon } from './assets/icons/LogoutIcon';

export const AppWrapper = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: 100vh;
    max-width: 350px;
    margin: 0 auto;
    padding: 24px;
`;

export const MenuWrapper = styled('div')`
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
`;

export const LogoutIconWrapper = styled(LogoutIcon)`
    width: 20px;
    height: 20px;
    fill: currentcolor
`;
