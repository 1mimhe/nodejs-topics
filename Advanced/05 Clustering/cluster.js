import cluster from "cluster";
import os from "os";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const cpuCount = os.cpus().length;

console.log(`The total number of CPUs is ${cpuCount}`);
console.log(`Primary pid=${process.pid}`);

// is used to change the default 'fork' behavior.
cluster.setupPrimary({
  exec: __dirname + "/index.js",
});
// it will be executed in each worker process spawned.

for (let i = 0; i < cpuCount; i++) {
  cluster.fork();
}

// Logs the process ID of the worker that has died and
// then invoke the fork() method to create a new worker process to replace the dead process.
cluster.on("exit", (worker, code, signal) => {
  console.log(`worker ${worker.process.pid} has been killed`);
  console.log("Starting another worker");
  cluster.fork();
});
