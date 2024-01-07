import { ExerciseCreateType } from "../components/exerciseList/ExerciseFormState";

export const createExercise = async (data: ExerciseCreateType): Promise<void> => {
    const formData = new FormData();
    formData.append('label', data.label);
    if (data.imgFile) {
        formData.append('imageFile', data.imgFile);
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
