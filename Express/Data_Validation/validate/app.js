const express = require('express');
const userSchema = require("./userSchema");
const app = express();

app.use(express.json());

app.post("/login", (req, res, next) => {
        const [error] = userSchema.validate(req.body);
        res.send(error.message ?? req.body);
});

app.listen(3000, () => console.log("Listening to port 3000."));