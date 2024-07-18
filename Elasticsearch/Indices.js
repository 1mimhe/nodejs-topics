require("dotenv").config();
const express = require("express");
const app = express();
const elasticClient = require("./elastic.config");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create
app.post("/index", async (req, res, next) => {
    const { indexName } = req.body;
    const result = await elasticClient.indices.create({ index: indexName });
    res.json({
        result,
        message: "Index Created.",
    });
    //  {
    //     "result": {
    //       "acknowledged": true,
    //       "shards_acknowledged": true,
    //       "index": "blog"
    //     },
    //     "message": "Index Created."
    //   }
});

// Get All Indices
app.get("/index", async (req, res, next) => {
    const indices = await elasticClient.indices.getAlias();
    res.json(indices);
    //   {
    //     "blog": {
    //       "aliases": {}
    //     },
    //   ...
    //   }
});

// Delete
app.delete("/index/:indexName", async (req, res, next) => {
    const { indexName } = req.params;
    const deleteResult = await elasticClient.indices.delete({ index: indexName });
    res.json(deleteResult);
    // {
    //     "acknowledged": true
    // }
});

const { PORT } = process.env;
app.listen(PORT, () => console.log(`Server run on port ${PORT}.`));