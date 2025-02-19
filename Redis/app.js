const redisClient = require("./config");

// 

async function string() {
    // For Strings
    await redisClient.SET('name', 'Mammad'); // OK
    await redisClient.SET('age', 23); // save it as a string.
    const age = await redisClient.GET('age'); // "23"
    await redisClient.DEL('age'); // Returns 1
    const existsName = await redisClient.EXISTS('name'); // 1
    const existsAge = await redisClient.EXISTS('age'); // 0
}
// string();

async function expire() {
    // Expiration time
    await redisClient.EXPIRE('name', 10); // set expire time in seconds.
    const expireTime =  await redisClient.TTL('name'); // 10 -> 9 -> ... -> 1 -> -2
    // TTL Replies:
    // TTL in seconds.
    // -1 if the key exists but has no associated expiration.
    // -2 if the key does not exist.
}
// expire();

async function list() {
    // For Lists (Arrays)
    await redisClient.LPUSH('friends', 'hazrat'); // Push item at end of the list
    await redisClient.RPUSH('friends', 'kian'); // Push item at tail of the list
    const list = await redisClient.LRANGE('friends', 0, -1); // 0 - -1 => All items in list
    console.log(list); // [ 'kian', 'hazrat' ]

    const LPOP = await redisClient.LPOP('friends'); // Pop item at tail of the list
    const RPOP = await redisClient.RPOP('friends'); // Pop item at end of the list
}
// list();

async function set() {
    // For Sets (Unique Arrays)
    await redisClient.SADD("hobbies", "game");
    await redisClient.SADD("hobbies", "coding");
    const SMEMBERS = await redisClient.SMEMBERS("hobbies"); // [ 'game', 'coding' ]
    const SREM = await redisClient.SREM("hobbies", "game"); // remove 'game' from the set.
}
// set();

async function hash() {
    // Hashes => A key value pair inside a key value pair.
    // * We can not have hashes inside of hashes.
    await redisClient.HSET("person", "name", "Kian");
    await redisClient.HSET("person", "age", "22");
    const HGET = await redisClient.HGET("person", "name"); // Kian
    const HGETALL = await redisClient.HGETALL("person"); // { name: 'Kian', age: '22' }
    /*
        In redis-cli:
            1) "name"
            2) "Kian"
            3) "age"
            4) "22"
    */
    
    await redisClient.HDEL("person", "age");
    // Also we have HEXISTS, ...
}
// hash();