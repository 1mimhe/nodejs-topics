const express = require('express');
const {loginValidationSchema} = require("./joiValidation");
const app = express();

app.post("/login", async (req, res, next) => {
    try {
        await loginValidationSchema.validateAsync(req.body);
        res.send(req.body);
    } catch (error) {
        res.status(400).send(error);
    }
});