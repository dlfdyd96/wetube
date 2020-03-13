import passport from "passport"
import routes from "../routes";
import User from "../models/User";
import { urlencoded } from "body-parser";

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
export const githubLoginCallback = async (_, __, profile, cb) => {
    const {
        _json: { id, avatar_url, name, email }
    } = profile;
    try {
        const user = await User.findOne({ email });
        if (user) {
            user.githubId = id;  // 갱신
            user.save();
            console.log("찾았다.", user);
            return cb(null, user);  // (null : no error, user: cookie 넣을 거)
        }
        const newUser = await User.create({
            email,
            name,
            githubId: id,
            avatarUrl: avatar_url
        });
        console.log("이제 cb newUser할 꺼야");
        return cb(null, newUser);
    } catch (err) {
        console.log("ㅠㅠ 여기네");
        console.log(err);
        return cb(err);
    }
}
export const postGithubLogin = (req, res) => {  //성공했을때
    res.redirect(routes.home);
}

export const facebookLogin = passport.authenticate("facebook");
export const facebookCallback = async (_, __, profile, cb) => {
    const { _json: { id, name, email } } = profile;
    try {
        const user = await User.findOne({ email });
        if (user) {
            user.facebookId = id;  // 갱신
            user.avatarUrl = `https://graph.facebook.com/${id}/pciture?type=large`;
            user.save();
            console.log("찾았다.", user);
            return cb(null, user);  // (null : no error, user: cookie 넣을 거)
        }
        const newUser = await User.create({
            email,
            name,
            facebookId: id,
            avatarUrl: `https://graph.facebook.com/${id}/pciture?type=large`
        });
        return cb(null, newUser);
    } catch (err) {
        console.log(err);
        return cb(err);
    }
}
export const postFacebookLogin = (req, res) => {
    res.redirect(routes.home);
}

export const logoutController = (req, res) => {
    //To Do : Process Log Out
    req.logout();
    res.redirect(routes.home);
}

export const getMe = (req, res) => {
    res.render("userDetail", { pageTitle: "User Detail", user: req.user });
}

export const userDetailController = async (req, res) => {
    const { params: { id } } = req;
    try {
        const user = await User.findById(id);
        res.render("userDetail", { pageTitle: "User Detail", user });
    } catch (err) {
        console.log(err);
        res.redirect(routes.home);
    }
}
export const getEditProfile = (req, res) => res.render("editProfile", { pageTitle: "Edit Profile" });
export const postEditProfile = async (req, res) => {
    const {
        body: { name, email },
        file
    } = req;
    try {
        await User.findByIdAndUpdate(req.user.id, {
            name,
            email,
            avatarUrl: file ? file.path : req.user.avatarUrl
        });
        res.redirect(routes.me);
    } catch (error) {
        res.redirect(routes.editProfile);
    }
};

export const getChangePassword = (req, res) =>
    res.render("changePassword", { pageTitle: "Change Password" });

export const postChangePassword = async (req, res) => {
    const {
        body: { oldPassword, newPassword, newPassword1 }
    } = req;
    try {
        if (newPassword !== newPassword1) {
            res.status(400);
            res.redirect(`/users/${routes.changePassword}`);
            return;
        }
        await req.user.changePassword(oldPassword, newPassword);
        res.redirect(routes.me);
    } catch (error) {
        res.status(400);
        console.log('cant change password')
        res.redirect(`/users/${routes.changePassword}`);
    }
};