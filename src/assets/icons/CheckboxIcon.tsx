import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';

const SvgElement = styled('svg')`
    height: auto;
`;

interface IconPropsType {
    className?: string;
    onClick?: () => void;
}


export const CheckIcon = observer(({ className, onClick }: IconPropsType): JSX.Element => {
    return (
        <SvgElement
            onClick={onClick}
            fill='#fff'
            className={className}
            xmlns='http://www.w3.org/2000/svg'
            width='11'
            height='8'
            viewBox='0 0 11 8'
        >
            <path
                fill='fill'
                fillRule='nonzero'
                d='M3.5 5.086L1.707 3.293c-.39-.39-1.024-.39-1.414 0-.39.39-.39 1.024 0 1.414l2.5 2.5c.39.39 1.024.39 1.414 0l5.5-5.5c.39-.39.39-1.024 0-1.414-.39-.39-1.024-.39-1.414 0L3.5 5.086z' transform='translate(-453 -292) translate(200 56) translate(27 66) translate(223.5 166) translate(3 4)'
            />
        </SvgElement>
    )
});
