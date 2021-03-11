const request = require('request');
const fs = require('fs');
const args = process.argv.slice(2);

const url = args[0];
const localpath = args[1];

request(url, (error, response, body) => {
  if (error !== null) {
    process.on('exit', () => { // adapted from https://nodejs.org/api/process.html documentation
      console.log(`process failed error: ${error}`);
      process.exit();
    });
  } else if (response.statusCode !== 200) {
    process.on('exit', () => {
      console.log(`process failed status code: ${response.statusCode}`);
    });
    process.exit();
  }
  fs.writeFile(localpath, body, () => {
    console.log(`downloaded and saved ${body.length} bytes to ${localpath}`);
  });
});


fs.stat(localpath, (err, stats) => {
  if (!err) {
    if (!stats.isFile()) {
      console.log('Not a valid file path');
      throw err;
    }
  }
}); // adapted from https://www.geeksforgeeks.org/how-to-check-the-given-path-is-file-or-directory-in-node-js/