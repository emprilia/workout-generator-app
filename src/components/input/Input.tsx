import React from 'react';
import { observer } from 'mobx-react-lite';
import { InputState } from './InputState';
import { InputWrapper, InputElement, InputLabel, ErrorMessage } from './Input.style';

type InputType = 'text' | 'number' | 'file' | 'url' | 'password';

interface InputPropsType {
    className?: string;
    stateValue: InputState;
    type?: InputType;
    label?: string;
    placeholder?: string;
    inputSize?: 'default' | 'large' | 'small';
    readOnly?: boolean;
    autoFocus?: boolean;
    min?: string;
    max?: string;
    maxLength?: number;
    value?: string;
    dataTest?: string;
}

export const Input = observer((props: InputPropsType) => {
    const {
        className,
        stateValue,
        type,
        label,
        placeholder,
        inputSize,
        readOnly,
        autoFocus,
        min,
        max,
        maxLength,
        value,
        dataTest
    } = props;

    return (
        <InputWrapper className={className}>
            {label === undefined ? null : <InputLabel htmlFor={value}>{label}</InputLabel>}
            <InputElement
                id={value}
                type={type}
                value={stateValue.value}
                placeholder={placeholder}
                inputSize={inputSize}
                readOnly={readOnly}
                autoFocus={autoFocus}
                min={min}
                max={max}
                maxLength={maxLength}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => stateValue.setValue(e.target.value)}
                data-test={dataTest}
            />
            {stateValue.error && <ErrorMessage>{stateValue.error}</ErrorMessage>}
        </InputWrapper>
    );
});