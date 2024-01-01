import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';

const SvgElement = styled('svg')`
	height: auto;
`;

interface IconPropsType {
	className?: string;
	onClick?: () => void;
}

export const RefreshIcon = observer(({ className, onClick }: IconPropsType): JSX.Element => {
	return (
		<SvgElement
			className={className}
			width="24"
			height="24"
			fill="fill"
			xmlns="http://www.w3.org/2000/svg"
			onClick={onClick}
			viewBox="0 0 24 24"
		>
            <path
                d="M12,2a10.042,10.042,0,0,1,7.14,3H15V7h5.143A1.859,1.859,0,0,0,22,5.143V0H20V3.06A12,12,0,0,0,0,12H2A10.011,10.011,0,0,1,12,2Z"
            />
            <path
                d="M22,12A10,10,0,0,1,4.86,19H9V17H3.857A1.859,1.859,0,0,0,2,18.857V24H4V20.94A12,12,0,0,0,24,12Z"
            />
		</SvgElement>
	);
});
