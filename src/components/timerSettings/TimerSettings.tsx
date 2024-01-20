import { observer } from 'mobx-react-lite';
import { TimerSettingsState } from './TimerSettingsState';
import { TimerSettingForm } from './TimerSettingsForm';
import { Header } from '../common/common.style';

interface TimerSettingsPropsType {
    timerSettingsState: TimerSettingsState;
}

export const TimerSettings = observer((props: TimerSettingsPropsType) => {
    const { timerSettingsState } = props;

    const { currentSetting } = timerSettingsState;

    return (
        <>
            <Header>TIMER SETTINGS</Header>
            {currentSetting && <TimerSettingForm timerSetting={currentSetting} timerSettingsState={timerSettingsState} />}
        </>
    )
})
