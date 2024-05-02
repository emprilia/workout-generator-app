import React from 'react';
import { observer } from 'mobx-react-lite';
import { TimerSettingsState } from './TimerSettingsState';
import { Input } from '../input/Input';
import { Button } from '../button/Button';
import { Spinner } from '../loader/Loader.style';
import { DiskIconWrapper } from '../common/common.style';
import {
    InputWrapper,
    TimerInputWrapper,
    TimerSettingsWrapper,
    StopwatchIconWrapper,
    FakeInput,
    FakeInputWrapper,
    TimerInfoWrapper,
    InfoIconWrapper
} from './TimerSettings.style';
import { TimerSettingState } from './TimerSettingState';
import { TimerSettingType } from '../../api/supabaseTimerSettings';

interface TimerSettingsPropsType {
    timerSetting: TimerSettingType;
    timerSettingsState: TimerSettingsState;
}

export const TimerSettingForm = observer((props: TimerSettingsPropsType) => {
    const { timerSetting, timerSettingsState } = props;

    const [timerSettingState] = React.useState(() => new TimerSettingState(timerSetting, timerSettingsState));

    const {
        totalRoundTime,
        inputData,
        focusedInput,
        onDivFocus,
        onBlur,
        openInfo,
        setOpenInfo,
        saveTimer,
        isLoading
    } = timerSettingState;

    return (
        <>
            <TimerSettingsWrapper>
                <TimerInputWrapper isFocused={false} isNoneFocused={true}>
                    <FakeInputWrapper isFocused={false} isNoneFocused={true}>
                        <StopwatchIconWrapper />
                        <FakeInput>{totalRoundTime}</FakeInput>
                        Total round time
                        <div
                            tabIndex={0}
                            onClick={() => setOpenInfo('totalRounds')}
                            onBlur={() => setOpenInfo('totalRounds')}>
                            <InfoIconWrapper />
                        </div>
                    </FakeInputWrapper>
                    {openInfo !== 'totalRounds' ? null : <TimerInfoWrapper>Total round time is the combined workout and break time, calculated automatically.</TimerInfoWrapper>}
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
                            {openInfo !== input.value ? null : <TimerInfoWrapper>{input.info}</TimerInfoWrapper>}
                    </TimerInputWrapper>
                ))}
            </TimerSettingsWrapper>
            <Button isDisabled={isLoading} onClick={saveTimer}>
                {isLoading && <Spinner />}
                <DiskIconWrapper />
                SAVE SETTINGS
            </Button>
        </>
    )
})
