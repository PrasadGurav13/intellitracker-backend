import z from "zod";

export const getUserProfile = z.object({
    userId: z.number().int().positive().nonoptional()
})