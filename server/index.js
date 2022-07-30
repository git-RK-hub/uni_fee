const http = require("http");
const fs = require("fs").promises;

const host = 'localhost';
const port = 8000;

let indexFile;
const requestListener = function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader("Content-Type", "application/json");
  res.writeHead(200);
  res.end(indexFile);

  req.on('error', (e) => {
    console.log('problem with request: ' + e.message);
  });
};

const server = http.createServer(requestListener);

fs.readFile(__dirname + "/data.json")
    .then(contents => {
        indexFile = contents;
        server.listen(port, host, () => {
            console.log(`Server is running on http://${host}:${port}`);
        });
    })
    .catch(err => {
        console.error(`Could not read data.json file: ${err}`);
        process.exit(1);
    });