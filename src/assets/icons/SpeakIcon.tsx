import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";

const SvgElement = styled("svg")`
  height: auto;
`;

interface IconPropsType {
  className?: string;
  onClick?: () => void;
}

export const SpeakIcon = observer(
  ({ className, onClick }: IconPropsType): JSX.Element => {
    return (
        <SvgElement
            width="24"
            height="24"
            fill="#fff"
            stroke="#000"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            onClick={onClick}
            viewBox="0 0 24 24"
        >
            <circle cx="10" cy="6" r="4" strokeWidth="1.5" />
            <path
                strokeWidth="1.5"
                d="M18 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S5.582 13 10 13s8 2.015 8 4.5Z"
            />
            <path
                strokeLinecap="round"
                strokeWidth="1.5"
                d="M19 2s2 1.2 2 4-2 4-2 4M17 4s1 .6 1 2-1 2-1 2"
            />
        </SvgElement>
    );
  }
);
