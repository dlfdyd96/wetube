import routes from "../routes";

export const getJoin = (req, res) => {
    res.render("join");
}
export const postJoin = (req,res) => {
    const {
        body: {name, email, password, password2}
    } = req
    if(password !== password2) {
        res.status(400);
    } else {
        // TO DO : Register User
        // TO Do : Log user In
        res.redirect(routes.home)
    }
    res.render("join");
}
export const postLogin = (req, res) => {
    res.render("login")
}
export const getLogin = (req, res) => {
    res.redirect(routes.home);
}
export const logoutController = (req, res) => {
    //To Do : Process Log Out
    res.redirect(routes.home);
}
export const userDetailController = (req, res) => res.render("userDetail")
export const editProfileController = (req, res) => res.render("editProfile")
export const changePasswordController = (req, res) => res.render("changePassword")