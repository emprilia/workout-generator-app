import React from 'react';
import { observer } from 'mobx-react-lite';
import { AppState } from '../../AppState.state';
import { Input } from '../input/Input';
import { Header } from '../common/common.style';
import {
    InputWrapper,
    TimerInputWrapper,
    TimerSettingsWrapper,
    StopwatchIconWrapper,
    FakeInput,
    FakeInputWrapper,
    InfoWrapper,
    InfoIconWrapper
} from './TimerSettings.style';

interface TimerSettingsPropsType {
    appState: AppState;
}

export const TimerSettings = observer((props: TimerSettingsPropsType) => {
    const { appState } = props;

    const {
        timerSettingsState,
        updateExercisesStateRoundsCount
    } = appState;

    const {
        totalRoundTime,
        inputData,
        focusedInput,
        onDivFocus,
        onInputFocus,
        onBlur,
        openInfo,
        setOpenInfo
    } = timerSettingsState;

    return (
        <>
            <Header>TIMER SETTINGS</Header>
            <TimerSettingsWrapper>
                <TimerInputWrapper>
                    <FakeInputWrapper isFocused={true}>
                        <StopwatchIconWrapper />
                        <FakeInput>{totalRoundTime}</FakeInput>
                        Total round time
                    </FakeInputWrapper>
                    <div
                        tabIndex={0}
                        onClick={() => setOpenInfo('totalRounds')}
                        onBlur={() => setOpenInfo('totalRounds')}>
                        <InfoIconWrapper />
                    </div>
                    {openInfo !== 'totalRounds' ? null : <InfoWrapper>Total round time is the combined workout and break time, calculated automatically.</InfoWrapper>}
                </TimerInputWrapper>
                {inputData.map((input) => (
                    <TimerInputWrapper key={input.value}>
                        <InputWrapper
                            tabIndex={0}
                            onClick={() => onDivFocus(input.value)}
                            onBlur={onBlur}
                            isFocused={focusedInput === '' ? true : input.value === focusedInput}
                        >
                            {input.icon}
                            <Input
                                type='number'
                                stateValue={input.stateValue}
                                onFocusCB={() => onInputFocus(input.value)}
                                onBlurCB={updateExercisesStateRoundsCount}
                            />
                            {input.label}
                        </InputWrapper>
                        <div
                            tabIndex={0}
                            onClick={() => setOpenInfo(input.value)}
                            onBlur={() => setOpenInfo(input.value)}>
                            <InfoIconWrapper />
                        </div>
                        {openInfo !== input.value ? null : <InfoWrapper>{input.info}</InfoWrapper>}
                    </TimerInputWrapper>
                ))}
            </TimerSettingsWrapper>
        </>
    )
})
