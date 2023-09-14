// Authentication is the process of identifying if the user is who they claim they are.
const config = require('config');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const _ = require('lodash');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const {MongoCursorInUseError} = require("mongodb");

// checking for environment variable existence
if (!config.get('jwtPrivateKey')) {
    throw new Error('jwtPrivateKey is not defined.');
}

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/auth')
    .then(() => console.log('Connected to MongoDB...'))
    .catch((e) => console.log(e.message));

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30,
        trim: true,
        set: (v) => v[0].toUpperCase() + v.slice(1)
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (v) => validator.isEmail(v),
            message: "Your email is not valid."
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate: [{
            validator: (v) => !/.* .*/.test(v),
            message: "Your password is not valid."
        }, {
            validator: (v) => validator.isStrongPassword(v),
            message: "Your password is not strong enough."
        }]
    },
    // Role-based Auth
    isAdmin: Boolean
    // roles: []
    // operations: []
});

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
}

const User = mongoose.model('User', userSchema);

// Register User
app.post('/api/register', async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    // salt: is a random string that added before or after the password.
    // first argument: number of rounds to use, defaults to 10 if omitted.
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        isAdmin: false
    });

    try {
        const result = await user.save();
        // const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));
        const token = user.generateAuthToken();
        res.header('x-auth-token', token).send(_.pick(result, ['_id', 'name', 'email']));
        // An HTTP header is a field of an HTTP request or response
        // that passes additional context and metadata about the request or response.
        // like Age, Location or Server, ...
    } catch (e) {
        res.status(500).send(e);
    }
});

// Authentication
app.post('/api/auth', async (req, res) => {
   try {
       const user = await User.findOne({ email: req.body.email });
       if (!user) return res.status(400).send('Invalid email or password.');

       const validPassword = await bcrypt.compare(req.body.password, user.password);
       if (!validPassword) return res.status(400).send('Invalid email or password.');

       // first-arg: payload
       // second-arg: secretOrPrivateKey => will be used for create that digital signature.
       // *** We put secret in an environment variable. We should not store it in our source code.
       // const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));
       const token = user.generateAuthToken();
       res.send(token);
       /*
       token:
       {
        "_id": ...
        "iat": the time the token was created.
       }
        */
   } catch (e) {
       res.status(500).send(e.message);
   }
});

// Authorization (with middleware)
function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).send('Invalid token.');
    }
}

app.get('/api/users', auth, async (req, res) => {
   const users = await User.find({});
   if (!users.length) return res.status(404).send();

   res.send(users);
});

// Role-based Auth
function admin(req, res, next) {
    if (!req.user.isAdmin) return res.status(403).send('Access denied.');

    next();
}

app.delete('/:id', auth, admin, async (req, res) => {
   const user = await User.findByIdAndRemove(req.body._id);

   if (!user) return res.status(404);

   res.send(user);
});

app.listen(3000, () => console.log('Connected to port 3000...'));