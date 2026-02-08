import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface authRequest extends Request {
    user?: { id: number, email: string};
}

export const authorizationMiddleware = async (req: authRequest, res: Response, next: NextFunction) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: number, email: string};
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}