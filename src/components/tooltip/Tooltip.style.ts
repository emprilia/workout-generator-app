import styled from "@emotion/styled";
import { InfoWrapper } from "../common/common.style";
import { InfoIcon } from "../../assets/icons/InfoIcon";

export const TooltipControlWrapper = styled ('div')`
    display: flex;
    flex-flow: row nowrap;
    cursor: pointer;
`;

export const TooltipContentWrapper = styled(InfoWrapper)`
    display: flex;
    flex-flow: column nowrap;
    width: calc(100% - 48px);
    margin: 8px 0 0 0;
`;

export const InfoIconWrapper = styled(InfoIcon)`
    height: 16px;
    width: 16px;
    fill: currentcolor;
    padding: 8px;
    filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.4));
`;
