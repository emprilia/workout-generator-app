import { supabase } from '../../supabase/supabase';

interface ExerciseType {
    id: number;
    label: string;
    imgUrl: string | null;
    isBothSides: boolean;
    isActive: boolean;
    isFavorite: boolean;
}

export const getUserExercises = async (): Promise<Array<ExerciseType> | null> => {
    const { data, error } = await supabase
        .from('exercises-list')
        .select('*')
        .returns<Array<ExerciseType>>();

    if (error) {
        console.log('Error', error);
        return null;
    } else {
        return data;
    }
};

export const checkExerciseExists = async (label: string): Promise<boolean> => {
    const { data, error } = await supabase
        .from('exercises-list')
        .select('id')  // Select only the id to minimize data transfer
        .eq('label', label)
        .single();

    if (error) {
        console.log('Error', error);
        return false;
    } else {
        return data !== null;
    }
};
