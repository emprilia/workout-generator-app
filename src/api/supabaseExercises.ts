import { PostgrestError } from '@supabase/supabase-js';
import { supabase, supabaseUrl } from './supabase';

type ExerciseInitialCreateType = Omit<ExerciseType, 'id'> & { userId: string };

export type ExerciseCreateType = Omit<ExerciseType, 'id' | 'imgUrl'> & { imgUrl: File | null, userId: string };

export interface ExerciseType {
    id: number;
    label: string;
    imgUrl: string | null;
    isBothSides: boolean;
    isActive: boolean;
    isFavorite: boolean;
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

const uploadImage = async (path: string, file: File | Blob): Promise<void> => {
    const { error: uploadError } = await supabase.storage
        .from('exercise-images')
        .upload(path, file, {
            cacheControl: '3600',
            upsert: false
        });

    if (uploadError) throw new Error(`Failed to upload image to user folder: ${uploadError.message}`);
};

const copyImageToUserFolder = async (userId: string, imgUrl: string): Promise<void> => {
    const parts = imgUrl.split('/');
    const fileName = parts[parts.length - 1];

    if (fileName) {
        const { data: downloadData, error: downloadError } =
            await supabase.storage.from('exercise-images').download(fileName);

        if (downloadError) {
            throw new Error(`Failed to download image: ${downloadError.message}`);
        }

        const userFolderPath = `${userId}/${fileName}`;
        await uploadImage(userFolderPath, downloadData);
    }
};

const deleteImage = async (imgUrl: string, userId: string): Promise<void> => {
    const fileName = imgUrl.split('/').pop();

    const imagePath = `exercises-list/${userId}/${fileName}`;

    const { error: deleteImageError } = await supabase.storage
        .from('exercise-images')
        .remove([imagePath]);

    if (deleteImageError) {
        throw new Error(`Failed to delete image: ${deleteImageError.message}`);
    }
};

export const createInitialExercise = async (data: ExerciseInitialCreateType): Promise<void> => {
    if (data.imgUrl !== null) {
        await copyImageToUserFolder(data.userId, data.imgUrl);

        const parts = data.imgUrl.split('/');
        parts[parts.length - 1] = `${data.userId}/${parts[parts.length - 1]}`;
        const newImgUrl = parts.join('/');

        const currentDate = new Date().toISOString();

        const createData = {
            label: data.label,
            imgUrl: newImgUrl,
            isBothSides: data.isBothSides,
            isActive: data.isActive,
            isFavorite: data.isFavorite,
            created_at: currentDate,
            user_id: data.userId
        };

        const { error } = await supabase
            .from('exercises-list')
            .insert(createData);

        if (error) throw new Error(`Failed to create exercise: ${error.message}`);
    }
};

export const createExercise = async (data: ExerciseCreateType): Promise<PostgrestError | null> => {
    let imageUrl;

    if (data.imgUrl && data.imgUrl instanceof File) {
        const fileExt = data.imgUrl.name.split('.').pop();
        const randomId = Math.random().toString(36).substring(2);
        const fileName = `${randomId}.${fileExt}`;
        const userFolderPath = `${data.userId}/${fileName}`;

        await uploadImage(userFolderPath, data.imgUrl);

        imageUrl = `${supabaseUrl}/storage/v1/object/public/exercise-images/${userFolderPath}`;
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

    return error;
};

export const updateExercise = async (id: number, data: ExerciseCreateType): Promise<PostgrestError | null> => {
    const { data: exercise, error: fetchError } = await supabase
        .from('exercises-list')
        .select('imgUrl')
        .match({ id })
        .single();

    if (fetchError)
        throw new Error(`Failed to fetch exercise: ${fetchError.message}`);

    let imgUrlUpdate;

    if (data.imgUrl && data.imgUrl instanceof File) {
        const fileExt = data.imgUrl.name.split('.').pop();
        const randomId = Math.random().toString(36).substring(2);
        const fileName = `${randomId}.${fileExt}`;
        const userFolderPath = `${data.userId}/${fileName}`;

        await uploadImage(userFolderPath, data.imgUrl);

        imgUrlUpdate = `${supabaseUrl}/storage/v1/object/public/exercise-images/${userFolderPath}`;
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

    const { error } = await supabase
        .from('exercises-list')
        .update(updateData)
        .match({ id });

    if (error) return error;

    if (imgUrlUpdate !== undefined) {
        deleteImage(exercise.imgUrl, data.userId);
    }

    return null;
};

export const quickUpdate = async (id: number, data: QuickUpdateType): Promise<PostgrestError | null> => {
    const { error } = await supabase
        .from('exercises-list')
        .update(data)
        .match({ id });

    return error;
};

export const deleteExercise = async (id: number, userId: string): Promise<PostgrestError | null> => {
    const { data, error: fetchError } = await supabase
        .from('exercises-list')
        .select('imgUrl')
        .match({ id })
        .single();

    if (fetchError) return fetchError;

    const { error: deleteExerciseError } = await supabase
        .from('exercises-list')
        .delete()
        .match({ id });

    if (deleteExerciseError) return deleteExerciseError;

    if (data.imgUrl) {
        deleteImage(data.imgUrl, userId);
    }

    return null;
};
