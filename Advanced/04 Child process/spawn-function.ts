// The spawn function launches a command in a new process
// and we can use it to pass that command any arguments.
// And streams data between parent and child processes.

// For example, here’s code to spawn a new process that will execute the find command.
import { spawn } from 'node:child_process';

// The result of executing the spawn function (the child object above)
// is a ChildProcess instance, which implements the EventEmitter API.
const child = spawn('find', ['.', '-type', 'f']);

// This means we can register handlers for events on this child object directly
child.on('exit', function (code, signal) {
  console.log('child process exited with ' +
              `code ${code} and signal ${signal}`);
});

// Every child process also gets the three standard stdio streams:
child.stdin
child.stdout.on('data', (data) => {
  console.log(`child stdout:\n${data}`);
});
child.stderr
// The stdout/stderr streams are readable streams
// while the stdin stream is a writable one.