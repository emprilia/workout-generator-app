import styled from '@emotion/styled';
import { DiskIcon } from '../../assets/icons/DiskIcon';

export const Header = styled('span')`
    font-size: 28px;
    font-weight: 700;
    text-align: center;
`;

export const DiskIconWrapper = styled(DiskIcon)`
    height: 20px;
    width: 20px;
    fill: currentColor;
`;

export const InfoWrapper = styled('div')`
    font-size: 10px;
    background: var(--shade3);
    border-radius: 4px;
    padding: 8px;
    color: var(--white);
    margin: 16px 0;
`;
