import express from "express";
import routes from "../routes";
import { homeController, searchController } from "../controllers/videoController";
import { getJoin, postJoin, logoutController, postLogin, getLogin } from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin, postLogin);

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.home, homeController);
globalRouter.get(routes.search, searchController);
globalRouter.get(routes.logout, logoutController);

export default globalRouter; //export default : 파일로 export한다. 반대는 변수만

