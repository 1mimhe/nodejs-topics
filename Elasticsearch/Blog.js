require("dotenv").config();
const express = require("express");
const app = express();
const elasticClient = require("./elastic.config");
const indexBlog = "blog";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create new blog (Indexing documents)
app.post("/blog", async (req, res, next) => {
    const { title, author, body } = req.body;
    // CQRS:
    // Database things here.
    const createResult = await elasticClient.index({
        index: indexBlog,
        // id (or can be random)
        document: {
            title,
            author,
            body
        }
    });

    res.json(createResult);
    // {
    //     "_index": "blog",
    //     "_id": "ElCMv5ABkbSDsSH3olmA", => We can set a customize id.
    //     "_version": 1,
    //     "result": "created",
    //     "_shards": {
    //       "total": 2,
    //       "successful": 1,
    //       "failed": 0
    //     },
    //     "_seq_no": 0,
    //     "_primary_term": 2
    // }
});

// Get blogs
app.get('/blog', async (req, res, next) => {
    const { q } = req.body;
    // also we have .get() method.
    const blogs = await elasticClient.search({
        index: indexBlog,
        q, // search this same word in the content of blogs (in all of fields).
        // query: {
        //     match: {
        //         title: "node"
        //     }
        // }
    });

    res.json(blogs.hits.hits);
    // without q:
    // [
    //     {
    //       "_index": "blog",
    //       "_id": "ElCMv5ABkbSDsSH3olmA",
    //       "_score": 1,
    //       "_source": {
    //         "title": "node",
    //         "author": "me",
    //         "body": "this is a run environment"
    //       }
    //     },
    //     {
    //       "_index": "blog",
    //       "_id": "7g7vxJAB5STMm09TWQMZ",
    //       "_score": 1,
    //       "_source": {
    //         "title": "react",
    //         "author": "me",
    //         "body": "this is front"
    //       }
    //     }
    // ]
    // with q = run:
    // [
    //     {
    //       "_index": "blog",
    //       "_id": "ElCMv5ABkbSDsSH3olmA",
    //       "_score": 0.62883455,
    //       "_source": {
    //         "title": "node",
    //         "author": "me",
    //         "body": "this is a run environment"
    //       }
    //     }
    // ]
});

// Search in specific fields
app.get('/blog/fields', async (req, res, next) => {
    const { q } = req.body;
    // Difference between this and 'q' parameter:
    // We can specify fields we want to search in.
    // And optionally boost the importance of certain fields.
    const blogs = await elasticClient.search({
        index: indexBlog,
        query: {
            multi_match: {
                query: q,
                fields: ["title", "author"]
            }
        }
    });

    res.json(blogs.hits.hits);
});

// Search with RegEx
app.get('/blog/regex', async (req, res, next) => {
    const { q } = req.body;
    const blogs = await elasticClient.search({
        index: indexBlog,
        query: {
            regexp: {
                title: `.*${q}.*` // Doesn't matter what is after/before the search query.
            }
        }
    });

    res.json(blogs.hits.hits);
    // q = wh
    // []
});

// Search with RegEx in Multiple Fields
app.get('/blog/regex/fields', async (req, res, next) => {
    const { q } = req.body;
    const blogs = await elasticClient.search({
        index: indexBlog,
        query: {
            bool: {
                should: [
                    {
                        regexp: {
                            title: `.*${q}.*`
                        }
                    }, {
                        regexp: {
                            author: `.*${q}.*`
                        }
                    }, {
                        regexp: {
                            body: `.*${q}.*`
                        }
                    }
                ]
            }
        }
    });

    res.json(blogs.hits.hits);
    // q = wh
    // [
    //     {
    //       "_index": "blog",
    //       "_id": "47hVxZAB46gJ6zU46h4b",
    //       "_score": 1,
    //       "_source": {
    //         "title": "react",
    //         "author": "me",
    //         "body": "what daa"
    //       }
    //     },
    //     {
    //       "_index": "blog",
    //       "_id": "5LhWxZAB46gJ6zU4Ch4k",
    //       "_score": 1,
    //       "_source": {
    //         "title": "node",
    //         "author": "me",
    //         "body": "what daaa"
    //       }
    //     }, ...
    // ]    
});

// Delete a blog
app.delete('/blog/:id', async (req, res, next) => {
    const { id } = req.params;
    const deleteResult = await elasticClient.deleteByQuery({
        index: indexBlog,
        query: {
            match: {
                _id: id
            }
        }
    });

    res.json(deleteResult);
    // {
    //     "took": 1142,
    //     "timed_out": false,
    //     "total": 1,
    //     "deleted": 1,
    //     "batches": 1,
    //     "version_conflicts": 0,
    //     "noops": 0,
    //     "retries": {
    //       "bulk": 0,
    //       "search": 0
    //     },
    //     "throttled_millis": 0,
    //     "requests_per_second": -1,
    //     "throttled_until_millis": 0,
    //     "failures": []
    // }
});

// Update a blog
app.put("/blog/:id", async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    
    // Validate body
    Object.keys(data).forEach((key) => {
        if (!data[key]) delete data[key];
    });

    const updateResult = await elasticClient.update({
        index: indexBlog,
        id,
        doc: data
    });

    res.json(updateResult);
    // {
    //     "_index": "blog",
    //     "_id": "4rhVxZAB46gJ6zU4xB7M",
    //     "_version": 2,
    //     "result": "updated",
    //     "_shards": {
    //       "total": 2,
    //       "successful": 1,
    //       "failed": 0
    //     },
    //     "_seq_no": 7,
    //     "_primary_term": 4
    // }
});

const { PORT } = process.env;
app.listen(PORT, () => console.log(`Server run on port ${PORT}.`));