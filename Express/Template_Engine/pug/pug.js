// https://pugjs.org/

const express = require('express');
const app = express();
const path = require('path');

app.use("/static", express.static("public"));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    const users = [{
        id: 1,
        name: "Mammad"
    }, {
        id: 2,
        name: "Ali"
    }, {
        id: 3,
        name: "Sina"
    }];

    res.render("index", {
        link: "https://www.google.com",
        section: "This is my section.",
        users
    });
});

app.listen(3000, () => console.log('Connected to port 3000.'));