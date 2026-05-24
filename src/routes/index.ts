import { Router } from "express";
import authRouter from "./auth.route";
import userRouter from "./user.route";
import exerciseRouter from "./excersise.route";

const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/user", userRouter)
rootRouter.use("/exercise", exerciseRouter)

export default rootRouter;