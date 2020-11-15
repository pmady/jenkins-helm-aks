
var http = require('http');
var os = require("os");

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('<h1>Hello from ... v6  <font color="red">' + os.hostname()+'</font></h1>');
}).listen(3000);
