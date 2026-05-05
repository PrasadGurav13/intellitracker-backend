import { Router } from "express";
import { loginController, signupController } from "~/controllers";
import { loginValidator, signupValidator } from "~/middleware";
import { validateData } from "~/middleware/validation.middleware";


const authRouter = Router();

authRouter.post("/login", validateData(loginValidator), loginController);

authRouter.post("/signup", validateData(signupValidator), signupController);

export default authRouter;