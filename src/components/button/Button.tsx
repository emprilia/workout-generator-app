import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { ButtonWrapper } from './Button.style';

export type ButtonVersion = 'primary' | 'secondary'

export interface ButtonPropsType {
    children: React.ReactNode;
    className?: string;
    version?: ButtonVersion;
    width?: 'full' | 'default';
    isDisabled?: boolean,
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const Button = observer((props: ButtonPropsType) => {
    const {
        children,
        className,
        version = 'primary',
        width = 'default',
        isDisabled,
        onClick,
    } = props;

    return (
        <ButtonWrapper
            className={className}
            disabled={isDisabled}
            onClick={onClick}
            width={width}
            version={version}
        >
            {children}
        </ButtonWrapper>
    );
});
