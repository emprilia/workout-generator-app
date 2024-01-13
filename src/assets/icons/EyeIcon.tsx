import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';

const SvgElement = styled('svg')`
	height: auto;
`;

interface IconPropsType {
	className?: string;
	onClick?: () => void;
}

export const EyeIcon = observer(({ className, onClick }: IconPropsType): JSX.Element => {
	return (
		<SvgElement
			className={className}
			width="800"
			height="800"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			onClick={onClick}
			viewBox="0 0 24 24"
		>
            <path fill="fill" fillRule="nonzero" d="M12 9.005a4 4 0 1 1 0 8 4 4 0 0 1 0-8ZM12 5.5c4.614 0 8.596 3.15 9.701 7.564a.75.75 0 0 1-1.455.365 8.503 8.503 0 0 0-16.493.004.75.75 0 0 1-1.455-.363A10.003 10.003 0 0 1 12 5.5Z"/>
        </SvgElement>
	);
});
