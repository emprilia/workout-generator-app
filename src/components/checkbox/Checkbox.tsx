import { observer } from 'mobx-react-lite';
import { CheckIconWrapper, CheckboxContainer, CheckboxWrapper, Label } from './Checkbox.style';

export interface CheckboxPropsType {
    className?: string,
    label: string,
    isChecked: boolean
    isDisabled?: boolean,
    onChange: () => void
}

export const Checkbox = observer((props: CheckboxPropsType): JSX.Element => {
    const { className, label, onChange, isChecked, isDisabled } = props;

    return (
        <CheckboxContainer isDisabled={isDisabled} isChecked={isChecked}>
            <CheckboxWrapper className={className} onClick={onChange} isChecked={isChecked} isDisabled={isDisabled}>
                {isChecked ? <CheckIconWrapper /> : null}
            </CheckboxWrapper>
            <Label>{label}</Label>
        </CheckboxContainer>
    );
});
