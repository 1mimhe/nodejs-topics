// Stream in FileSystem
const fs = require("fs");

const readStreamData = fs.createReadStream("./read.txt", /*"utf-8"*/);
// const writeStreamData = fs.createWriteStream("./write.txt");

let counter = 0;
let buff = [];

readStreamData.on('ready', () => {
    console.log("Data ready to Read Stream.");
});

readStreamData.on('data', (chunk) => {
    console.log("#" + ++counter + " Chunk of the data received:");
    console.log(chunk);
    buff.push(chunk);
});

readStreamData.on("error", (err) => {
    console.log("Get Error When Read Data:");
    console.log(err);
});

readStreamData.on("end", () => {
    console.log(buff.toString());
    console.log("Action of Read Stream Ended.");
});