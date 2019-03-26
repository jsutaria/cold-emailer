// var emailer = require('./emailer');
var http = require('http');
var fs = require('fs');
var port = process.env.PORT || 5000

console.log("Hello, world")
//emailer.sendMail("jainilsutaria1@gmail.com", "test");

http.createServer(function (req, res) {
  var body = "";
  req.on('data', function (chunk) {
    body += chunk;
  });
  req.on('end', function () {
    console.log('POSTed: ' + body);
    fs.readFile("./index.html", function(err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found");
      }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  });
}).listen(port);
