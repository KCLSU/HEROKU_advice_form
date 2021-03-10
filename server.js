var express = require('express');
var bodyParser = require('body-parser');
var submitAdvicePro = require('./advicepro/submitAdvicePro.js');
var fetchNews = require('./msl_news/fetchNews.js');
var cloudinaryInt = require ('./cloudinary/cloudinaryInterface.js');
var cloudinaryUpload = cloudinaryInt.cloudinaryUpload;
var util = require('util');
var app = express();
var cors = require('cors');
const expressValidator = require('express-validator')
var PORT = process.env.PORT || 4000;
var firebaseAuth = require('./authentication/firebaseAuth');
var fetch = require('node-fetch');var multer  = require('multer');
var multer  = require('multer');
const fs = require('fs');

const { validationResult } = require('express-validator/check');
const {validate} = require('./utils/validation');

const fileStorage= multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

app.use(bodyParser.json()); // for parsing application/json
app.use(multer({ storage: fileStorage }).single('file_upload'));
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
  .then(result => {
    res.status(200).send(result)
  })
  .catch(err => {res.status(500).send({"error":err, "status": "Failed"})})
})

app.post('/submitAdvicePro', validate('adviceprosubmission'), (req, res) => {
  let data = req.body.advicepro;
  let id = req.body.submissionId;
  let log_url = `https://kclsu-advice.firebaseio.com/submissions/${id}.json`

  try {
    const errors = validationResult(req);
    console.log(errors)

    if (!errors.isEmpty()) {
      console.log(errors)
      res.status(422).json({ errors: errors.array() });
      return;
    }
  
    submitAdvicePro(data)
      .then(transfer => {
        if (transfer.status === 'Submitted'){
          res.status(200).send(transfer)
        }
        else res.status(400).send(transfer)
        fetch(log_url, {method: 'PATCH', body: JSON.stringify({result: transfer})})
      })

  } catch(err){
      res.status(500).send({"error":err, "status": "Failed"})
      fetch(log_url, {method: 'PATCH', body: JSON.stringify({result: 'Failed', error: err})})
  }
});

app.post('/authenticate', (req, res) => {  
    firebaseAuth(req.body.package, req.body.area)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err))
});

app.post('/upload_image', (req, res) => {
  let presets = req.body.presets;
  cloudinaryUpload(data)
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

app.post('/test', (req, res) => {
  console.log(req.body);
  res.status(200).send({status: "success"})
  .catch(e => console.log(e))
})

app.post('/upload', function (req, res, next) {
  console.log('----------------------------------')
  console.log(req.file)
  console.log('----------------------------------');
  cloudinaryInt.cloudinaryUpload(req.file)
  .then(result => {
    fs.unlink(req.file.path, er => {
      if (er) throw new Error(er)
    })
    res.status(200).send(result)
  })
  .catch(er => res.send(er))
});

app.listen(PORT, () => {
  console.log("The server is running and listening on port " + PORT)
});

