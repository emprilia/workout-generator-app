import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';

const SvgElement = styled('svg')`
	height: auto;
`;

interface IconPropsType {
	className?: string;
	onClick?: () => void;
}

export const SpeakerIcon = observer(({ className, onClick }: IconPropsType): JSX.Element => {
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
            <path d="M40 49.504c1.594 0 2.742-1.172 2.742-2.742V9.379c0-1.57-1.148-2.883-2.789-2.883-1.148 0-1.898.563-3.164 1.688l-11.016 9.773c-.14.14-.351.211-.585.211h-6.961c-3.329 0-4.97 1.664-4.97 5.203V32.7c0 3.54 1.641 5.203 4.97 5.203h6.96c.235 0 .446.07.586.211L36.79 47.98c1.148 1.032 2.063 1.524 3.211 1.524Zm-1.36-4.945c-.117 0-.257-.07-.398-.211L27.86 34.996c-.562-.516-1.03-.633-1.664-.633h-7.804c-.914 0-1.36-.422-1.36-1.36v-9.937c0-.914.446-1.359 1.36-1.359h7.804c.633 0 1.078-.094 1.664-.633l10.383-9.422c.117-.093.258-.187.399-.187.21 0 .328.14.328.328v32.414c0 .211-.117.352-.328.352Z"/>
        </SvgElement>
	);
});
