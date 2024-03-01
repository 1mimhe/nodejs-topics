const fs = require("fs");
const readStreamData = fs.createReadStream("./read.txt", /*"utf-8"*/);
const writeStreamData = fs.createWriteStream("./write-pipe.txt");

// The readable.pipe() method attaches a Writable stream to the Readable,
// causing it to switch automatically into flowing mode and push all of its data to the attached Writable.
readStreamData.pipe(writeStreamData);
// It is possible to attach multiple Writable streams to a single Readable stream.

// Example in http module
const http = require('http');

// http.createServer((req, res) => {
//     const readable = fs.createReadStream('./read.txt');
//     res.writeHead(200, {'Content-type': 'text/plain'});
//
//     readable.pipe(res);
// }).listen(3000, () => console.log('Listening to port 3000...'));

// Example in process.stdin
const writable = fs.createWriteStream("./write-stdin.txt");
process.stdin.pipe(writable);