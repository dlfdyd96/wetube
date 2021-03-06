import express from "express";
import routes from "../src/routes";
import {
  userDetail,
  getEditProfile,
  getChangePassword,
  postEditProfile,
  postChangePassword
} from "../src/controllers/userController";
import { onlyPrivate, uploadAvatar } from "../src/middlewares";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);

userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
