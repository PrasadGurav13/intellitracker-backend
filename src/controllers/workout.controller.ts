import { Response } from "express";
import { authRequest } from "~/middleware";
import { createUserWorkout } from "~/services/workout.service";
import { catchAsync } from "~/utils/catchAsync.util";
import { prisma } from "~/utils/prisma.util";

export const getWorkouts = catchAsync(async (req: authRequest, res: Response) => {
    const userId = req.user?.id;
    
    const workouts = await prisma.workout.findMany({
        where: {
            userId: userId
        }
    });
    res.status(200).json({
        success: true,
        data: workouts
    })
}) 

export const getWorkoutById = catchAsync(async (req: authRequest, res: Response) => {
    const { id } = req.params;
    
    const workout = await prisma.workout.findUnique({
        where: {
            id: Number(id)
        }
    })

    res.status(200).json({
        success: true,
        data: workout
    })
}) 

export const createWorkouts = catchAsync(async (req: authRequest, res: Response) => {
    const userId = req.user?.id;
    const workoutData = req.body;

    const createdWorkout = await createUserWorkout(userId!, workoutData);

    res.status(201).json({
        success: true,
        data: createdWorkout
    })
})
