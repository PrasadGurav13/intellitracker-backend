import { Response } from "express";
import { authRequest } from "~/middleware";
import { catchAsync } from "~/utils/catchAsync.util";
import { prisma } from "~/utils/prisma.util";

export const getExercises = catchAsync(async (req: authRequest, res: Response) => {
    
    const exercises = await prisma.exercise.findMany();
    res.status(200).json({
        success: true,
        data: exercises
    })
}) 

export const createExercise = catchAsync(async (req: authRequest, res: Response) => {
    const exerciseData = req.body;

    const createdExercise = await prisma.exercise.create({
        data: exerciseData
    });

    res.status(201).json({
        success: true,
        data: createdExercise
    })
})
