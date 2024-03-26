const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(fileUpload({abortOnLimit: true, limits: {fileSize: 3_000_000}}));

app.post("/upload-buffer", (req, res) => {
    // just handle one file with the field name "image".
    const image = req.files.image;
    const ext = path.extname(image.name);
    const destPath = path.join(__dirname, "uploads", Date.now() + ext);

    const buffer = Buffer.from(image.data);
    fs.writeFileSync(destPath, buffer);
    res.send(req.files);
    // {
    //     "image": {
    //         "name": "SQL_vs_NoSQL.png",
    //         "data": {
    //             "type": "Buffer",
    //             "data": [Array of Buffers]
    //         },
    //         "size": 315234,
    //         "encoding": "7bit",
    //         "tempFilePath": "",
    //         "truncated": false,
    //         "mimetype": "image/png",
    //         "md5": "64b178a9a1a2f9e8f1d4128301bcea5e"
    //     }
    // }
});

app.post("/upload-mv", async (req, res) => {
    // for-loop for multiple files.
    for (const key in req.files) {
        let file = req.files[key];
        const ext = path.extname(file.name);
        const destPath = path.join("uploads", Date.now() + ext);

        await new Promise((resolve, reject) => {
            file.mv(destPath, (err) => {
                if (err) reject(err);
                else resolve(true);
            });
        });
    }
    res.send(req.files);
    // {
    //     "image": {
    //         "name": "SQL_vs_NoSQL.png",
    //         "data": {
    //             "type": "Buffer",
    //             "data": [Array of Buffers]
    //         },
    //         "size": 315234,
    //         "encoding": "7bit",
    //         "tempFilePath": "",
    //         "truncated": false,
    //         "mimetype": "image/png",
    //         "md5": "64b178a9a1a2f9e8f1d4128301bcea5e"
    //     },
    //     "file": {
    //         "name": "04 NPM Recap.pdf",
    //         "data": {
    //             "type": "Buffer",
    //             "data": [Array of Buffers]
    //         },
    //         "size": 35881,
    //         "encoding": "7bit",
    //         "tempFilePath": "",
    //         "truncated": false,
    //         "mimetype": "application/pdf",
    //         "md5": "756d9ae2f581c949d1475d998c7d3241"
    //     }
    // }
});

app.listen(3000, () => {
    console.log("Server run on port 3000.");
});