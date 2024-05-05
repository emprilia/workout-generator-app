import { SerializedStyles, css } from "@emotion/react";
import styled from "@emotion/styled";
import { AnnouncementIcon } from "../../assets/icons/AnnounceIcon";
import { SpeakIcon } from "../../assets/icons/SpeakIcon";
import { KeyboardIcon } from "../../assets/icons/KeyboardIcon";

export const CommandOptionsWrapper = styled('div')`
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    align-items: end;
    margin-top: 16px;
`;

export const OptionWrapper = styled('div')`
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin: 4px 0 0 24px;
`;

export const TooltipWrapper = styled('div')`
    position: absolute;
    top: 0;
    right: 56px;
    width: max-content;
    margin-right: 8px;
`;

const setIcon = (): SerializedStyles => {
    return css`
        flex: 0 0 24px;
        width: 24px;
        height: 24px;
        fill: currentcolor;
        filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.6));
        margin: 0 8px;
    `;
};

export const AnnouncementIconWrapper = styled(AnnouncementIcon)`
    ${(): SerializedStyles => setIcon()};
`;

export const SpeakIconWrapper = styled(SpeakIcon)`
    ${(): SerializedStyles => setIcon()};
    stroke: currentcolor;
    fill: transparent;
`;

export const KeyboardIconWrapper = styled(KeyboardIcon)`
    ${(): SerializedStyles => setIcon()};
`;

export const TooltipWrapperNew = styled('div')`
    position: absolute;
`;
