// for users are authenticated but want login or register.
function redirectIfIsAuth(req, res, next) {
    // passport adds req.isAuthenticated() method.
    if (req.isAuthenticated()) return res.redirect("/profile");
    next();
}

// for users want to send request for routes that require auth.
function checkAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}

module.exports = {
    redirectIfIsAuth,
    checkAuth
}