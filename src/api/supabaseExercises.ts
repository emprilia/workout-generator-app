import { supabase } from './supabase';

export type ExerciseInitialCreateType = Omit<ExerciseType, 'id'> & { userId: string };

export type ExerciseCreateType = Omit<ExerciseType, 'id' | 'imgUrl'> & { imgUrl: File | null, userId: string };
export interface ExerciseType {
    id: number;
    label: string;
    imgUrl: string;
    isBothSides: boolean;
    isActive: boolean;
    isFavorite: boolean;
    isInitial?: boolean;
}

interface QuickUpdateType {
    isActive: boolean;
    isFavorite: boolean;
}

export const getInitialExercises = async (): Promise<Array<ExerciseType> | null> => {
    const { data, error } = await supabase
    .from('initial-exercises-list')
        .select('*')
        .returns<Array<ExerciseType>>();

    if (error) {
        console.log('Error', error);
        return null;
    } else {
        return data;
    }
};

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

export const createInitialExercise = async (data: ExerciseInitialCreateType): Promise<void> => {
    const currentDate = new Date().toISOString();

    const createData = {
        label: data.label,
        imgUrl: data.imgUrl,
        isBothSides: data.isBothSides,
        isActive: data.isActive,
        isFavorite: data.isFavorite,
        created_at: currentDate,
        user_id: data.userId
    };

    const { error } = await supabase.from('exercises-list').insert(createData);

    if (error) throw new Error(`Failed to create exercise: ${error.message}`);
}

export const createExercise = async (data: ExerciseCreateType): Promise<void> => {
    let imageUrl;

    if (data.imgUrl && data.imgUrl instanceof File) {
        const fileExt = data.imgUrl.name.split('.').pop();
        const randomId = Math.random().toString(36).substring(2);
        const fileName = `${randomId}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
            .from('exercise-images')
            .upload(fileName, data.imgUrl, {
                cacheControl: '3600', // or any other value as needed // ???
                upsert: false // set to true if you want to overwrite existing files
            });

        if (uploadError) {
            throw new Error(`Failed to upload image: ${uploadError.message}`);
        }

        imageUrl = `https://ukqvxfggjkzoafpxvaur.supabase.co/storage/v1/object/public/exercise-images/${fileName}`;
    }

    const currentDate = new Date().toISOString();

    const createData = {
        label: data.label,
        imgUrl: imageUrl || null,
        isBothSides: data.isBothSides,
        isActive: data.isActive,
        isFavorite: data.isFavorite,
        created_at: currentDate,
        user_id: data.userId
    };

    const { error } = await supabase.from('exercises-list').insert(createData);

    if (error) throw new Error(`Failed to create exercise: ${error.message}`);
};

export const updateExercise = async (id: number, data: ExerciseCreateType): Promise<void> => {
    const { data: exercise, error: fetchError } = await supabase
        .from('exercises-list')
        .select('imgUrl')
        .match({ id })
        .single();

    if (fetchError) throw new Error(`Failed to fetch exercise: ${fetchError.message}`);

    let imgUrlUpdate;

    if (data.imgUrl && data.imgUrl instanceof File) {
        const fileExt = data.imgUrl.name.split('.').pop();
        const randomId = Math.random().toString(36).substring(2);
        const fileName = `${randomId}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
            .from('exercise-images')
            .upload(fileName, data.imgUrl, {
                cacheControl: '3600',
                upsert: false
            });

        if (uploadError) {
            throw new Error(`Failed to upload image: ${uploadError.message}`);
        }

        imgUrlUpdate = `https://ukqvxfggjkzoafpxvaur.supabase.co/storage/v1/object/public/exercise-images/${fileName}`;
    }

    const currentDate = new Date().toISOString();
        
    const updateData = {
        label: data.label,
        imgUrl: imgUrlUpdate === undefined ? exercise.imgUrl : imgUrlUpdate,
        isBothSides: data.isBothSides,
        isActive: data.isActive,
        isFavorite: data.isFavorite,
        updated_at: currentDate
    };

    const { error } = await supabase.from('exercises-list').update(updateData).match({ id });

    if (error) throw new Error(`Failed to update exercise: ${error.message}`);

    if (imgUrlUpdate !== undefined) {
        deleteImage(exercise.imgUrl);
    }
};

export const quickUpdate = async (id: number, data: QuickUpdateType): Promise<void> => {
    const { error } = await supabase
        .from('exercises-list')
        .update(data)
        .match({ id });

    if (error) throw new Error(`Failed to update exercise: ${error.message}`);
};

export const deleteExercise = async (id: number): Promise<void> => {
    const { data: exercise, error: fetchError } = await supabase
        .from('exercises-list')
        .select('imgUrl')
        .match({ id })
        .single();

    if (fetchError) throw new Error(`Failed to fetch exercise: ${fetchError.message}`);

    const { error: deleteExerciseError } = await supabase
        .from('exercises-list')
        .delete()
        .match({ id });

    if (deleteExerciseError) throw new Error(`Failed to delete exercise: ${deleteExerciseError.message}`);

    deleteImage(exercise.imgUrl);
};


export const deleteImage = async (imgUrl: string): Promise<void> => {
    const imageUrlPath = imgUrl.split('/').pop();

    if (imageUrlPath) {
        const { error: deleteImageError } = await supabase.storage
            .from('exercise-images')
            .remove([imageUrlPath]);
    
        if (deleteImageError) throw new Error(`Failed to delete image: ${deleteImageError.message}`);
    }
}