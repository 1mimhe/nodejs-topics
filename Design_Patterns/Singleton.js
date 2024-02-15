// The Singleton pattern ensures that a class has only one instance and provides a global point of access to it.
// For instance, a database connection pool can be implemented as a singleton to prevent resource wastage.

const { MongoClient } = require("mongodb");

class ConnectToMongoDB {
    #connectionURL="mongodb://localhost:27017/";
    #db = null;

    async #connect(){
        try {
            let client = new MongoClient(this.#connectionURL);
            return client.db();
        } catch (error) {
            console.log(error.message);
        }
    }

    async get() {
        try {
            if(this.#db){
                console.log("db connection is already alive.");
                return this.#db;
            }

            this.#db = await this.#connect();
            return this.#db;
        } catch (error) {
            console.log(error.message);
        }
    }
}

async function main() {
    const db = await new ConnectToMongoDB().get();
    const users = await db.collection("user").find({}).toArray();
    console.log(users);
}

main();