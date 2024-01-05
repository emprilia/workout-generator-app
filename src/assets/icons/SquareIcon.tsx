import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';

const SvgElement = styled('svg')`
	height: auto;
`;

interface IconPropsType {
	className?: string;
	onClick?: () => void;
}

export const SquareIcon = observer(({ className, onClick }: IconPropsType): JSX.Element => {
	return (
		<SvgElement
			className={className}
			width="800"
			height="800"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			onClick={onClick}
			viewBox="0 0 28 28"
		>
            <path fill="fill" fillRule="evenodd" d="M26 25a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h22a1 1 0 0 1 1 1v22Zm0-25H2a2 2 0 0 0-2 2v24a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Z"/>
        </SvgElement>
	);
});
