import { CreateWorkoutInput } from "~/types/workout.type";
import { prisma } from "~/utils/prisma.util"

export const createUserWorkout = async (userId: number, workoutData: CreateWorkoutInput) => {

    if (!userId) {
        throw new Error("User ID is required");
    }

    const createdWorkout = await prisma.workout.create({
        data: {
            userId,
            date: workoutData.date ? new Date(workoutData.date) : new Date(),
            notes: workoutData.notes,
            exercises: {
                create: workoutData.exercises?.map((exercise) => ({
                    exerciseId: exercise.exerciseId,
                    sets: {
                        create: exercise.sets?.map((sets) => ({
                            weightKg: sets.weightKg,
                            reps: sets.reps,
                            durationSec: sets.durationSec
                        }))
                    }
                }))
            }
        },
        include: {
            exercises: {
                include: {
                    sets: true
                }
            }
        }
    });

    return createdWorkout;
}

export const updateUserWorkout = async (
    userId: number,
    workoutId: number,
    workoutData: CreateWorkoutInput
) => {
    if (!userId) {
        throw new Error("User ID is required");
    }

    // Fetch existing workout with only non-deleted children
    const existingWorkout = await prisma.workout.findFirst({
        where: { id: workoutId, userId, isDeleted: false },
        include: {
            exercises: {
                where: { isDeleted: false },
                include: { sets: { where: { isDeleted: false } } }
            }
        }
    });

    if (!existingWorkout) {
        throw new Error("Workout not found");
    }

    const existingExerciseIds = new Set(existingWorkout.exercises.map(e => e.id));
    const existingSetIds = new Set(
        existingWorkout.exercises.flatMap(e => e.sets.map(s => s.id))
    );

    for (const exercise of workoutData.exercises ?? []) {
        if (exercise.id && !existingExerciseIds.has(exercise.id)) {
            throw new Error(`Exercise ${exercise.id} does not belong to this workout`);
        }
        for (const set of exercise.sets ?? []) {
            if (set.id && !existingSetIds.has(set.id)) {
                throw new Error(`Set ${set.id} does not belong to this workout`);
            }
        }
    }

    return prisma.$transaction(async (tx) => {

        await tx.workout.update({
            where: { id: workoutId },
            data: {
                date: workoutData.date ? new Date(workoutData.date) : undefined,
                notes: workoutData.notes
            }
        });

        const keepExerciseIds: number[] = [];

        for (const exercise of workoutData.exercises ?? []) {
            let workoutExerciseId: number;

            if (exercise.id) {
                await tx.workoutExercise.update({
                    where: { id: exercise.id, isDeleted: false },
                    data: { exerciseId: exercise.exerciseId }
                });
                workoutExerciseId = exercise.id;
            } else {
                const created = await tx.workoutExercise.create({
                    data: { workoutId, exerciseId: exercise.exerciseId }
                });
                workoutExerciseId = created.id;
            }

            keepExerciseIds.push(workoutExerciseId);

            const incomingSetIds = exercise.sets
                ?.filter(s => s.id)
                .map(s => s.id!) ?? [];

            await tx.workoutSet.updateMany({
                where: {
                    workoutExerciseId,
                    isDeleted: false,
                    ...(incomingSetIds.length > 0 && { id: { notIn: incomingSetIds } })
                },
                data: { isDeleted: true }
            });

            for (const set of exercise.sets ?? []) {
                if (set.id) {
                    await tx.workoutSet.update({
                        where: { id: set.id, isDeleted: false },
                        data: {
                            weightKg: set.weightKg,
                            reps: set.reps,
                            durationSec: set.durationSec
                        }
                    });
                } else {
                    await tx.workoutSet.create({
                        data: {
                            workoutExerciseId,
                            weightKg: set.weightKg,
                            reps: set.reps,
                            durationSec: set.durationSec
                        }
                    });
                }
            }
        }

        await tx.workoutExercise.updateMany({
            where: {
                workoutId,
                isDeleted: false,
                ...(keepExerciseIds.length > 0 && { id: { notIn: keepExerciseIds } })
            },
            data: { isDeleted: true }
        });

        return tx.workout.findFirst({
            where: { id: workoutId, userId, isDeleted: false },
            include: {
                exercises: {
                    where: { isDeleted: false },
                    include: {
                        exercise: true,
                        sets: { where: { isDeleted: false } }
                    }
                }
            }
        });
    });
};

