import React from "react";
import { observer } from "mobx-react-lite";
import { VoiceOptionsWrapper, SpeakIconWrapper, VoiceInfoWrapper, AnnouncementIconWrapper } from "./VoiceOptions.style";

interface WorkoutGeneratorWrapperPropsType {
    isVoiceCommandOn: boolean;
    startListening: () => void;
    abortListening: () => void;
    isTextToSpeechOn: boolean;
    setTextToSpeech: () => void;
}

export const VoiceOptions = observer(
  (props: WorkoutGeneratorWrapperPropsType) => {
    const { isVoiceCommandOn, startListening, abortListening, isTextToSpeechOn, setTextToSpeech } = props;

    return (
        <VoiceOptionsWrapper>
            {isVoiceCommandOn ? <VoiceInfoWrapper>
                <span>START to start/resume workout</span>
                <span>PAUSE to pause workout</span>
                <span>STOP to end workout</span>
            </VoiceInfoWrapper> : null}
            <div  onClick={isVoiceCommandOn ? abortListening : startListening}>
                <SpeakIconWrapper />
                {isVoiceCommandOn ? <>ON</> : <>OFF</>}
            </div>
            <div onClick={setTextToSpeech}>
                <AnnouncementIconWrapper/>
                {isTextToSpeechOn ? <>ON</> : <>OFF</>}
            </div>
        </VoiceOptionsWrapper>
    );
  }
);
