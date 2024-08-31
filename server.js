// server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 7823;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

// Define the startServer function
async function startServer() {
  // Your server setup logic here
  return new Promise((resolve, reject) => {
    app.listen(port, (error) => {
      if (error) {
        reject(error);
      } else {
        console.log(`Server is running on port ${port}`);
        resolve();
      }
    });
  });
}

// Export the startServer function
module.exports = { startServer };
