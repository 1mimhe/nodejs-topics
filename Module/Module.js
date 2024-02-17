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
// __dirname: The directory name of the current module.
// __filename: This is the current module file's absolute path.

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