const express = require('express');
const app = express();

/*
Middleware functions are functions that have access to the request object (req),
the response object (res), and the next middleware function in the application’s request-response cycle.
The next middleware function is commonly denoted by a variable named next.
They are executed based on the order of placement in the code.
 */
/*
app.use([path, ] callback [, callback...]):
the middleware function is executed when the base of the requested path matches path.
*/
/*
Middleware functions can perform the following tasks:
* Execute any code.
* Make changes to the request and the response objects.
* End the request-response cycle.
* Call the next middleware function in the stack.
*/

// Creating custom Middleware
app.use(function(req, res, next) {
    console.log('Logging...');
    next(); // if we don't call next middleware, request-response cycle won't be done!
});

app.use(auth);

function auth(req, res, next) {
    console.log('Authenticating...');
    req.user = {/* Something */}; // Make changes to the request and the response objects.
    next();
}

// Built-in Middleware
app.use(express.json()); // req.body

app.use(express.static('pio'));
// serves static assets such as HTML files, images,...
// http://localhost:PORT/FileName => http://localhost:3000/readme.txt
// When a file is not found, instead of sending a 404 response, it calls next().

// *** In project, we put asserts in a folder named 'public'.

// Third-party Middlewares => https://expressjs.com/en/resources/middleware.html

// Morgan
const morgan = require('morgan');
app.use(morgan('dev')); // GET / 200 6.177 ms - 2
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
// GET / 200 2 - 6.177 ms

app.get('/', (req, res) => {
    res.send(req.body);
});

app.listen(3000);

// Error Handling:
app.use((err, req, res, next) => {
    return res.json({
        statusCode: err.status || 500,
        error: {
            message: err.message || "internalServerError"
        }
    });
});