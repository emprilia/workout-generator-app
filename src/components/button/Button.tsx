import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { ButtonWrapper } from './Button.style';

export type ButtonVersion = 'primary' | 'secondary'

export interface ButtonPropsType {
    children: React.ReactNode;
    className?: string;
    version?: ButtonVersion;
    size?: 'small' | 'default' | 'large';
    width?: 'full' | 'default';
    isDisabled?: boolean,
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    dataTest?: string;
}

export const Button = observer((props: ButtonPropsType) => {
    const {
        children,
        className,
        size = 'default',
        version = 'primary',
        width = 'default',
        isDisabled,
        onClick,
        dataTest
    } = props;

    return (
        <ButtonWrapper
            className={className}
            disabled={isDisabled}
            onClick={onClick}
            width={width}
            size={size}
            version={version}
            data-test={dataTest}
        >
            {children}
        </ButtonWrapper>
    );
});
