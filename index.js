const port = process.env.PORT || 8080;
var express = require('express');
var app = express();
var emailer = require('./emailer');
var bodyParser = require('body-parser');

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
})

app.get('/confirmed', (req, res) => {
  res.sendFile('confirmed.html', { root: __dirname });
})

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', (req, res) => {
  var data = req.body;

  if(!data.name || !data.email  || !data.subject || !data.body || !data.data) {
    res.sendFile('index.html', { root: __dirname });
    return;
  }

  emailer.readSheetEmails(data);
  res.redirect("confirmed");
})

app.post('/confirmed', (req, res) => {
  res.redirect("/");
})

app.listen(port);
