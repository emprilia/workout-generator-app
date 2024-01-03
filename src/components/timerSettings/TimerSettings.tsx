import React from 'react';
import { observer } from 'mobx-react-lite';
import { AppState } from '../../AppState.state';
import { TimerSettingsState } from './TimerSettingsState';
import { Input } from '../input/Input';
import { Header } from '../common/common.style';
import {
    InputWrapper,
    TimerInputWrapper,
    TimerSettingsWrapper,
    StopwatchIconWrapper,
    PrepIconWrapper,
    WorkoutIconWrapper,
    BreakIconWrapper,
    MinMaxIconWrapper,
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
        totalRoundTime,
        prepTime, // ??? move to timer settings state?
        workoutTime,
        breakTime,
        minRounds,
        maxRounds,
        focusedInput,
        onDivFocus,
        onInputFocus,
        onBlur
    } = appState;
    
    const [timerSettingsState] = React.useState(() => new TimerSettingsState());
    const {
        openInfo,
        setOpenInfo
    } = timerSettingsState;

    const inputData = [ // ??? move to timer state?
        {
            label: 'Prep time',
            value: 'prepTime',
            icon: <PrepIconWrapper />,
            info: 'Prep time is the initial countdown time before the workout begins.',
            stateValue: prepTime,
        },
        {
            label: 'Workout time',
            value: 'workoutTime',
            icon: <WorkoutIconWrapper />,
            info: 'Workout time is the time spent doing the exercise.',
            stateValue: workoutTime,
        },
        {
            label: 'Break time',
            value: 'breakTime',
            icon: <BreakIconWrapper />,
            info: 'Break time is the time between each exercise to get some rest or adjust your position.',
            stateValue: breakTime,
        },
        {
            label: 'Min rounds',
            value: 'minRounds',
            icon: <MinMaxIconWrapper isMin={true} />,
            info: 'Min rounds is the minimum number of full rounds.',
            stateValue: minRounds,
        },
        {
            label: 'Max rounds',
            value: 'maxRounds', // ???
            icon: <MinMaxIconWrapper />,
            info: `Max rounds is the maximum number of rounds. Cannot be higher than current number of available exercises (${appState.selectedExercises.length}).`,
            stateValue: maxRounds,
        },
    ]

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
                                onBlurCB={onBlur}
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
