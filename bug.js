const http = require('http');

const server = http.createServer((req, res) => {
  // Without this check, a synchronous operation will block the event loop
  // and the server will not respond to subsequent requests.
  if (req.url === '/long-running') {
    // Simulate a long-running synchronous operation (e.g., heavy computation)
    const start = Date.now();
    let result = 0;
    for (let i = 0; i < 1e9; i++) {
      result += i;
    }
    const end = Date.now();
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Long operation completed in ${end - start}ms. Result: ${result}`);
    return; 
  }
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!');
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});