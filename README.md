# Node.js Server Unresponsiveness
This repository demonstrates a common issue in Node.js:  server unresponsiveness caused by a long-running synchronous operation blocking the event loop. The `bug.js` file contains the problematic code, while `bugSolution.js` provides a corrected version.

## Problem
The server, when receiving a request to `/long-running`, performs a computationally intensive synchronous operation. This blocks the event loop, preventing the server from handling other requests until this operation completes.  This leads to unresponsiveness and poor performance.

## Solution
The solution involves offloading the long-running operation to a worker thread or using asynchronous operations. This prevents blocking of the main event loop and ensures the server remains responsive to other requests.