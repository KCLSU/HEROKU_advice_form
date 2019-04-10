var express = require('express')
var bodyParser = require('body-parser');
var sendData = require('./sendData.js')
var util = require('util');
var app = express();
var cors = require('cors');
var PORT = process.env.PORT || 3000


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());


app.get('/', (req, res) => {
  res.status(200).send("SUCCESS");
})

app.get('/entry/:str', (req, res) => {
  let str = req.params.str;
  sendData(str)
  .then(outcome => res.status(202).send(outcome))
  .catch(err => {res.status(500).send({"error":err, "status": "Failed"})})
});

app.post('/send', (req, res) => {
  let data = req.body;
  let transfer = sendData(data)
    .then(transfer => {
      console.log(transfer)
      if (transfer.status === 'Submitted'){
        res.status(200).send(transfer)
      }
      else res.status(400).send(transfer)
      })
    .catch(err => res.status(500).send({"error":err, "status": "Failed"}))
});


app.listen(PORT, () => {
  console.log("The server is running and listening on port " + PORT)
});
