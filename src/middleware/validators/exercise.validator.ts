import z from "zod";

export const exerciseValidator = z.object({
    name: z.string().min(2, "Exercise Name is Too Short").nonoptional(),
    category: z.string().min(2, "Exercise category is Too Short").nonoptional()
})
