// https://express-validator.github.io/
// Validation chains => body(), param(), query(), header(), cookie() and so on.

const express = require("express");
const loginValidator = require("./auth.validator");
const IdValidator = require("blog.validator");
const searchValidator = require("search.validator");
const {validationResult} = require("express-validator");
const app = express();

app.use(express.json());

app.post("/login",loginValidator(), (req, res) => {
    const error = validationResult(req);
    res.send(error);
    /*
    {
    "errors": [
        {
            "type": "field",
            "value": "arharh",
            "msg": "Invalid value",
            "path": "email",
            "location": "body"
        },
        {
            "type": "field",
            "value": "aeg",
            "msg": "Invalid value",
            "path": "password",
            "location": "body"
        }
    ]
}
     */
});

app.get("/blogs/:id",IdValidator, searchValidator(), (req, res) => {
    res.send(req.params);
});

app.listen(3000, () => console.log("Server Run on Port 3000."));