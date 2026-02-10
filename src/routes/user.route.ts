import { Router } from "express";
import { authorizationMiddleware, getUserProfile } from "~/middleware";
import { validateData } from "~/middleware/validation.middleware";

const userRouter = Router();

userRouter.use(authorizationMiddleware);

userRouter.get("/profile", validateData(getUserProfile),  )

export default userRouter;