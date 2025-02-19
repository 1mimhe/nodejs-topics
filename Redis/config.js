const { createClient } = require("redis");

const redisClient = createClient();
redisClient.on("error", (err) => console.log("Redis Client Error: ", err.message));
redisClient.connect();
// The above code connects to localhost on port 6379.
// or url: redis[s]://[[username][:password]@][host][:port][/db-number]
// ex: { url: 'redis://alice:foobared@awesome.redis.server:6380' }

module.exports = redisClient;