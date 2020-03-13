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
import { uploadVideo, onlyPrivate } from "../middlewares";


const videoRouter = express.Router();

//upload
videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);

//edit
videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);

//detail
videoRouter.get(routes.videoDetail(), videoDetailController);

// delete
videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideoController);

export default videoRouter; //export default : 파일로 export한다. 반대는 변수만

