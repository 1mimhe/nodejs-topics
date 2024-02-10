const fs = require('fs');

// read
// non-blocking (Async)
fs.readFile("file1.txt", (err, data) => {
   if (err) console.log(err);
   else console.log(data.toString());
});

// blocking (Sync)
const data = fs.readFileSync("file1.txt");
if (data) console.log(data.toString());

// write
fs.writeFile("newFile.txt", "data", /* option: {flags: "a"} => append */(err) => {
    if (err) console.log(err);
    else console.log("Wrote into file.");
});

// append
// fs.appendFile(...);

// delete
fs.unlink("z.txt", (err) => {
    if (err) console.log(err);
});

// exists
fs.existsSync("Http_Module.js"); // true

// make directory (folder)
fs.mkdir("kio/mio", {recursive: true}, (err) => {
    if (err) console.log(err);
});
// recursive: true => doesn't log err if dir has exist.

// read directory
fs.readdir('./', (err, files) => {
    if (err) console.log(err);
    else console.log(files);
});