import React from "react";
import { observer } from "mobx-react-lite";
import { CommandOptionsWrapper, SpeakIconWrapper, AnnouncementIconWrapper, KeyboardIconWrapper, OptionWrapper, TooltipWrapper } from "./CommandOptions.style";
import { Tooltip, TooltipState } from "../tooltip/Tooltip";
import { useAppStateContext } from "../../AppStateContext";

interface CommandOptionsPropsType {
    isVoiceCommandOn: boolean;
    startListening: () => void;
    abortListening: () => void;
    isTextToSpeechOn: boolean;
    setTextToSpeech: () => void;
    isKeyboardCommandOn: boolean;
    setKeyboardCommandOn: () => void;
}

export const CommandOptions = observer( (props: CommandOptionsPropsType) => {
    const { isVoiceCommandOn, startListening, abortListening, isTextToSpeechOn, setTextToSpeech, isKeyboardCommandOn, setKeyboardCommandOn } = props;

    const [tooltipState] = React.useState(() => new TooltipState());

    const appState = useAppStateContext();

    return (
        <CommandOptionsWrapper>
            {/* <OptionWrapper>
                <TooltipWrapper>
                    <Tooltip openInfo='voice' state={tooltipState}>
                        <span>Enable/disable voice commands:</span>
                        <span>GO to start/resume the workout</span>
                        <span>PAUSE to pause the workout</span>
                        <span>STOP to end the workout</span>
                        <span>AGAIN to repeat the workout</span>
                        <span>NEW WORKOUT to start a new workout</span>
                        <span>END to finish working out</span>
                    </Tooltip>
                </TooltipWrapper>
                <OptionWrapper onClick={isVoiceCommandOn ? abortListening : startListening}>
                    <SpeakIconWrapper />
                    {isVoiceCommandOn ? <>ON</> : <>OFF</>}
                </OptionWrapper>
            </OptionWrapper> */}
            <OptionWrapper>
                <TooltipWrapper>
                    <Tooltip openInfo='text-to-speech' state={tooltipState}>
                        Enable/disable text to speech for exercise names
                    </Tooltip>
                </TooltipWrapper>
                <OptionWrapper  onClick={setTextToSpeech}>
                    <AnnouncementIconWrapper />
                    {isTextToSpeechOn ? <>ON</> : <>OFF</>}
                </OptionWrapper>
            </OptionWrapper>
            {appState.isMobile ? null : <OptionWrapper>
                <TooltipWrapper>
                    <Tooltip openInfo='keyboard' state={tooltipState}>
                        <span>Enable/disable keyboard controls</span>
                        <span>SPACEBAR to start/resume/pause the workout</span>
                        <span>ESCAPE to stop the workout</span>
                        <span>A to repeat the workout</span>
                        <span>R to start a new workout</span>
                        <span>MUTE to mute/unmute the countdown sounds</span>
                    </Tooltip>
                </TooltipWrapper>
                <OptionWrapper  onClick={setKeyboardCommandOn}>
                    <KeyboardIconWrapper />
                    {isKeyboardCommandOn ? <>ON</> : <>OFF</>}
                </OptionWrapper>
            </OptionWrapper>}
        </CommandOptionsWrapper>
    );
  }
);
