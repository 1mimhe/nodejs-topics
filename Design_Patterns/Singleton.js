// The Singleton pattern ensures that a class has only one instance and provides a global point of access to it.
// For instance, a database connection pool can be implemented as a singleton to prevent resource wastage.

const { MongoClient } = require("mongodb");

class ConnectToMongoDB {
    static #connectionURL="mongodb://localhost:27017/";
    static #db = null;

    static async #connect(){
        try {
            let client = new MongoClient(this.#connectionURL);
            await client.connect();
            return client.db();
        } catch (error) {
            console.log(error.message);
        }
    }

    static async getInstance() {
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

(async () => {
    const db = await ConnectToMongoDB.getInstance();
    console.log("Connected to MongoDB:", db.databaseName);
})();