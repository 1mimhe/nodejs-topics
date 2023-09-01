// CRUD: Create Read Update Delete

const {MongoClient, ObjectID} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017/';
const databaseName = 'mydb';

MongoClient.connect(connectionURL, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!');
    }

    const db = client.db(databaseName);

    // create
    db.collection('users').insertOne({
        name: 'Andrew',
        age: 27
    }).then((error, result) => {
        if (error) {
            return console.log('Unable to insert user.');
        }

        console.log(result);
    });

    db.collection('tasks').insertMany([
        {
            description: 'Clean the house',
            completed: true
        },{
            description: 'Renew inspection',
            completed: false
        },{
            description: 'Pot plants',
            completed: false
        }
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert tasks!');
        }

        console.log(result);
    });

    // read
    db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
        console.log(tasks)
    });

    // update
    db.collection('users').updateOne({
        _id: new ObjectID("5c0fe6634362c1fb75b9d6b5") // must send an objectID, not a string.
    }, {
        $inc: {
            age: 1
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    });

    // delete
    db.collection('tasks').deleteOne({
        description: "Clean the house"
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });

}).then(() => console.log('Connected to MongoDB...'));