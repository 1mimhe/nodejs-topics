// Multer adds a body object and a file or files object to the request object:
// The body object contains the values of the text fields of the form (html form).
// The file or files object contains the files uploaded via the form.
// !!!! Don't forget the enctype="multipart/form-data" in your form.
const multer = require("multer");
const path = require("path");

// By default, each file will be given a random name that doesn't include any file extension.
// The renaming function can be customized according to your needs.
// The disk storage engine gives you full control on storing files to disk.
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const validFormats = [".jpg", ".jpeg", ".png", ".webp"];
        // or file.mimetype => "image/jpg", "image/png",...

        if (validFormats.includes(ext)) {
            const fileName = Date.now() + ext;
            cb(null, fileName);
        } else cb(new Error("Invalid file format."));
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 3_000_000 // bytes
        // fieldNameSize, fieldSize, fields (Max number of non-file fields), files (for multiple forms)
    } // Limits of the uploaded data
});

// we can create multiple instance of multer depending on our needs.
const upload2 = multer({
    dest: './uploads/', // Multer where to upload the files.
    // Format filtering 2:
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            return cb(new Error('File must be a jpg or png file.'));
        }
        cb(undefined, true);
    }, // Function to control which files are accepted
    // preservePath: Keep the full path of files.
});

module.exports = upload;