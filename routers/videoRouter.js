import express from "express";
import routes from "../routes"
import { 
    videoDetailController, 
    deleteVideoController, 
    getUpload,
    postUpload,
    getEditVideo,
    postEditVideo
} from "../controllers/videoController";
import { uploadVideo } from "../middlewares";


const videoRouter = express.Router();

//upload
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);

//edit
videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo);

//detail
videoRouter.get(routes.videoDetail(), videoDetailController);

// delete
videoRouter.get(routes.deleteVideo(), deleteVideoController);

export default videoRouter; //export default : 파일로 export한다. 반대는 변수만

