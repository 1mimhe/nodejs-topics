const yargs = require('yargs');

// Getting Input from users
// 1.
// when we run code with 'node index.js'
// In the following, we write the inputs.
// 'node index.js arg1 arg2'

// in code:
// process.argv:
/*
[
  'C:\\Program Files\\nodejs\\node.exe', // => path to the nodejs executable on my machine
  'M:\\Coding\\Node.js\\Node.js_Topics\\Command_Line_Args\\Argument_Parsing.js', // => path to the js file
  'arg1',
  'arg2'
]
 */

// 2.
// 'yargs' package
// 'node index.js add --title="things to buy"'
/*
process.argv:
[
  'C:\\Program Files\\nodejs\\node.exe',
  'M:\\Coding\\Node.js\\Node.js_Topics\\Command_Line_Args\\Argument_Parsing.js',
  'add',
  '--title=things to buy'
]
yargs.argv:
{ _: [ 'add' ], title: 'things to buy', '$0': 'Argument_Parsing.js' }
 */

// create command
// yargs.command({
//     command: 'remove',
//     describe: 'Remove a note',
//     handler() {
//         console.log('Removing the note');
//     }
// });
yargs.command({
    command: 'add',
    describe: 'Adds two number',
    // [optional]
    builder: { // options of command
        title: {
            describe: 'Note title',
            demandOption: true,  // default: false => optional to be provided, true => it needs to be provided (Required)
            type: 'string'
        },
        body: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    // [optional]
    handler(argv) {
        console.log(`Note:
        Title: ${argv.title}
        Body: ${argv.body}`);
    }
})
// use command => 'node index.js add'

// 'node index.js --help':
/*
Argument_Parsing.js [command]

Commands:
  Argument_Parsing.js add  Adds two number
  .
  .

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
 */

yargs.parse(); // to set above changes
// and returns yargs.argv
// === console.log(yargs.argv)