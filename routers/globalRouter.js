import express from "express";
import passport from "passport";
import routes from "../routes";
import { homeController, searchController } from "../controllers/videoController";
import { getJoin, postJoin, logoutController, postLogin, getLogin, githubLogin, postGithubLogin } from "../controllers/userController";
import { onlyPublic, onlyPrivate } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, homeController);
globalRouter.get(routes.search, searchController);
globalRouter.get(routes.logout, logoutController);

globalRouter.get(routes.github, githubLogin);
globalRouter.get(routes.githubCallback, passport.authenticate('github', { failureRedirect: '/login' }), postGithubLogin);

export default globalRouter; //export default : 파일로 export한다. 반대는 변수만

