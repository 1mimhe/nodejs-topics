const crypto = require("crypto");
const fs = require("fs");

// 1
const filename = "index.txt";
const md5Sum =  crypto.createHash("md5");
const stream = fs.ReadStream(filename);

// 2
const md5 = require("md5");
let hash2 = '';

stream.on("data", (data) => {
    md5Sum.update(data); // 1
    hash2 += md5(data); // 2
});

stream.on("end", () => {
    const hash1 = md5Sum.digest('hex');

    fs.writeFile("hash1.txt", hash1, (err) => {
        if(err) console.log(err);
    });

    fs.writeFile("hash2.txt", hash2, (err) => {
        if(err) console.log(err);
    });
    // same result
});