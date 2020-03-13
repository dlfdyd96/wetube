import passport from "passport"
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
    res.render("join", { pageTitle: "Join" });
}
export const postJoin = async (req, res, next) => {
    const {
        body: { name, email, password, password2 }
    } = req;
    if (password !== password2) {
        res.status(400);
        res.render("join", { pageTitle: "Join" });
    } else {
        try {
            const user = await User({
                name,
                email
            });
            await User.register(user, password);
            console.log("join은 성공했음.");
            next();
        } catch (err) {
            console.log(err);
            res.redirect(routes.home)
        }
    }
};

export const getLogin = (req, res) => {
    res.render("login", { pageTitle: "Log In" });
}
export const postLogin = passport.authenticate("local", {
    failureRedirect: routes.login,
    successRedirect: routes.home
})

export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = (accessToken, refreshToken, profile, cb) => {
    console.log(accessToken, refreshToken, profile, cb);
}

export const postGithubLogin = (req, res) => {
    res.send(routes.home);
}


export const logoutController = (req, res) => {
    //To Do : Process Log Out
    req.logout();
    res.redirect(routes.home);
}
export const userDetailController = (req, res) => res.render("userDetail")
export const editProfileController = (req, res) => res.render("editProfile")
export const changePasswordController = (req, res) => res.render("changePassword")