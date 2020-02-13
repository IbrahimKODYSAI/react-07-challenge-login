/* eslint-disable */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRouter = require('./apiRouter').router;

const server = express();

server.use(cors());
server.use(bodyParser.urlencoded({ extend: true }));
server.use(bodyParser.json());
server.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

if ('OPTIONS' === req.method) {
  //respond with 200
  res.send(200);
}
else {
//move on
  next();
}
});

server.get('/', function(req, res) {
  res.setHeader('Content-type', 'text/html');
  res.status(200).send('<h1>Bonjours sur mon super server</h1>');
});

server.use('/api/', apiRouter);

server.listen(3000, function() {
  console.log('server en route');
});
