// https://ejs.co/

const path = require('path');
const express = require('express');
const app = express();
const blogs = require('./blogs.json');

const viewsPath = path.join(__dirname, 'views');

app.set('view engine', 'ejs');
app.set('views', viewsPath);

app.get('/', (req, res) => {
    const h1 = "<h1>Blogs</h1>"

    res.render('index', {
        h1,
        name: "Mammad",
        blogs
    });
});

app.listen(3000, () => console.log(`Listening to port 3000...`));