import { supabase } from './supabase';

export interface TimerSettingType {
    id: number;
    label: string;
    prepTime: number;
    workoutTime: number;
    breakTime: number;
    minRounds: number;
    maxRounds: number;
    isActive: boolean;
    user_id: string;
}

export type TimerSettingsInitialCreateType = Omit<TimerSettingType, 'id'>;

export const getCurrentTimerSettings = async (): Promise<TimerSettingType | null> => {
    const { data, error } = await supabase
    .from('timer-settings')
    .select('*')
    .eq('isActive', true)
    .returns<TimerSettingType>()
    .single();

    if (error) {
        console.log('Error', error);
        return null;
    } else {
        return data;
    }
};

export const getInitialTimerSettings = async (): Promise<Array<TimerSettingType> | null> => {
    const { data, error } = await supabase
    .from('initial-timer-settings')
        .select('*')
        .returns<Array<TimerSettingType>>();

    if (error) {
        console.log('Error', error);
        return null;
    } else {
        return data;
    }
};

export const getTimerSettings = async (): Promise<Array<TimerSettingType> | null> => {
    const { data, error } = await supabase
    .from('timer-settings')
        .select('*')
        .returns<Array<TimerSettingType>>();

    if (error) {
        console.log('Error', error);
        return null;
    } else {
        return data;
    }
};

export const createTimerSettings = async (data: TimerSettingsInitialCreateType): Promise<void> => {
    const createData = {
        label: data.label,
        prepTime: data.prepTime,
        workoutTime: data.workoutTime,
        breakTime: data.breakTime,
        minRounds: data.minRounds,
        maxRounds: data.maxRounds,
        isActive: data.isActive,
        user_id: data.user_id,
    };

    const { error } = await supabase
        .from('timer-settings')
        .insert(createData);

    if (error) throw new Error(`Failed to update exercise: ${error.message}`);
};

export const updateTimerSettings = async (id: number, data: TimerSettingType): Promise<void> => {
    const { error } = await supabase
        .from('timer-settings')
        .update({ ...data, user_id: data.user_id })
        .match({ id });

    if (error) throw new Error(`Failed to update exercise: ${error.message}`);
};
