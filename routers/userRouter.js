import express from "express";
import routes from "../routes";
import {
    changePasswordController,
    userDetailController,
    getEditProfile,
    postEditProfile
} from "../controllers/userController";
import { onlyPrivate, uploadAvatar } from "../middlewares";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);

userRouter.get(routes.changePassword, onlyPrivate, changePasswordController);

userRouter.get(routes.userDetail(), userDetailController);

export default userRouter;

