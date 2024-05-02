import React from "react";
import { observer } from "mobx-react-lite";
import { VoiceOptionsWrapper, SpeakIconWrapper, VoiceInfoWrapper } from "./VoiceOptions.style";

interface WorkoutGeneratorWrapperPropsType {
    isVoiceCommandOn: boolean;
    startListening: () => void;
    abortListening: () => void;
}

export const VoiceOptions = observer(
  (props: WorkoutGeneratorWrapperPropsType) => {
    const { isVoiceCommandOn, startListening, abortListening } = props;

    return (
        <VoiceOptionsWrapper>
            {isVoiceCommandOn ? <VoiceInfoWrapper>
                <span>START to start/resume workout</span>
                <span>PAUSE to pause workout</span>
                <span>STOP to end workout</span>
            </VoiceInfoWrapper> : null}
            <SpeakIconWrapper onClick={isVoiceCommandOn ? abortListening : startListening} />
        </VoiceOptionsWrapper>
    );
  }
);
