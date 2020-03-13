import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos/" })

export const localMiddleware = (req, res, next) => {
    res.locals.siteName = "WeTube";
    res.locals.routes = routes;
    res.locals.user = req.user || null; //빈 obj
    console.log(res.locals.user)
    next();
};

export const onlyPublic = (req, res, next) => {
    console.log("Only Public")
    if (req.user) {
        console.log("Only Public - redirect")
        res.redirect(routes.home);
    }
    next();
}

export const onlyPrivate = (req, res, next) => {
    console.log("OnlyPrivate")
    if (req.user) {
        next();
    }
    console.log("Only privte - redirect")
    res.redirect(routes.home);
}


export const uploadVideo = multerVideo.single("videoFile");