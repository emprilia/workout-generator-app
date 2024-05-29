import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { LogoutIcon } from './assets/icons/LogoutIcon';

export const AppWrapper = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: 612px;
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

export const MenuItem = styled(Link, {shouldForwardProp: (prop) => prop !== 'isActive'})<{isActive: boolean}>`
    color: ${({ isActive }): string => isActive ? 'var(--white)' : 'var(--shade2)'};
    font-weight: ${({ isActive }): string => isActive ? '500' : '700'};
    cursor: pointer;
    text-decoration: none;
`;

export const LogoutIconWrapper = styled(LogoutIcon)`
    width: 20px;
    height: 20px;
    fill: currentcolor;
`;
