// Authentication is the process of identifying if the user is who they claim they are.
require('dotenv').config();
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const _ = require('lodash');
const validator = require('validator');
const bcrypt = require('bcryptjs');

// checking for environment variable existence.
if (!process.env.JWT_PRIVATE_KEY) {
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

// also, we can use 'pre' middleware to hash password
// this middleware, execute a function before that method called.
userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
});

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.JWT_PRIVATE_KEY);
    // first-arg: payload
    // second-arg: secretOrPrivateKey => will be used for create that digital signature.
    // *** We put secret in an environment variable. We should not store it in our source code.
    // [options]:
    // algorithm (default: HS256) is a symmetric-keyed hashing algorithm that uses one secret key.
    // (Symmetric: means two parties share the secret key.
    // The key is used for both generating the signature and validating it.)
    // expiresIn => 1s, 50d, 2w, 1m, ...
    // notBefore
    // ...
}

const User = mongoose.model('User', userSchema);

// Register User
app.post('/api/register', async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmin: false
    });

    try {
        const result = await user.save();
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

       const token = user.generateAuthToken();
       res.send(token);
       /*
       {
        "_id": ...
        "iat": the time the token was created.
        ?exp: the time the token be expired.
       }
        */
   } catch (e) {
       res.status(500).send(e.message);
   }
});

// Authorization (with middleware)
async function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        req.user = await User.findOne({ _id: decoded._id });
        next();
    } catch (e) {
        res.status(400).send('Invalid token.');
    }
}

app.get('/api/courses', auth, async (req, res) => {
   try {
       await req.user.populate('courses');
       res.send(req.user.courses);
   } catch (e) {
       res.status(500).send();
   }
});

// Role-based Auth
function admin(req, res, next) {
    if (!req.user.isAdmin) return res.status(403).send('Access denied.');

    next();
}

app.delete('/users/:id', auth, admin, async (req, res) => {
   const user = await User.findByIdAndRemove(req.params.id);

   if (!user) return res.status(404);

   res.send(user);
});

app.listen(3000, () => console.log('Connected to port 3000...'));