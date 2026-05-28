import { Router } from "express";
import { createWorkouts, getWorkoutById, getWorkouts, updateWorkouts } from "~/controllers";
import { authorizationMiddleware, createWorkoutValidator, updateWorkoutValidator, } from "~/middleware";
import { validateData } from "~/middleware/validation.middleware";

const workoutRouter = Router();

workoutRouter.use(authorizationMiddleware);

workoutRouter.get("/", getWorkouts );

workoutRouter.post("/", validateData(createWorkoutValidator), createWorkouts );

workoutRouter.get("/:id", getWorkoutById);

workoutRouter.patch("/:id", validateData(updateWorkoutValidator), updateWorkouts );

export default workoutRouter;