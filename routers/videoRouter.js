import express from "express";
import routes from "../routes"
import { 
    videoDetailController, 
    editVideoController, 
    deleteVideoController, 
    getUpload,
    postUpload
} from "../controllers/videoController";
import { uploadVideo } from "../middlewares";


const videoRouter = express.Router();

videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);

videoRouter.get(routes.videoDetail(), videoDetailController);
videoRouter.get(routes.editVideo, editVideoController);
videoRouter.get(routes.deleteVideo, deleteVideoController);

export default videoRouter; //export default : 파일로 export한다. 반대는 변수만

