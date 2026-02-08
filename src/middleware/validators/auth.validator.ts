import { z } from "zod";

export const signupValidator = z.object({
    firstName: z.string().min(2, "First name is too short"),
    lastName: z.string().optional(),
    email: z.email("Invalid email address"),
    mobileNo: z.string().length(10, "Mobile number must be 10 digits"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
})

export const loginValidator = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
})