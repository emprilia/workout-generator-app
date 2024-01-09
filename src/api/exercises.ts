import { ExerciseCreateType } from "../components/exerciseList/ExerciseFormState";
import { ExerciseType } from "../components/exerciseList/ExercisesState";

export const getAllExercises = (): Promise<Array<ExerciseType>> => {
    return fetch('http://localhost:5000/get-exercise-list').then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
            return response.json();
        }).then((data) => {
            return data;
        }).catch((error) => {
            console.error(error);
            throw error;
        }
    );
};

export const createExercise = async (data: ExerciseCreateType): Promise<void> => {
    const formData = new FormData();
    formData.append('label', data.label);
    if (data.imgUrl) {
        formData.append('imageFile', data.imgUrl);
    }
    formData.append('isBothSides', JSON.stringify(data.isBothSides));
    formData.append('isSelected', JSON.stringify(data.isSelected));
    formData.append('isFavorite', JSON.stringify(data.isFavorite));

    try {
        const response = await fetch('http://localhost:5000/create-exercise', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        console.log('Success creating exercise');
    } catch (error) {
        if (error instanceof Error) {
            console.error('Failure:', error.message);
        } else {
            console.error('An unexpected error occurred');
        }
        throw new Error('Failed to create exercise');
    }
};

export const updateExercise = async (id: number, data: ExerciseCreateType): Promise<void> => {
    let body;

    if (data.imgUrl && data.imgUrl instanceof File) {
        const formData = new FormData();
        formData.append('imageFile', data.imgUrl);
        formData.append('label', data.label);
        formData.append('isBothSides', JSON.stringify(data.isBothSides));
        formData.append('isSelected', JSON.stringify(data.isSelected));
        formData.append('isFavorite', JSON.stringify(data.isFavorite));
        body = formData;
    } else {
        body = JSON.stringify({
            label: data.label,
            isBothSides: data.isBothSides,
            isSelected: data.isSelected,
            isFavorite: data.isFavorite
        });
    }

    try {
        const response = await fetch(`http://localhost:5000/update-exercise/${id}`, {
            method: 'PUT',
            headers: data.imgUrl && data.imgUrl instanceof File ? {} : {'Content-Type': 'application/json'},
            body: body
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        console.log('Success updating exercise');
    } catch (error) {
        if (error instanceof Error) {
            console.error('Failure:', error.message);
        } else {
            console.error('An unexpected error occurred');
        }
        throw new Error('Failed to update exercise');
    }
};
