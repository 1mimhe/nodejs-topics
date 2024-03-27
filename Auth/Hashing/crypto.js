const crypto = require("crypto"); // built-in

// 1
const salt = crypto.randomBytes(16).toString("hex"); // make random salt
// aa9309cc7a2c68515b3d2d9a0653169f => we should save it somewhere.
const hash1 = crypto.pbkdf2Sync("123456", salt, 1000, 64, "sha512").toString("hex");
// 1000 => iterations the algorithms will be run.
// 64 => length of hashed password.
// 02a9385b65aee098e1159c826bc11aeb2692f46cc321ff4a7a3cd729142cf6416d5e43afd5806cf86b522043d04d56be9c966eef04f4379b78a6fc6a1c510959

// verify password:
const newHash1 = crypto.pbkdf2Sync("123456", salt, 1000, 64, "sha512").toString("hex");
console.log(hash1 === newHash1); // true
const newHash2 = crypto.pbkdf2Sync("1234", salt, 1000, 64, "sha512").toString("hex");
console.log(hash1 === newHash2); // false

// 2
const hash2 = crypto.createHash("sha512", {encoding: "utf-8"}).update("123456").digest("hex");
// ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413

// 3
const secret = crypto.randomBytes(16).toString("hex"); // make random secret
// 73818e9fde8d6688898902460d732051 => we should save it somewhere.
const hash3 = crypto.createHmac("sha512", secret).update("123456").digest("hex");
// f3b1e409af7b2c62237be2f5d724d6ec2e39dc0a900d2455805ac7e4d0e3b6452a46a015bb3a6d97210b99fc5f29fda743a11385011e04f6a57f2cabfac04b30