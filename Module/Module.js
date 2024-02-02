// module types: core/local/third-party

// module object:
/*
Module {
  id: '.',
  path: 'M:\\Coding\\Node.js\\Node.js_Topics\\Module',
  exports: {},
  filename: 'M:\\Coding\\Node.js\\Node.js_Topics\\Module\\Module.js',
  loaded: false,
  children: [],
  paths: [
    'M:\\Coding\\Node.js\\Node.js_Topics\\Module\\node_modules',
    'M:\\Coding\\Node.js\\Node.js_Topics\\node_modules',
    'M:\\Coding\\Node.js\\node_modules',
    'M:\\Coding\\node_modules',
    'M:\\node_modules'
  ]
}
*/

// export (creating) module:
function a() {}
module.exports.a = a;
module.exports.anotherName = a;
module.exports = a; // when we have one export

// require (load/import) module:
const foo = require('path');
// parameter => path of module file [or] module name (for core modules)
// => returns 'exports' object of that module.

/*
Module Wrapper Function:
node.js doesn't execute code directory!
it wraps code inside this:
(function(exports, module, __filename, __dirname) {code}) => IIFE
and then, execute it.
 */

// Path Module:
const path = require('path');
const pathObject = path.parse(__filename);
/*
{
  root: 'M:\\',
  dir: 'M:\\Coding\\Node.js\\Node.js_Topics\\Module', // directory of the folder contains file.
  base: 'Module.js',
  ext: '.js', // extension
  name: 'Module'
}
*/

// OS (Operating System) Module:
const os = require('os');
const totalMemory = os.totalmem();
const freeMemory = os.freemem();
console.log(totalMemory, freeMemory);

// FS (File System) Module:
const fs = require('fs');

// Synchronous readdir
const files  = fs. readdirSync( './');
console.log(files); // [ 'Module.js' ]
// Asynchronous readdir
fs.readdir('./', (err, files2) => {
    if (err) console.log("Error", err);
    else console.log('Result', files2);
});

// write data:
const bookJSON = JSON.stringify({title: 'Crime and Punishment'});
fs.writeFileSync('file.json', bookJSON);
// read data:
const dataBuffer = fs.readFileSync('file.json');
const data = JSON.parse(dataBuffer.toString());

// Events Module: [Event: A signal that something has happened.]
const EventEmitter = require('events');
const emitter = new EventEmitter();
// Register a listener
emitter.on('event', (arg1, arg2) => {
    console.log('Listener called');
});
// on === addListener
// 'event' => eventName
emitter.emit('event', /*args:*/ 1, 'a'); // Raise an event