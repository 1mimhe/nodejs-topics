
// _id: '64ef076c66b49b462769980f'

// => 12 bytes:
    // 4 bytes: timestamp -> the time was the document created.
    // 3 bytes: machine identifier
    // 2 bytes: process identifier
    // 3 bytes: counter -> if you are on the same machine, in the same process, at the same second,
                        // but generate 2 different documents, the counter will be different.

const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const id1 = new ObjectId();
// and
const id11 = new ObjectId('64ef076c66b49b462769980f');

const id2 = new mongoose.Types.ObjectId();

console.log(id1);
console.log(id11);
console.log(id2);

console.log(id2.getTimestamp()); // 2023-09-01T16:16:33.000Z
console.log(ObjectId.isValid('64ef076c66b49b462769980f')); // true