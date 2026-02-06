import {prisma} from '../utils/prisma.util'
import bcrypt from 'bcrypt'
import {NextFunction, Request, Response} from 'express'
import { createUser, validateUser } from '~/services/auth.service';
import { catchAsync } from '~/utils/catchAsync.util';
import { generateToken } from '~/utils/jwt.util';

export const signupController = async ( req: Request, res: Response, next: NextFunction ) => {
    const email = req.body.email.trim().toLowerCase();

    const userData = await createUser({...req.body, email})
    const token = await generateToken(userData, '30d');

    return res.status(201).json({
        token,
        userData
    })
} 

export const loginController = catchAsync(async (req: Request, res: Response) =>{
    const { email, password } = req.body;
    const usermail = email.trim().toLowerCase();

    const userData = await validateUser(usermail, password);
    const token = generateToken(userData, '30d');

    return res.json({
        token,
        userData
    });
});