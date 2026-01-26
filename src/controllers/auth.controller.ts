import {NextFunction, Request, Response} from 'express'

export const loginController = async (req: Request, res: Response, next: NextFunction) =>{

    const { email, password } = req.body;
    const usermail = email.trim().toLowerCase();
}