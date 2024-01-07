import { WorkoutGeneratorPropsType } from "../components/timerSettings/TimerSettingsState";

export const getAllGeneratorSettings = (): Promise<Array<WorkoutGeneratorPropsType>> => {
    return fetch('http://localhost:5000/get-workout-generator-timer-settings').then((response) => { // default before adding more
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

export const getSingleGeneratorSettings = (id: number): Promise<WorkoutGeneratorPropsType> => {
    return fetch(`http://localhost:5000/get-workout-generator-timer-settings/${id}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            if (Array.isArray(data) && data.length > 0) {
                return data[0];
            }
            return data;
        })
        .catch((error) => {
            console.error(error);
            throw error;
        });
};

export const updateSingleGeneratorSettings = (id: number, settings: Omit<WorkoutGeneratorPropsType, 'id'>): Promise<WorkoutGeneratorPropsType> => {
    return fetch(`http://localhost:5000/update-workout-generator-timer-settings/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok (${response.status})`);
        }
        return response.json();
    })
    .then(data => {
        return data as WorkoutGeneratorPropsType;
    })
    .catch(error => {
        console.error('Error updating generator settings:', error);
        throw error;
    });
};
