const port = process.env.PORT || 8080;
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
})

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', (req, res) => {
  console.log(req.body);
  res.sendFile('confirmed.html', { root: __dirname });
})

.listen(port);
