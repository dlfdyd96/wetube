import routes from '../routes';
import Video from '../models/Video';

// Home
export const homeController = async (req,res) => {
    try {
        const videos = await Video.find({});
        res.render("home", { pageTitle: "Home", videos});
    } catch(error) {
        console.log(error);
        res.render("home", { pageTitle: "Home", videos: []});
    }
}

// Search
export const searchController = (req,res) => {
    const {query: { term: searchingBy }} = req;
    res.render("Search", { pageTitle: "Search", searchingBy, videos });
}

// Upload
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

// Detail
export const videoDetailController = async (req,res) => {
    const {
        params: {id}
    } = req;
    try {
        const video = await Video.findById(id);
        res.render("videoDetail", { pageTitle: "Video Detail", video});
    } catch(err) {
        console.log(err)
        res.redirect(routes.home)
    }
    
}

// Edit 
export const getEditVideo = async (req,res) => {
    const {
        params : { id }
    } = req;

    try {
        const video = await Video.findById(id)
        res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });;
    } catch(err) {
        res.redirect(routes.home)
    }
}
export const postEditVideo = async (req,res) => {  
    const {
        params : { id },
        body : { title, description }
    } = req;

    try {
        await Video.findOneAndUpdate({ _id: id }, { title, description })
        res.redirect(routes.videoDetail(id));
    } catch(err) {
        res.redirect(routes.home)
    }
};

export const deleteVideoController = (req,res) => res.render("deleteVideo", { pageTitle: "Delete Video"});
