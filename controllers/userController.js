import passport from "passport"
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
    res.render("join");
}
export const postJoin = async (req, res, next) => {
    const {
        body: { name, email, password, password2 }
    } = req
    if (password !== password2) {
        res.status(400);
    } else {
        try {
            const user = await User({
                name,
                email
            });
            await User.register(user, password);
            next();
        } catch (err) {
            console.log(err);
            res.redirect(routes.home)
        }
        // TO Do : Log user In
    }
    res.render("join");
}

export const getLogin = (req, res) => {
    res.redirect(routes.home);

}
export const postLogin = passport.authenticate('local', {
    failureRedirect: routes.login,
    successRedirect: routes.home
})
export const logoutController = (req, res) => {
    //To Do : Process Log Out
    res.redirect(routes.home);
}
export const userDetailController = (req, res) => res.render("userDetail")
export const editProfileController = (req, res) => res.render("editProfile")
export const changePasswordController = (req, res) => res.render("changePassword")