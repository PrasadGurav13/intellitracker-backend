import { Router } from "express";
import { createProfile, deleteUser, getUser, updateUser } from "~/controllers";
import { authorizationMiddleware, userProfileValidator, getUserValidator, updateUserValidator } from "~/middleware";
import { validateData } from "~/middleware/validation.middleware";

const userRouter = Router();

userRouter.use(authorizationMiddleware);

userRouter.get("/me", validateData(getUserValidator), getUser );

userRouter.patch("/me", validateData(updateUserValidator), updateUser);

userRouter.delete("/me", deleteUser);

// User Profile Routes

userRouter.post("/me/profile", validateData(userProfileValidator), createProfile );

userRouter.patch("/me/profile", validateData(userProfileValidator), updateProfile );

export default userRouter;