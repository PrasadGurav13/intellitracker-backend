import z from "zod";

export const getUserValidator = z.object({
    userId: z.number().int().positive().nonoptional()
})

export const updateUserValidator = z.object({
    firstName: z.string().min(2, "First Name is Too Short").optional(),
    lastName: z.string().min(2, "Last Name is Too Short").optional(),
    mobileNo: z.string().min(10, "Mobile Number must be at least 10 digits").max(10, "Mobile Number must be at most 10 digits").optional(),
})

export const userProfileValidator = z.object({
    age: z.number().int().positive().optional(),
    heightCm: z.number().positive().optional(),
    weightKg: z.number().positive().optional(),
    experienceLevel: z.enum(["beginner", "intermediate", "advanced"]).optional(),
})

