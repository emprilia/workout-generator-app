import styled from '@emotion/styled';
import { SerializedStyles, css } from '@emotion/react';
import { Button } from '../button/Button';
import { EditIcon } from '../../assets/icons/EditIcon';
import { TrashIcon } from '../../assets/icons/TrashIcon';
import { ExitIcon } from '../../assets/icons/ExitIcon';

export const ExerciseListContainer = styled('div')`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 8px;
    margin-top: 16px;
    overflow: auto scroll;
`;

export const CreateExerciseWrapper = styled('div')`
    // TODO: add styles
    height: 94px;
    width: 94px;
    padding: 8px;
    border-radius: 4px;
    background-color: var(--opacityPrimary);
    color: var(--shade2);
`;

export const ExerciseListActionsWrapper = styled('div')`
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    justify-content: space-between;
    align-items: center;
`;

export const ActionsWrapper = styled('div')`
    display: flex;
    flex-flow: column nowrap;
    gap: 4px;
    font-size: 12px;
`;

export const BackButton = styled(Button)`
    position: fixed;
    top: 24px;
    left: 42px;
    z-index: 2;
`;

export const InfoWrapper = styled('div')`
    font-size: 10px;
    background: var(--shade3);
    border-radius: 4px;
    padding: 8px;
    color: var(--white);
    margin: 16px 0;
`;

const setIcon = (): SerializedStyles => {
    return css`
        width: 20px;
        height: 20px;
        fill: currentcolor;
        filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.4));
    `;
};

export const TrashIconWrapper = styled(TrashIcon)`
    ${(): SerializedStyles => setIcon()};
`;

export const EditIconWrapper = styled(EditIcon)`
    ${(): SerializedStyles => setIcon()};
`;

export const ExitIconWrapper = styled(ExitIcon)`
    ${(): SerializedStyles => setIcon()};
`;
