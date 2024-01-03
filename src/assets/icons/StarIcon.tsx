import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';

const SvgElement = styled('svg')`
    height: auto;
`;

interface StarIconPropsType {
    className?: string;
    onClick?: () => void;
    isFilled: boolean;
}

export const StarIcon = observer(({ className, onClick, isFilled }: StarIconPropsType): JSX.Element => {
    return (
        <SvgElement
            width='24'
            height='24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className={className}
            onClick={onClick}
            viewBox="0 0 512 512"
        >
            <path fill={`${isFilled ? 'fill' : 'transparent'}`} d="M256 21.33 320 192h170.67l-128 128 42.66 170.66L256 383.99 106.67 490.66 149.33 320l-128-128H192l64-170.67z" />
            <path fill="fill" d="M405.33 512a21.32 21.32 0 0 1-12.4-4L256 410.21 119.07 508A21.34 21.34 0 0 1 86 485.48l39.74-158.95L6.25 207.08a21.33 21.33 0 0 1 15.08-36.42h155.88L236 13.84a21.33 21.33 0 0 1 39.95 0l58.81 156.82h155.91a21.33 21.33 0 0 1 15.08 36.42L386.29 326.54 426 485.48A21.33 21.33 0 0 1 405.33 512ZM256 362.66a21.33 21.33 0 0 1 12.4 4l102.18 73L342 325.17a21.33 21.33 0 0 1 5.61-20.26l91.58-91.58H320a21.34 21.34 0 0 1-20-13.84l-44-117.4-44 117.4a21.34 21.34 0 0 1-20 13.84H72.84l91.58 91.58a21.33 21.33 0 0 1 5.58 20.26l-28.58 114.45 102.18-73a21.33 21.33 0 0 1 12.4-3.96Z" />
        </SvgElement>
    );
});
