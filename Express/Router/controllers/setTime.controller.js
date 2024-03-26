
function setTime(req, res, next) {
    req.time = Date.now();
    next();
}

module.exports = setTime;