import { Router } from "express";
import authRouter from "./auth.route";
import userRouter from "./user.route";
import exerciseRouter from "./excersise.route";
import workoutRouter from "./workout.route";

const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/user", userRouter)
rootRouter.use("/exercise", exerciseRouter)
rootRouter.use("/workout", workoutRouter)

export default rootRouter;