var express = require('express')
var app = express();
var PORT = process.env.PORT || 3000

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/', (req, res) => {
  res.send("SUCCESS");
})

app.listen(PORT, () => {
  console.log("The server is running and listening on port " + PORT)
});
