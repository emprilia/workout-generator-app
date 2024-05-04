import styled from '@emotion/styled';
import { LogoutIcon } from './assets/icons/LogoutIcon';
import { AppLogo } from './assets/icons/Logo';

export const AppWrapper = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: 100vh;
    max-width: 350px;
    margin: 0 auto;
    padding: 24px;
`;

export const MenuHeader = styled('div')`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    background: var(--colorPrimary);
    padding: 12px 24px;
`;

export const MenuWrapper = styled('div')`
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    gap: 8px;
    font-weight: 500;
    font-size: 14px;
    margin-left: 24px;
`;

export const MenuItem = styled ('span')<{isActive: boolean}>`
    color: ${({ isActive }): string => isActive === false ? 'var(--shade2)' : ''};
    font-weight: ${({ isActive }): string => isActive === false ? '700' : ''};
    cursor: pointer;
`;

export const LogoutIconWrapper = styled(LogoutIcon)`
    width: 20px;
    height: 20px;
    fill: currentcolor;
`;

export const AppLogoWrapper = styled(AppLogo)`
    width: 48px;
    height: 48px;
`;
