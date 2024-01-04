import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';

const SvgElement = styled('svg')`
	height: auto;
`;

interface IconPropsType {
	className?: string;
	onClick?: () => void;
}

export const SpeakerMuteIcon = observer(({ className, onClick }: IconPropsType): JSX.Element => {
	return (
		<SvgElement
			className={className}
			width="800"
			height="800"
			fill="fill"
			xmlns="http://www.w3.org/2000/svg"
			onClick={onClick}
			viewBox="0 0 56 56"
		>
            <path d="M39.719 33.566V8.207c0-1.57-1.149-2.883-2.79-2.883-1.148 0-1.898.563-3.163 1.688l-10.829 9.633 2.602 2.625 9.68-8.79c.117-.093.234-.187.398-.187a.32.32 0 0 1 .328.328v19.172Zm7.054 16.407c.727.703 1.875.703 2.555 0 .703-.727.727-1.852 0-2.555L9.203 7.293a1.84 1.84 0 0 0-2.578 0c-.68.68-.68 1.875 0 2.555Zm-9.797-1.641c1.032 0 1.922-.539 2.461-1.594l-2.859-2.742-11.883-10.289c-.515-.445-.797-.516-1.453-.516h-7.758c-.914 0-1.476-.562-1.476-1.476V21.59l-2.813-3c-.656.937-.96 2.133-.96 3.68v9.14c0 3.516 1.78 5.32 5.085 5.32h6.844c.234 0 .422.07.586.211l11.016 9.868c1.148 1.03 2.062 1.523 3.21 1.523Z"/>
        </SvgElement>
	);
});
