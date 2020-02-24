import express from "express";
import routes from "../routes";
import { 
    joinController, 
    loginController, 
    logoutController, 
    usersController, 
    editProfileController, 
    changePasswordController, 
    userDetailController 
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get(routes.join, joinController);
userRouter.get(routes.login, loginController);
userRouter.get(routes.logout, logoutController);
userRouter.get(routes.users, usersController);
userRouter.get(routes.userDetail, userDetailController);
userRouter.get(routes.editProfile, editProfileController);
userRouter.get(routes.changePassword, changePasswordController);

export default userRouter;

