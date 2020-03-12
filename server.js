var express = require('express');
var bodyParser = require('body-parser');
var sendData = require('./sendData.js');
var fetchNews = require('./fetchNews.js');
var cloudinaryInt = require ('./cloudinaryInterface.js');
var cloudinaryUpload = cloudinaryInt.cloudinaryUpload;
var util = require('util');
var app = express();
var cors = require('cors');
var PORT = process.env.PORT || 3000;
var firebaseAuth = require('./firebaseAuth')


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

app.get('/newslist/:id', (req, res) => {
  let id = req.params.id;
  let url = `https://kclsu.org/svc/feeds/news/${id}`
  fetchNews(url)
  .then(result => res.status(200).send(result))
  .catch(err => {res.status(500).send({"error":err, "status": "Failed"})})
})

app.post('/send', (req, res) => {
  let data = req.body;
  let transfer = sendData(data)
    .then(transfer => {
      if (transfer.status === 'Submitted'){
        res.status(200).send(transfer)
      }
      else res.status(400).send(transfer)
      })
    .catch(err => res.status(500).send({"error":err, "status": "Failed"}))
});

app.post('/authenticate', (req, res) => {
    firebaseAuth(req.body)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err))
});

app.post('/upload_image', (req, res) => {
  let presets = req.body.presets;
  cloudinaryUpload(presets)
    .then(data => cloudinaryInt.manipulateImage(data.public_id, presets))
    .then(img => res.status(200).send({'image':img, 'status':'Success'}))
    .catch(err => res.status(500).send({"error":err, "status": "Failed"}))
});

app.post('/transform', (req, res) => {
  let transformations = req.body.transformations;
  let id = req.body.publicId;
  cloudinaryInt.manipulateImage(id, transformations)
    .then(img => res.status(200).send(img))
    .catch(err => res.status(500).send({"error":err, "status": "Failed to transform image"}))
});


app.listen(PORT, () => {
  console.log("The server is running and listening on port " + PORT)
});
