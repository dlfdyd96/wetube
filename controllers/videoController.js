export const homeController = (req,res) => res.render("home", { pageTitle: "Home"});
export const searchController = (req,res) => res.render("Search", { pageTitle: "Search"});
export const uploadController = (req,res) => res.render("upload", { pageTitle: "Upload"});
export const videosDetailController = (req,res) => res.render("videosDetail", { pageTitle: "Video Detail"});
export const editVideoController = (req,res) => res.render("editVideo", { pageTitle: "Edit Video"});
export const deleteVideoController = (req,res) => res.render("deleteVideo", { pageTitle: "Delete Video"});
