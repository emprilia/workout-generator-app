import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';

const SvgElement = styled('svg')`
    height: auto;
`;

interface IconPropsType {
    className?: string;
    onClick?: () => void;
}

export const SuccessIcon = observer(({ className, onClick }: IconPropsType): JSX.Element => {
    return (
        <SvgElement
            width='800'
            height='800'
            fill='#fff'
            xmlns='http://www.w3.org/2000/svg'
            className={className}
            onClick={onClick}
            viewBox='0 0 52 52'
        >
            <path d="M26 2C12.7 2 2 12.7 2 26s10.7 24 24 24 24-10.7 24-24S39.3 2 26 2zm13.4 18L24.1 35.5c-.6.6-1.6.6-2.2 0L13.5 27c-.6-.6-.6-1.6 0-2.2l2.2-2.2c.6-.6 1.6-.6 2.2 0l4.4 4.5c.4.4 1.1.4 1.5 0L35 15.5c.6-.6 1.6-.6 2.2 0l2.2 2.2c.7.6.7 1.6 0 2.3z"/>
        </SvgElement>
    );
});
