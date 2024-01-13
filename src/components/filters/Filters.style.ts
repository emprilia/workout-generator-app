import styled from "@emotion/styled/macro";
import { EyeIcon } from '../../assets/icons/EyeIcon';
import { SortIcon } from '../../assets/icons/SortIcon';
import { SerializedStyles, css } from "@emotion/react";

export const FiltersContainer = styled('div')`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    align-self: end;
    gap: 8px;
    max-width: 100%;
    font-size: 14px;
    color: var(--colorSecondary);
    margin-bottom: 16px;
`;

export const ItemsContainer = styled('div')`
    display: flex;
    flex-flow: row nowrap;
    justify-content: end;
    align-items: center;
    overflow: hidden;
    height: 28px;
    border-radius: 4px;
`;

export const ItemsWrapper = styled('div') <{ isOpen: boolean }>`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    border-radius: 4px;
    max-width: ${({ isOpen }): string => isOpen ? '100%' : '0'};
    transform: ${({ isOpen }): string => isOpen ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.3s ease, max-width 0.3s ease;
    ${({ isOpen }): string => isOpen ? 'margin-right: -4px;' : ''};
    overflow: hidden;
    white-space: nowrap;
    background: var(--shade3);
`;

export const Item = styled('span') <{ isActive: boolean }>`
    background: ${({ isActive }): string => isActive ? 'var(--shade2)' : 'var(--shade3)'};
    ${({ isActive }): string => isActive ? '' : 'color: var(--opacityWhite68)'};
    ${({ isActive }): string => isActive ? 'font-weight: 700' : ''};
    ${({ isActive }): string => isActive ? 'border-radius: 4px' : ''};
    padding: 4px 8px;

    &:last-of-type {
        padding-right: 8px;
    }
    &:first-of-type {
        padding-left: 8px;
    }
`;

const setIcon = (): SerializedStyles => {
    return css`
        min-width: 24px;
        width: 24px;
        height: 24px;
        fill: currentColor;
        background-color: var(--shade2);
        border-radius: 4px;
        padding: 2px;
        z-index: 1;
    `;
};

export const ShowHideIconWrapper = styled(EyeIcon)`
    ${(): SerializedStyles => setIcon()};
`;

export const SortIconWrapper = styled(SortIcon)`
    ${(): SerializedStyles => setIcon()};
`;
