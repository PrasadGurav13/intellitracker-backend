import { User } from "@prisma/client";
import { prisma } from "~/utils/prisma.util";
import bcrypt from 'bcrypt'

export const createUser = async (data: User) => {

    const userAlreadyExist = await prisma.user.findUnique({
        where:{
            email: data.email,
            isDeleted: false
        }
    })

    if (userAlreadyExist) {
        throw new Error("user already exist")
    }

    const hashedPassword = bcrypt.hashSync(data.password, 10);

    return await prisma.user.create({
        data: { ...data, password: hashedPassword },
        select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            mobileNo: true,
        }
    })
}

export const validateUser = async (email: string, pass: string) => {
    const usermail = email.trim().toLowerCase();
    
    const userData = await prisma.user.findFirst({
        where: { 
            email: usermail,
            isDeleted: false,
        }
    });
    
    if (!userData) {
        throw new Error("user not found")
    }
    
    const isPasswordValid = bcrypt.compareSync(pass, userData.password);
    if (!isPasswordValid) throw new Error('invalid Credentials')

    const { password, ...userWithoutPassword} = userData;
    return userWithoutPassword;
}
