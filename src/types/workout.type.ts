export type CreateWorkoutInput = {
    date?: string;
    notes?: string;

    exercises: {
        id?: number;
        exerciseId: number;

        sets: {
            id?: number;
            weightKg?: number;
            reps?: number;
            durationSec?: number;
        }[];
    }[];
};