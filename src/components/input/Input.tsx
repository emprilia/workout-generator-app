import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { InputState } from './InputState';
import { InputWrapper, InputElement, InputLabel } from './Input.style';

type InputType = 'text' | 'number' | 'file' | 'url';

interface InputPropsType {
    className?: string,
    stateValue: InputState<string | number>;
    type?: InputType,
    label?: string,
    placeholder?: string,
    readOnly?: boolean,
    autoFocus?: boolean,
    min?: string,
    max?: string,
    maxLength?: number,
    value?: string,
    onFocusCB: (value: string) => void;
    onBlurCB: () => void;
}

export const Input = observer((props: InputPropsType) => {
    const {
        className,
        stateValue,
        type,
        label,
        placeholder,
        readOnly,
        autoFocus,
        min,
        max,
        maxLength,
        value,
        onFocusCB,
        onBlurCB
    } = props;

    const [inputState] = useState(() => new InputState(stateValue));

    React.useEffect(() => {
        inputState.setValue(stateValue);
    }, [stateValue, inputState]);

    return (
        <InputWrapper className={className}>
            {label === undefined ? null : <InputLabel htmlFor={value}>{label}</InputLabel>}
            <InputElement
                id={value}
                type={type}
                value={stateValue.value}
                placeholder={placeholder}
                readOnly={readOnly}
                autoFocus={autoFocus}
                min={min}
                max={max}
                maxLength={maxLength}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => stateValue.setValue(e.target.value)}
                // onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                //     const value = type === 'number' ? parseInt(e.target.value, 10) : e.target.value;
                //     stateValue.setValue(value);
                // }}
                onFocus={() => onFocusCB(value ?? '')}
                onBlur={onBlurCB}
            />
        </InputWrapper>
    );
});