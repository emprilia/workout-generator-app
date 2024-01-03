import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';

const SvgElement = styled('svg')`
	height: auto;
`;

// TODO: transform logic here

interface IconPropsType {
	className?: string;
	onClick?: () => void;
}

export const MinMaxIcon = observer(({ className, onClick }: IconPropsType): JSX.Element => {
	return (
		<SvgElement
			className={className}
			width="1000"
			height="1000"
			fill="fill" // TODO
			xmlns="http://www.w3.org/2000/svg"
			onClick={() => onClick}
			viewBox="0 0 1000 1000"
		>
            <path d="M989.8 563.5c0-267-218-482.7-488.1-483.3h-1.5C229.4 80.2 10 296.1 10 563.5v1.1c0 140 60.4 265.7 156.4 354.1l1.1 1.1 80-80-24.7-24.8-55.3 55.3c-34.6-37.6-62.5-78.7-83.1-124.2-22.7-50.3-35.9-103.7-38.7-158.6H115v-35H45.2c1.3-56.9 13.3-112.2 35.6-164.2C101 341.1 129 298 163.7 260.2l60.6 60.6 12-12 11.6-11.4 1.1-1.1-60.8-60.8c39.4-36.7 84.6-66 134.5-86.8 50.7-21.2 104.3-31.3 159.7-33v80.5h35v-80.7c55.3 1.7 109.1 11.6 159.9 33 49.6 20.8 94.7 49.9 134.1 86.6l-61 61 1.1 1.1 11.6 11.4 12 12 61-61c35 37.8 63 80.9 83.1 128.4 22.3 52.3 34.1 107.4 35.4 164.5h-69.8v35h69.3c-3.1 54.9-16 108.5-38.7 158.6-20.8 45.5-48.8 86.6-83.3 124.2L776.5 815l-24.7 24.7 80.3 80 5.7-5.5c93.4-88 152.2-212 152.2-349.8v-.7c-.2.3-.2.1-.2-.2z"/><path d="M465.8 497.3c-2.4 1.7-3.7 3.5-5.2 5.2-11.8 10.7-19.5 25.8-19.5 42.9 0 32.1 26.5 58.2 58.8 58.2 18.6 0 35-8.5 45.7-21.9.9-.9 2-1.7 2.6-2.6l178-206-21.9-23.6-238.5 147.8z"/>
        </SvgElement>
	);
});
