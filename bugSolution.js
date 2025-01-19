const http = require('http');
const { Worker } = require('worker_threads');

const server = http.createServer((req, res) => {
  if (req.url === '/long-running') {
    const worker = new Worker('./long-running.js');
    worker.on('message', (result) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(`Long operation completed. Result: ${result}`);
    });
    worker.on('error', (err) => {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(`Error: ${err.message}`);
    });
    return;
  }
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!');
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});

// long-running.js
const { parentPort } = require('worker_threads');

let result = 0;
for (let i = 0; i < 1e9; i++) {
  result += i;
}

parentPort.postMessage(result);