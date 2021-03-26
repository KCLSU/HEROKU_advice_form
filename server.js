var express = require('express');
var bodyParser = require('body-parser');
var allRoutes = require('./routes/routes');
var submitAdvicePro = require('./advicepro/submitAdvicePro.js');
var fetchNews = require('./msl_news/fetchNews.js');
var cloudinaryInt = require ('./cloudinary/cloudinaryInterface.js');
var cloudinaryUpload = cloudinaryInt.cloudinaryUpload;
var util = require('util');
var app = express();
var cors = require('cors');
var PORT = process.env.PORT || 4000;
var firebaseAuth = require('./authentication/firebaseAuth');
var fetch = require('node-fetch');var multer  = require('multer');
var multer  = require('multer');
const fs = require('fs');
const parser = require('ua-parser-js');

const { validationResult } = require('express-validator/check');
const {validate} = require('./advicepro/validation');
const preventDuplicates = require('./advicepro/preventDuplicates');

const fileStorage = multer.diskStorage({
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

app.use(allRoutes);

app.listen(PORT, () => {
  console.log("The server is running and listening on port " + PORT)
});

