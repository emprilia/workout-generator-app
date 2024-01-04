import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';

const ShapeText = styled('text')`
    font-size: 96px;
    font-weight: 700;
    fill: var(--colorPrimary);
`;

const SvgElement = styled('svg')`
	height: auto;
`;

interface IconPropsType {
    time: number;
	className?: string;
	onClick?: () => void;
}

export const CounterIcon = observer((props: IconPropsType): JSX.Element => {
    const { className, onClick, time } = props;

	return (
		<SvgElement
			className={className}
			width="200"
			height="200"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			onClick={() => onClick}
			viewBox="0 0 200 200"
		>
			<defs>
				<linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
					<stop offset="0%" stopColor="rgba(49,202,250,1)" />
					<stop offset="50%" stopColor="rgba(141,255,177,1)" />
					<stop offset="100%" stopColor="rgba(178,240,255,1)" />
				</linearGradient>
  			</defs>
			<circle cx="100" cy="100" r="95" fillOpacity="0" stroke="url(#gradient)"></circle>
            <ShapeText x="50%" y="50%" textAnchor="middle" dy=".3em">{time}</ShapeText>
		</SvgElement>
	);
});
