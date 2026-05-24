import z from "zod";

export const workoutValidator = z.object({
    date: z.string().date().optional(),
    notes: z.string().optional(),
})
