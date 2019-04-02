var express = require('express')
var sendData = require('./sendData.js')
var app = express();
var PORT = process.env.PORT || 3000


app.get('/', (req, res) => {
  res.status(200).send("SUCCESS");
})

app.get('/entry/:str', (req, res) => {
  let str = req.params.str;
  sendData(str)
    .then(outcome => res.status(202).send(outcome))
    .catch(err => res.status(500).send(err))
});

app.listen(PORT, () => {
  console.log("The server is running and listening on port " + PORT)
});
