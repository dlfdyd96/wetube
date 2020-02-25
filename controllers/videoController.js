import {videos} from '../db'

export const homeController = (req,res) => {
    res.render("home", { pageTitle: "Home", videos});
}
export const searchController = (req,res) => {
    const {query: { term: searchingBy }} = req;
    res.render("Search", { pageTitle: "Search", searchingBy, videos });
}
export const uploadController = (req,res) => res.render("upload", { pageTitle: "Upload"});
export const videosDetailController = (req,res) => res.render("videosDetail", { pageTitle: "Video Detail"});
export const editVideoController = (req,res) => res.render("editVideo", { pageTitle: "Edit Video"});
export const deleteVideoController = (req,res) => res.render("deleteVideo", { pageTitle: "Delete Video"});
