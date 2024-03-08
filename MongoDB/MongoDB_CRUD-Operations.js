// CRUD: Create Read Update Delete

const {MongoClient, ObjectId} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017/';
const databaseName = 'mydb';
const client = new MongoClient(connectionURL);

async function MDB() {
    // connect to db
    await client.connect().then(() => {
        console.log('Connected to MongoDB.');
    });
    const db = client.db(databaseName);

    // get collection
    const users = db.collection('users');
    const tasks = db.collection('tasks');
    // or we can do this => db.collection("---").find({});

    // create (insert)
    users.insertOne({
        name: 'Andrew',
        age: 27
    }).then((result) => {
        console.log(result);
        // {
        //   acknowledged: true,
        //   insertedId: new ObjectId("65cd152e7e9dc6551cd8f632")
        // }
    });

    const insertResult = await tasks.insertMany([
        {
            description: 'Clean the house',
            completed: true
        }, {
            description: 'Renew inspection',
            completed: false
        }, {
            description: 'Pot plants',
            completed: false
        }
    ]);
    console.log(insertResult);
    // {
    //   acknowledged: true,
    //   insertedCount: 3,
    //   insertedIds: {
    //     '0': new ObjectId("65cd159d294da654266d6d82"),
    //     '1': new ObjectId("65cd159d294da654266d6d83"),
    //     '2': new ObjectId("65cd159d294da654266d6d84")
    //   }
    // }

    // read (find) => findOne/ find(many)
    const findResult = await tasks.find({ /*age: 27*/ }, {
        skip: 2,
        limit: 1,
        sort: { _id: -1 }, // -1: Descending, 1: Ascending
        // fields to either include or exclude (one of, not both).
        projection: {
            // age: 0 => exclude
            // name: 1 => include
        }
    }).toArray();
    console.log(findResult);

    // update
    users.updateOne({
        _id: new ObjectId("65cd14859086625e4da566dc") // must send an objectID, not a string.
    }, {
        $inc: {
            age: 1
        }
    }).then((result) => {
        console.log(result);
        // {
        //   acknowledged: true,
        //   modifiedCount: 1,
        //   upsertedId: null,
        //   upsertedCount: 0,
        //   matchedCount: 1
        // }
    }).catch((error) => {
        console.log(error);
    });

    // delete: does not return deleted document!
    tasks.deleteOne({
        description: "Clean the house"
    }).then((result) => {
        console.log(result);
        // { acknowledged: true, deletedCount: 1 }
    }).catch((error) => {
        console.log(error);
    });

    const result = await tasks.findOneAndDelete({
        description: "Clean the house"
    });
    console.log(result);
    // {
    //   _id: new ObjectId("65cd1504ed31534b2e2da201"),
    //   description: 'Clean the house',
    //   completed: true
    // }

    // aggregate: run a series of operations on a collection of items.
    const aggResult = await users.aggregate([
        {
            $match: {
                name: "Mammad"
            }
        },
        {
            $addFields: {
                "userAge": "$age"
            }
        },
        {
            $project: {
                age: 0
            }
        }
    ]).toArray();
    console.log(aggResult);
}

MDB();

// if our document has an object itself:
// {address: {country: "Iran", city: "Isfahan"}}
// in filter, we point to it:
// {"address.city" = "Isfahan"}

// Mongo import/export:
// mongoimport command is used to import your content from an extended JSON, ...
// mongoimport --db <db-name> --collection <collection-name> --file <file-name>
// mongoexport --db <db-name> --collection <collection-name> --out=<file-name>