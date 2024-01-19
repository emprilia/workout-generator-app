import { WorkoutGeneratorPropsType } from '../components/timerSettings/TimerSettingsState';
import { supabase } from './supabase';

export const getInitialTimerSettings = async (): Promise<Array<WorkoutGeneratorPropsType> | null> => {
    const { data, error } = await supabase
    .from('initial-timer-settings')
        .select('*')
        .returns<Array<WorkoutGeneratorPropsType>>();

    if (error) {
        console.log('Error', error);
        return null;
    } else {
        return data;
    }
};

export const getTimerSettings = async (): Promise<Array<WorkoutGeneratorPropsType> | null> => {
    const { data, error } = await supabase
    .from('timer-settings')
        .select('*')
        .returns<Array<WorkoutGeneratorPropsType>>();

    if (error) {
        console.log('Error', error);
        return null;
    } else {
        return data;
    }
};

export const createTimerSettings = async (data: WorkoutGeneratorPropsType): Promise<void> => {
    const { error } = await supabase
        .from('timer-settings')
        .insert(data);

    if (error) throw new Error(`Failed to update exercise: ${error.message}`);
};

export const updateTimerSettings = async (id: number, data: WorkoutGeneratorPropsType): Promise<void> => {
    const { error } = await supabase
        .from('timer-settings')
        .update({ ...data, user_id: data.user_id })
        .match({ id });

    if (error) throw new Error(`Failed to update exercise: ${error.message}`);
};
