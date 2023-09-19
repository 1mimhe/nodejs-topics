const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');
const sharp = require('sharp');

/////////////////////////////////////////////
mongoose.connect('mongodb://127.0.0.1:27017/test');

const User = mongoose.model('User', new mongoose.Schema({
    name: String,
    avatar: Buffer
}));
////////////////////////////////////////////

// Multer adds a body object and a file or files object to the request object:
// The body object contains the values of the text fields of the form (html form).
// The file or files object contains the files uploaded via the form.

// !!!! Don't forget the enctype="multipart/form-data" in your form.

// we can create multiple instance of multer depending on our needs.
const upload = multer({
   // dest: './uploads/', // Multer where to upload the files.
    limits: {
        fileSize: 3_000_000 // bytes
        // fieldNameSize, fieldSize, fields (Max number of non-file fields), files (for multiple forms)
    }, // Limits of the uploaded data
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            return cb(new Error('File must be a jpg or png file.')); // By default, error will be returned as an html page.
        }

        cb(undefined, true);
    }, // Function to control which files are accepted
    // preservePath: Keep the full path of files instead of just the base name
});

// By default, Multer will rename the files to avoid naming conflicts.
// The renaming function can be customized according to your needs.

// upload.single(): Accept a single file with the name fieldname (the field in html form).
app.post('/users/me/avatar', upload.single('avatar'), async (req, res) => {
    const user = new User({ name: 'Mammad' });
    const standardBuffer =
        await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();

    // our file, encode to binary data.
    // req.file is the `avatar` file => When the destination is not set, we can use it.
    // req.body will hold the text fields if there were any.

    // user.avatar = req.file.buffer;
    user.avatar = standardBuffer;
    await user.save();
    res.send(); // status: 200 OK

    // Error Handling:
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
});

// upload.array(): Accept an array of files, all with the name fieldname.
// Optionally error out if more than maxCount files are uploaded.
app.post('/me/photos', upload.array('photos', 12), function (req, res, next) {
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
    res.send();
});

// Serving up files
app.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user || !user.avatar) {
            return res.send(new Error());
        }

        res.set('Content-Type', 'image/png'); // set response header
        res.send(user.avatar);
    } catch (e) {
        res.status(404).send();
    }
});

app.listen(3000);