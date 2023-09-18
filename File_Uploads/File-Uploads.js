const express = require('express');
const app = express();
const multer = require('multer');

// Multer adds a body object and a file or files object to the request object:
// The body object contains the values of the text fields of the form (html form).
// The file or files object contains the files uploaded via the form.

// !!!! Don't forget the enctype="multipart/form-data" in your form.

// we can create multiple instance of multer depending on our needs.
const upload = multer({
    dest: 'avatars', // Multer where to upload the files.

    limits: {
        fileSize: 1_000_000 // bytes
        // fieldNameSize, fieldSize, fields (Max number of non-file fields), files (for multiple forms)
    }, // Limits of the uploaded data
    fileFilter(req, file, cb) {
        if (!file.originalname.endsWith('.jpg')) {
            cb(new Error('File must be an jpg file.'));
        }

        cb(undefined, true);
    },
    // fileFilter: Function to control which files are accepted
    // preservePath: Keep the full path of files instead of just the base name
});

// By default, Multer will rename the files to avoid naming conflicts.
// The renaming function can be customized according to your needs.

// upload.single(): Accept a single file with the name fieldname (the field in html form).
app.post('/users/me/avatar', upload.single('avatar'), (req, res) => {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    res.send(); // status: 200 OK
});