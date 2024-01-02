import styled from '@emotion/styled';

const setChevronPosition = (position: 'up' | 'right' | 'down' | 'left' | undefined): string => {
    if (position === 'right') {
        return 'rotate(0)';
    }

    if (position === 'up') {
        return 'rotate(90deg)';
    }

    if (position === 'down') {
        return 'rotate(-90deg)';
    }

    return 'rotate(180deg)';
};

interface SvgElementPropsType {
    position: 'up' | 'right' | 'down' | 'left';
}

const SvgElement = styled('svg')<SvgElementPropsType>`
    height: auto;
    transform: ${({ position } ): string => setChevronPosition(position)};
    transition: transform .2s ease;
`;

interface ChevronIconPropsType {
    className?: string;
    onClick?: () => void;
    position: 'up' | 'right' | 'down' | 'left';
}

export const ChevronIcon = ({ className, onClick, position }: ChevronIconPropsType): JSX.Element => {
    return (
        <SvgElement
            width='800'
            height='800'
            position={position}
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className={className}
            onClick={onClick}
            viewBox='0 0 330 330'
        >
            <path d="M111.213 165.004 250.607 25.607c5.858-5.858 5.858-15.355 0-21.213-5.858-5.858-15.355-5.858-21.213.001l-150 150.004a15 15 0 0 0 0 21.212l150 149.996C232.322 328.536 236.161 330 240 330s7.678-1.464 10.607-4.394c5.858-5.858 5.858-15.355 0-21.213L111.213 165.004z" />
        </SvgElement>
    );
};

