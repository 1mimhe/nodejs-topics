// By default, the spawn function does not create a shell to execute the command we pass into it.
// This makes it slightly more efficient than the exec function, which does create a shell.

// It buffers the command’s generated output
// and passes the whole output value to a callback function (instead of using streams, which is what spawn does).

import { exec } from 'child_process';

exec('find . -type f | wc -l', (err, stdout, stderr) => {
  if (err) {
    console.error(`exec error: ${err}`);
    return;
  }

  console.log(`Number of files ${stdout}`);
});

// Note that using the shell syntax comes at a security risk
// if you’re executing any kind of dynamic input provided externally (Command Injection).


// The exec function is a good choice if you need to use the shell syntax
// and if the size of the data expected from the command is small.
// The spawn function is a much better choice
// when the size of the data expected from the command is large,
// because that data will be streamed with the standard IO objects.

