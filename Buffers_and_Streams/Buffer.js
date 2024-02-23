const buff = Buffer.from("NodeJS");
// Allocates a new Buffer using an array of bytes in the range 0 – 255.
// Array entries outside that range will be truncated to fit into it.

console.log(buff); // <Buffer 4e 6f 64 65 4a 53>
console.log(buff[0]); // 78 => char code / ASCII code
buff[0] = 78 + 32;
console.log(buff.toString()) // nodeJS
console.log(buff[0].toString(16)); // 6e

console.log(buff.toJSON()); // { type: 'Buffer', data: [ 110, 111, 100, 101, 74, 83 ] }
console.log(Buffer.from([ 110, 111, 100, 101, 74, 83 ], 16)); // <Buffer 6e 6f 64 65 4a 53>

const buff2 = Buffer.alloc(4); // Allocates a new Buffer of specific size bytes.
buff2.write("NodeJS"); // <Buffer 4e 6f 64 65>
console.log(buff2.toString()); // Node

const buff3 = Buffer.alloc(256);
buff3.write("NodeJS");
console.log(buff3); // <Buffer 4e 6f 64 65 4a 53 00 00 00 00 00 00 00 00
// 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
// 00 00 00 00 00 00 00 00 00 00 00 00 ... 206 more bytes>