import express from "express";
import routes from "../routes";
import { 
    editProfileController, 
    changePasswordController, 
    userDetailController 
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get(routes.editProfile, editProfileController);
userRouter.get(routes.changePassword, changePasswordController);
userRouter.get(routes.userDetail, userDetailController);

export default userRouter;

