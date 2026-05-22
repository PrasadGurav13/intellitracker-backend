import { User, UserProfile } from "@prisma/client";
import { prisma } from "~/utils/prisma.util"

export const getUserById = async (userId: number) => {

    if (!userId) {
        throw new Error("User ID is required");
    }
    
    const user =  await prisma.user.findUnique({
        where: {
            id: userId,
            isDeleted: false
        },
        include: {
            profile: true
        }
    })

    if (!user) {
        throw new Error("user not found")
    }

    const {password, ...safeUser} = user;
    return safeUser;
}

export const updateUserData = async (userId: number, userData: Partial<User>) => {

    if (!userId) {
        throw new Error("User ID is required");
    }

    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { firstName: userData.firstName, lastName: userData.lastName, mobileNo: userData.mobileNo },
    })

    if (!updatedUser) {
        throw new Error("Failed to update user");
    }

    const {password, ...safeUser} = updatedUser;
    return safeUser;
}

export const deleteUserData = async (userId: number) => {

    if (!userId) {
        throw new Error("User ID is required");
    }

    const deletedUser = await prisma.user.update({
        where: { id: userId },
        data: { isDeleted: true }
    })

    if (!deletedUser) {
        throw new Error("Failed to delete user");
    }

    const {password, ...safeUser} = deletedUser;
    return safeUser;
}

export const createUserProfile = async (userId: number, userData: Partial<UserProfile>) => {

    if (!userId) {
        throw new Error("User ID is required");
    }

    const createdProfile = await prisma.userProfile.create({
        data: {
            userId,
            ...userData
        }
    });

    return createdProfile;
}

export const updateUserProfile = async (userId: number, userData: Partial<UserProfile>) => {

    if (!userId) {
        throw new Error("User ID is required");
    }

    const updatedProfile = await prisma.userProfile.update({
        where: { userId },
        data: {
            ...userData
        }
    });

    return updatedProfile;
}
