const { EventEmitter } = require('events');
const { readFile } = require('fs');

function findRegex(files, regex) {
  const emitter = new EventEmitter();

  for (const file of files) {
    readFile(file, 'utf8', (err, content) => {
      if (err) {
        return emitter.emit('error', err);
      }

      emitter.emit('fileread', file);

      const match = content.match(regex);
      if (match) {
        match.forEach(elem => emitter.emit('found', file, elem));
      }
    });
  }
  return emitter;
}

findRegex(
  ['fileA.txt', 'fileB.json'],
  /hello \w+/g
)
  .on('fileread', file => console.log(`${file} was read`))
  .on('found', (file, match) => console.log(`Matched "${match}" in ${file}`))
  .on('error', err => console.error(`Error emitted ${err.message}`));

// The EventEmitter treats the 'error' event in a special way:
// It will automatically throw an exception and exit from the application,
// if such an event is emitted and no associated listener is found.
// For other events:
// The event is simply ignored, and the program continues executing without any errors or interruptions.

// It is more common to see EventEmitter extended by other classes.
class FindRegex extends EventEmitter {
  constructor(regex) {
    super();
    this.regex = regex;
    this.files = [];
  }

  addFile(file) {
    this.files.push(file);
    return this;
  }

  find() {
    for (const file of this.files) {
      readFile(file, 'utf8', (err, content) => {
        if (err) {
          return this.emit('error', err);
        }

        this.emit('fileread', file);

        const match = content.match(this.regex);
        if (match) {
          match.forEach(elem => this.emit('found', file, elem));
        }
      });
    }
    return this;
  }
}
const findRegexInstance = new FindRegex(/hello \w+/);
findRegexInstance
  .addFile('fileA.txt')
  .addFile('fileB.json')
  .find()
  .on('found', (file, match) => console.log(`Matched "${match}" in file ${file}`))
  .on('error', err => console.error(`Error emitted ${err.message}`));