import { SerializedStyles, css } from "@emotion/react";
import styled from "@emotion/styled";
import { AnnouncementIcon } from "../../assets/icons/AnnounceIcon";
import { SpeakIcon } from "../../assets/icons/SpeakIcon";
import { InfoWrapper } from "../common/common.style";

export const VoiceOptionsWrapper = styled("div")`
    display: flex;
    align-self: flex-end;
    margin-top: 16px;
`;

export const VoiceInfoWrapper = styled(InfoWrapper)`
    display: flex;
    flex-flow: column nowrap;
`;

const setIcon = (): SerializedStyles => {
    return css`
        flex: 0 0 24px;
        width: 24px;
        height: 24px;
        fill: currentcolor;
        filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.6));
        margin-left: 8px;
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
