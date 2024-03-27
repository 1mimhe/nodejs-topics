const bcrypt = require("bcryptjs");

// hash password:
// we hash(encrypt) password, then store it to a database.
// the algorithm that hash password is not reversible.
// salt: is a random string that added before or after the password.
const salt = bcrypt.genSaltSync(10); // Number of rounds to use, defaults to 10 if omitted. More Rounds => More Time to hash.
// does not need to save salt in bcrypt.
const hash = bcrypt.hashSync("123456", salt);
// $2a$10$MKWxNZ49dN83DfFZMSVVOuobcjmiD3XIF.yZNFWy8RJV91RXhj5ma

// verify password:
console.log(bcrypt.compareSync("123456", hash)); // true
console.log(bcrypt.compareSync("1234", hash)); // false