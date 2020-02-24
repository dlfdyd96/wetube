import express from "express";
import routes from "../routes";
import { homeController, searchController } from "../controllers/videoController";
import { joinController, loginController, logoutController } from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get(routes.home, homeController);
globalRouter.get(routes.search, searchController);
globalRouter.get(routes.join, joinController);
globalRouter.get(routes.login, loginController);
globalRouter.get(routes.logout, logoutController);

export default globalRouter; //export default : 파일로 export한다. 반대는 변수만

