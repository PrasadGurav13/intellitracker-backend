import {prisma} from '../utils/prisma.util'
import bcrypt from 'bcrypt'
import {NextFunction, Request, response, Response} from 'express'
import { generateToken } from '~/utils/jwt.util';

export const loginController = async (req: Request, res: Response, next: NextFunction) =>{

    const { email, password } = req.body;
    const usermail = email.trim().toLowerCase();

    const userData = await prisma.user.findFirst({
        where: { 
            email: usermail,
            isDeleted: false,
        }
    });

    if (!userData) {
        return next("user not found")
    }

    const isPasswordValid = bcrypt.compareSync(password, userData.password);
    
    if (!isPasswordValid) {
        return next('invalid Credentials')
    }

    const token = generateToken(userData, '30d');

    return res.json({
        token,
        userData
    });

}