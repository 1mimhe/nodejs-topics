const express = require('express');
const app = express();
const mongoose = require('mongoose');
const upload = require("./middlewares/multer");
const sharp = require('sharp');

// mongoose.connect('mongodb://127.0.0.1:27017/test')
//     .then(() => console.log("Connected to MongoDB."));
//
// const User = mongoose.model('User', new mongoose.Schema({
//     name: String,
//     avatar: Buffer
// }));

app.use(express.static("uploads"));

// upload.single(): Accept a single file with the name fieldname (the field in html form).
app.post('/users/me/avatar', upload.single('avatar'), async (req, res) => {
    // const standardBuffer =
    //     await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();

    // our file, encode to binary data.
    // req.file is the `avatar` file => When the destination is not set, we can use it.
    // req.body will hold the text fields if there were any.

    res.send(req.file);
    // {
    //     "fieldname": "avatar",
    //     "originalname": "URL.png",
    //     "encoding": "7bit",
    //     "mimetype": "image/png",
    //     "destination": "./uploads/",
    //     "filename": "485553ef404ef1d4418a3d823b532cf0",
    //     "path": "uploads\\485553ef404ef1d4418a3d823b532cf0",
    //     "size": 24253
    // }
});

// upload.array(): Accept an array of files, all with the name fieldname.
app.post('/me/photos', upload.array('photos', 12), function (req, res, next) {
    // req.files is array of `photos` files
    res.send(req.files);
    // [
    //     {
    //         "fieldname": "photos",
    //         "originalname": "URL.png",
    //         "encoding": "7bit",
    //         "mimetype": "image/png",
    //         "destination": "uploads",
    //         "filename": "1711313941437.png",
    //         "path": "uploads\\1711313941437.png",
    //         "size": 24253
    //     },
    //     {
    //         "fieldname": "photos",
    //         "originalname": "SQL_vs_NoSQL.png",
    //         "encoding": "7bit",
    //         "mimetype": "image/png",
    //         "destination": "uploads",
    //         "filename": "1711313941440.png",
    //         "path": "uploads\\1711313941440.png",
    //         "size": 315234
    //     }
    // ]
});

// upload.fields(): Accept a mix of files
app.post("/me/form", upload.fields([
    {name: "image", maxCount: 1},
    {name: "file", maxCount: 3}
]), (req, res) => {
   res.send(req.files);
   // {
    //     "image": [
    //         {
    //             "fieldname": "image",
    //             "originalname": "SQL_vs_NoSQL.png",
    //             "encoding": "7bit",
    //             "mimetype": "image/png",
    //             "destination": "uploads",
    //             "filename": "1711314582763.png",
    //             "path": "uploads\\1711314582763.png",
    //             "size": 315234
    //         }
    //     ],
    //     "file": [
    //         {
    //             "fieldname": "file",
    //             "originalname": "04 NPM Recap.pdf",
    //             "encoding": "7bit",
    //             "mimetype": "application/pdf",
    //             "destination": "uploads",
    //             "filename": "1711314582770.pdf",
    //             "path": "uploads\\1711314582770.pdf",
    //             "size": 35881
    //         }
    //     ]
    // }
});

// also we have upload.any() and upload.none().

app.use((err, req, res, next) => {
    return res.json({
        statusCode: err.status || 500,
        error: {
            message: err.message || "internalServerError",
            invalidParams: err.error
        }
    });
});

app.listen(3000, () => console.log("Connected to port 3000."));