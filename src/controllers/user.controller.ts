import { Response } from "express";
import { authRequest } from "~/middleware";
import { catchAsync } from "~/utils/catchAsync.util";

export const userProfileController = catchAsync(async (req: authRequest, res: Response) => {
    const userid = req.user?.id;
    
    const userData = 
}) 