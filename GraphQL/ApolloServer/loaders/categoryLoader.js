/*
DataLoader used to batch and cache data loading queries to improve performance in applications
that frequently fetch data from a database.
How it works:
Batching: Collects multiple related data loading requests into a single batch.
Caching: Caches the results of the batch query to avoid redundant database calls for subsequent requests.
In-memory: Operates in-memory, providing fast access to cached data.
*/

const DataLoader = require("dataloader");
const Category = require("../data/categories.json"); // We assume that this is a db model.

// A batch function accepts an Array of keys.

const bashAuthors = async (keys) => {
    // keys => Authors' IDs

    // const categories = await Category.find({
    //     _id: { $in: keys }
    // });

    const categories = Category.filter((category) => {
        return keys.find((key) => category.id === key);
    });
    console.log(categories);
    
    // *** The Array of values (result) must be the same length as the Array of keys.
    // *** Each index in the Array of values must correspond to the same index in the Array of keys.
    return keys.map(key => categories.find((category) => category.id === key) || new Error(`No result for ${key}`));
}

module.exports = new DataLoader(bashAuthors);