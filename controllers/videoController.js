import routes from '../routes';
import Video from '../models/Video';

export const homeController = async (req,res) => {
    try {
        const videos = await Video.find({});
        res.render("home", { pageTitle: "Home", videos});
    } catch(error) {
        console.log(error);
        res.render("home", { pageTitle: "Home", videos: []});
    }
}
export const searchController = (req,res) => {
    const {query: { term: searchingBy }} = req;
    res.render("Search", { pageTitle: "Search", searchingBy, videos });
}
export const getUpload = (req,res) => {
    res.render("upload", { pageTitle: "Upload"})
};
export const postUpload = async (req,res) => {
    
    const {
        body : { title, description },
        file : { path }
    } = req;

    const newVideo = await Video.create({
        fileUrl : path,
        title,
        description
    });
    console.log(newVideo)
    // To Do : Upload and save Video
    res.redirect(routes.videoDetail(newVideo.id));
    
};
export const videoDetailController = (req,res) => res.render("videoDetail", { pageTitle: "Video Detail"});
export const editVideoController = (req,res) => res.render("editVideo", { pageTitle: "Edit Video"});
export const deleteVideoController = (req,res) => res.render("deleteVideo", { pageTitle: "Delete Video"});
