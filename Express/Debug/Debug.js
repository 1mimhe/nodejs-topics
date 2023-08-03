const express = require('express');
const app = express();
// use debug package instead of console.log for debugging
const startupDebugger = require('debug')('app:startup'); // require('debug') returns  a function.
const dbDebugger = require('debug')('app:db');

if (app.get('env') === 'development') {
    // ...
    startupDebugger('if statement enabled...');
}

dbDebugger('DB working...');

// in cmd:
// 1. set DEBUG (an environment variable)
// set DEBUG=app:startup
// set DEBUG=app:db
// set DEBUG=app:startup,app:db
// set DEBUG=app:*
// 2. run app
// *** after debug, reset DEBUG. (set DEBUG=)