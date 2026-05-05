import { Router } from "express";
import { getUser } from "~/controllers";
import { authorizationMiddleware, getUserProfile, updateUser } from "~/middleware";
import { validateData } from "~/middleware/validation.middleware";

const userRouter = Router();

userRouter.use(authorizationMiddleware);

userRouter.get("/me", getUser );

userRouter.patch("/me", validateData(updateUser), )

export default userRouter;