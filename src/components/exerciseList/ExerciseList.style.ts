import styled from '@emotion/styled';
import { Button } from '../button/Button';

export const ExerciseListContainer = styled('div')`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    margin: 16px 0;
`;

export const SelectedCount = styled('span')`
    font-size: 16px;
`;

export const BackButton = styled(Button)`
    position: fixed;
    top: 24px;
    left: 42px;
    z-index: 2;
`;
