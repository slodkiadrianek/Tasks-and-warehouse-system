import cluster from "cluster";
import os from "os";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const numCPUs = os.cpus().length;

console.log(`Number of CPUs: ${numCPUs}`);
console.log(`Process ID: ${process.pid}`);

// Set up cluster settings
cluster.setupMaster({
  exec: `${__dirname}/app.js`, // Specify the worker file
});

if (cluster.isPrimary) {
  // Fork workers for each CPU core
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Listen for worker exit events and restart the worker
  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `Worker ${worker.process.pid} died with code ${code} and signal ${signal}`,
    );
    cluster.fork(); // Restart the worker when it dies
  });
} else {
  // Workers can have any logic here (e.g., running app.js)
  console.log(`Worker ${process.pid} started`);
}
