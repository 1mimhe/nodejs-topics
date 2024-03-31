// we have different strategies to authenticate requests => https://www.passportjs.org/packages/
// here we use local strategy.
const {Strategy: LocalStrategy} = require("passport-local");
const User = require("./user.model");
const bcrypt = require("bcryptjs");

function passportInit(passport) {
    // done(error, user[if doesn't exist, set false.], options);
    const authenticateUser = async (username, password, done) => {
        try {
            const user = await userModel.findOne({username});
            if (!user) return done(null, false, {message: "Not found user account."});
            if (bcrypt.compareSync(password, user.password)) {
                return done(null, user);
            }
            return done(null, false, {message: "Username or Password is incorrect."});
        } catch (error) {
            done(error)
        }
    }

    // what is username/password field name? and verify callback function.
    const localStrategy = new LocalStrategy({usernameField: "username", passwordField: "password"}, authenticateUser);
    // the authenticated user must be serialized to the session, and deserialized when subsequent requests are made.
    const serializeUser = passport.serializeUser((user, done) => {
        return done(null, user.id);
    });

    const deserializeUser = passport.deserializeUser(async (id, done) => {
        const user = await User.findOne({_id: id});
        if (!user) return done(null, false, {message: "Not found user account."});
        return done(null, user);
    });

    // set the name of our strategy, ...
    passport.use("local", localStrategy, serializeUser, deserializeUser);
}

module.exports = passportInit;