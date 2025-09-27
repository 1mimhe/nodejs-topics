// The fork function is a variation of the spawn function for spawning node processes.
// The biggest difference between `spawn` and `fork` is
// that a communication channel is established (IPC channel) to the child process when using fork,
// so we can use the `send` function on the forked process
// along with the global process object itself to exchange messages between the parent and forked processes.
// We do this through the EventEmitter module interface. Here’s an example:

// The parent file, parent.js:
import { fork } from 'child_process';

const forked = fork('child.js');

forked.on('message', (msg) => {
  console.log('Message from child', msg);
});

forked.send({ hello: 'world' });

// The child file, child.js:
process.on('message', (msg) => {
  console.log('Message from parent:', msg);
});

let counter = 0;

setInterval(() => {
  if (process.send) {
    process.send({ counter: counter++ });
  }
}, 1000);
