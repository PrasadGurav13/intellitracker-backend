import { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode | 500;
    const message = err.message || "Internal Server Error";

    console.error("ERROR 💥:", err);

    res.status(statusCode).json({
        success: false,
        message: message,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    })
}