// Authentication is the process of identifying if the user is who they claim they are.

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const _ = require('lodash');

const User = mongoose.model('User', {
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
            validator: (v) => Joi.isEmail(v),
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
    }
});

// Register User
app.post('/api/users', async (req, res) => {
    let user = await User.find({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    // salt: is a random string that added before or after the password.
    // first argument: number of rounds to use, defaults to 10 if omitted.
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const result = await user.save();
        res.send(_.pick(result, ['_id', 'name', 'email']));
    } catch (e) {
        res.status(500).send(e);
    }
});

// Authentication
app.post('/api/auth', async (req, res) => {
   try {
       const user = await User.find({ email: req.body.email });
       if (!user) return res.status(400).send('Invalid email or password.');

       const validPassword = await bcrypt.compare(req.body.password, user.password);
       if (!validPassword) return res.status(400).send('Invalid email or password.');

       res.send(true);
   } catch (e) {
       res.status(500).send();
   }
});
