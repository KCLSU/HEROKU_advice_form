var express = require('express')
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(1000, () => {
  console.log("The server is running and listening")
});
