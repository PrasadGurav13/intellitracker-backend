import { Router } from "express";
import { createWorkouts, getWorkoutById, getWorkouts } from "~/controllers";
import { authorizationMiddleware, workoutValidator, } from "~/middleware";
import { validateData } from "~/middleware/validation.middleware";

const workoutRouter = Router();

workoutRouter.use(authorizationMiddleware);

workoutRouter.get("/", getWorkouts );

workoutRouter.post("/", validateData(workoutValidator), createWorkouts );

workoutRouter.get("/:id", getWorkoutById);

export default workoutRouter;