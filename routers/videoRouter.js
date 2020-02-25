import express from "express";
import routes from "../routes"
import { 
    uploadController, 
    videosDetailController, 
    editVideoController, 
    deleteVideoController 
} from "../controllers/videoController";


const videoRouter = express.Router();

videoRouter.get(routes.upload, uploadController);
videoRouter.get(routes.videosDetail(), videosDetailController);
videoRouter.get(routes.editVideo, editVideoController);
videoRouter.get(routes.deleteVideo, deleteVideoController);

export default videoRouter; //export default : 파일로 export한다. 반대는 변수만

