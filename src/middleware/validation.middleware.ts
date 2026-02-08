import { NextFunction, Request, Response } from 'express';
import { ZodObject, ZodError } from 'zod';

export const validateData = (schema: ZodObject<any>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    message: "Validation failed",
                    details: error.issues.map((issue) => ({
                        field: issue.path.join("."),
                        message: issue.message
                    }))
                })
            }
            return res.status(500).json({
                message: "Internal server error",
            })
        }
    }
}