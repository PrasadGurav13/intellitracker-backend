import { Router } from "express";
import { createExercise, getExercises } from "~/controllers";
import { authorizationMiddleware, exerciseValidator, } from "~/middleware";
import { validateData } from "~/middleware/validation.middleware";

const exerciseRouter = Router();

exerciseRouter.use(authorizationMiddleware);

exerciseRouter.get("/", getExercises );

exerciseRouter.post("/", validateData(exerciseValidator), createExercise );

export default exerciseRouter;