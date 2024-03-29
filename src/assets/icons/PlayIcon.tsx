import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';

const SvgElement = styled('svg')`
    height: auto;
`;

interface IconPropsType {
    className?: string;
    onClick?: () => void;
}

export const PlayIcon = observer(({ className, onClick }: IconPropsType): JSX.Element => {
    return (
        <SvgElement
            width='24'
            height='24'
            fill='black'
            xmlns='http://www.w3.org/2000/svg'
            className={className}
            onClick={onClick}
            viewBox='0 0 24 24'
        >
            <path
                d="m20.494 7.968-9.54-7A5 5 0 0 0 3 5v14a5 5 0 0 0 7.957 4.031l9.54-7a5 5 0 0 0 0-8.064Zm-1.184 6.45-9.54 7A3 3 0 0 1 5 19V5a2.948 2.948 0 0 1 1.641-2.672A3.018 3.018 0 0 1 8.006 2a2.97 2.97 0 0 1 1.764.589l9.54 7a3 3 0 0 1 0 4.836Z"
            />
        </SvgElement>
    );
});
