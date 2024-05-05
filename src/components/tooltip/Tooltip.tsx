import React from "react";
import { observer } from "mobx-react-lite";
import { action, observable, makeAutoObservable } from 'mobx';
import { TooltipControlWrapper, TooltipContentWrapper, InfoIconWrapper } from "./Tooltip.style";

interface TooltipPropsType {
    children: React.ReactNode;
    openInfo: string;
    state: TooltipState;
}

export class TooltipState {
    @observable public openInfo: string = '';

    public constructor() {
        makeAutoObservable(this);
    }

    @action setOpenInfo = (value: string) => {
        if (this.openInfo === value) {
            this.openInfo = '';
        } else {
            this.openInfo = value;
        }
    }
}

export const Tooltip = observer( (props: TooltipPropsType) => {
    const { children, openInfo, state } = props;

    return (
        <TooltipControlWrapper tabIndex={0} onClick={() => state.setOpenInfo(openInfo)} onBlur={() => state.setOpenInfo('')}>
            {openInfo === state.openInfo ? <TooltipContentWrapper>
                {children}
            </TooltipContentWrapper> : null}
            <InfoIconWrapper />
        </TooltipControlWrapper>
    );
  }
);
