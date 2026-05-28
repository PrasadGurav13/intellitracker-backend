import z from "zod";

const setSchema = z.object({
    id: z.number().optional(),
    weightKg: z.number().optional(),
    reps: z.number().optional(),
    durationSec: z.number().optional()
});

const exerciseSchema = z.object({
    id: z.number().optional(),
    exerciseId: z.number(),
    sets: z.array(setSchema).min(1)
});

export const createWorkoutValidator = z.object({
    date: z.string().datetime().optional(),

    notes: z.string().optional(),

    exercises: z.array(exerciseSchema).min(1)
});

export const updateWorkoutValidator = z.object({
    date: z.string().datetime().optional(),

    notes: z.string().optional(),

    exercises: z.array(exerciseSchema).optional()
});