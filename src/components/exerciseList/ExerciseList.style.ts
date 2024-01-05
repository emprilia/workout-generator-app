import styled from '@emotion/styled';

export const ExerciseListContainer = styled('div')`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    margin: 16px 0;
`;

export const SelectedCount = styled('span')`
    font-size: 16px;
`;
