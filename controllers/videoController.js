import routes from '../routes';
import Video from '../models/Video';

// Home
export const homeController = async (req, res) => {
    try {
        const videos = await Video.find({}).sort({ '_id': -1 });
        res.render("home", { pageTitle: "Home", videos });
    } catch (error) {
        console.log(error);
        res.render("home", { pageTitle: "Home", videos: [] });
    }
}

// Search
export const searchController = async (req, res) => {
    const { query: { term: searchingBy } } = req;
    let videos = [];
    try {
        videos = await Video.find({
            title: {
                $regex: searchingBy, $options: "i"
            }
        })
    } catch (err) {
        console.log(err)
    }
    res.render("Search", { pageTitle: "Search", searchingBy, videos });
}

// Upload
export const getUpload = (req, res) => {
    res.render("upload", { pageTitle: "Upload" })
};
export const postUpload = async (req, res) => {

    const {
        body: { title, description },
        file: { path }
    } = req;

    const newVideo = await Video.create({
        fileUrl: path,
        title,
        description,
        creator: req.user.id
    });
    req.user.videos.push(newVideo.id);
    req.user.save();
    console.log(newVideo)
    // To Do : Upload and save Video
    res.redirect(routes.videoDetail(newVideo.id));

};

// Detail
export const videoDetailController = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        const video = await Video.findById(id).populate('creator');
        console.log(video);
        res.render("videoDetail", { pageTitle: video.title, video });
    } catch (err) {
        console.log(err)
        res.redirect(routes.home)
    }
};

// Edit 
export const getEditVideo = async (req, res) => {
    const {
        params: { id }
    } = req;

    try {
        const video = await Video.findById(id)
        res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });;
    } catch (err) {
        res.redirect(routes.home)
    }
}
export const postEditVideo = async (req, res) => {
    const {
        params: { id },
        body: { title, description }
    } = req;

    try {
        await Video.findOneAndUpdate({ _id: id }, { title, description })
        res.redirect(routes.videoDetail(id));
    } catch (err) {
        res.redirect(routes.home)
    }
};

export const deleteVideoController = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        await Video.findOneAndRemove({ _id: id });
    } catch (err) {
        console.log(err);
    }
    res.redirect(routes.home);
};
