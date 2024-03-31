const {checkAuth, redirectIfIsAuth} = require("./auth.middleware");
const router = require("express").Router();
const User = require("./user.model");
const bcrypt = require("bcryptjs");

function initRouter(passport) {
    router.get("/",(req, res) => {
        res.send("Main Page");
    });

    router.get("/profile", checkAuth, (req, res) => {
        // passport adds req.user property.
        res.send(req.user);
    });

    router.post("/register", redirectIfIsAuth, async (req, res) => {
        try {
            const {fullName, username, password} = req.body;
            const hashPassword = bcrypt.hashSync(password, 10);

            const user = await User.findOne({username});
            if(user) {
                const referer = req.headers.referer; // the address of the web page which the resource has been requested.
                // error
                console.log(user, referer);
                return res.redirect(307, referer ?? "/register");
            }

            const newUser = await User.create({
                fullName,
                username,
                password: hashPassword
            });

            // res.redirect("/login");
            // or
            req.logIn(newUser, (err) => {
                if (err) return console.log(err);
                res.redirect("/profile");
            });
        } catch (error) {
            console.log(error);
        }
    });

    // passport.authenticate(nameOfSession, options)
    router.post("/login", redirectIfIsAuth, passport.authenticate("local", {
        successRedirect: "/profile", // redirect to which route if auth is successful?
        failureRedirect: "/login", // redirect to which route if auth is failed?
        failureFlash: true // we can use the message we set.
    }));

    router.post("/logout", checkAuth, (req, res) => {
        // passport adds req.logOut() method.
        req.logOut({keepSessionInfo: false}, (err) => {
            if (err) console.log(err);
            res.redirect("/");
        });
    });

    return router;
}

module.exports = initRouter;