// Templating Engines:
// We generate dynamic documents and save the dynamically generated content in a file.
// We can create code easily and reuse it across the pages.
// *** handlebars (hbs)

const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs'); // for customize partials directory

const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setting up templating engine:
app.set('view engine', 'hbs'); // we tell Express which templating engine we install.
app.set('views', viewsPath); // customizing the views directory
hbs.registerPartial(partialsPath);

// render a view
app.get('/', (req, res) => {
    // just the name of .hbs file we create in 'views' folder.
    // values we provide to template.
    res.render('index', {
        title: 'Weather App',
        name: 'Mammad'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mammad'
    });
});

app.listen(3000, () => console.log(`Listening to port 3000...`));
