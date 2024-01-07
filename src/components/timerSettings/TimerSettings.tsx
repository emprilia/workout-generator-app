import React from 'react';
import { observer } from 'mobx-react-lite';
import { TimerSettingsState } from './TimerSettingsState';
import { Input } from '../input/Input';
import { Button } from '../button/Button';
import { DiskIconWrapper, Header } from '../common/common.style';
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
    timerSettingsState: TimerSettingsState;
}

export const TimerSettings = observer((props: TimerSettingsPropsType) => {
    const { timerSettingsState } = props;

    const {
        totalRoundTime,
        inputData,
        focusedInput,
        onDivFocus,
        onBlur,
        openInfo,
        setOpenInfo,
        saveTimer
    } = timerSettingsState;

    return (
        <>
            <Header>TIMER SETTINGS</Header>
            <TimerSettingsWrapper>
                <TimerInputWrapper isFocused={false} isNoneFocused={true}>
                    <FakeInputWrapper isFocused={false} isNoneFocused={true}>
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
                    <TimerInputWrapper
                        key={input.value}
                        isFocused={input.value === focusedInput}
                        isNoneFocused={focusedInput === ''}>
                            <InputWrapper
                                tabIndex={0}
                                onClick={() => onDivFocus(input.value)}
                                onBlur={onBlur}
                                isFocused={input.value === focusedInput}
                                isNoneFocused={focusedInput === ''}
                            >
                                {input.icon}
                                <Input
                                    type='number'
                                    inputSize='large'
                                    stateValue={input.stateValue}
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
            <Button onClick={saveTimer}>
                <DiskIconWrapper />
                SAVE SETTINGS
            </Button>
        </>
    )
})
