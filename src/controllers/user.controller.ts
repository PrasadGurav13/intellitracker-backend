import { Response } from "express";
import { authRequest } from "~/middleware";
import { createUserProfile, deleteUserData, getUserById, updateUserData, updateUserProfile } from "~/services";
import { catchAsync } from "~/utils/catchAsync.util";

export const getUser = catchAsync(async (req: authRequest, res: Response) => {
    const userid = req.user?.id;
    const userData = await getUserById(userid!)
    res.status(200).json({
        success: true,
        data: userData
    })
}) 

export const updateUser = catchAsync(async (req: authRequest, res: Response) => {
    const userid = req.user?.id;
    const userUpdateData = req.body;

    const updatedUser = await updateUserData(userid!, userUpdateData);
    
    res.status(200).json({
        success: true,
        data: updatedUser
    })
})

export const deleteUser = catchAsync(async (req: authRequest, res: Response) => {
    const userid = req.user?.id;
    
    const deletedUser = await deleteUserData(userid!);
    
    res.status(200).json({
        success: true,
        data: deletedUser
    })
})

export const createProfile = catchAsync(async (req: authRequest, res: Response) => {
    const userid = req.user?.id;
    const userProfileData = req.body;

    const createdProfile = await createUserProfile(userid!, userProfileData);

    res.status(201).json({
        success: true,
        data: createdProfile
    })
})

export const updateProfile = catchAsync(async (req: authRequest, res: Response) => {
    const userid = req.user?.id;
    const userProfileData = req.body;

    const updatedProfile = await updateUserProfile(userid!, userProfileData);
    
    res.status(200).json({
        success: true,
        data: updatedProfile
    })
})