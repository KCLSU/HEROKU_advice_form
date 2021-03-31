var express = require('express');
var bodyParser = require('body-parser');
var allRoutes = require('./routes/routes');
var configs = require('./utils/configs');
var submitAdvicePro = require('./models/old/advicepro/submitAdvicePro.js');
var fetchNews = require('./models/old/msl/fetchNews.js');
var cloudinaryInt = require ('./models/old/cloudinary/cloudinaryInterface.js');
var cloudinaryUpload = cloudinaryInt.cloudinaryUpload;
var util = require('util');
var app = express();
var cors = require('cors');
var PORT = process.env.PORT || 4000;
var firebaseAuth = require('./models/old/authentication/firebaseAuth');
var fetch = require('node-fetch');var multer  = require('multer');
const fs = require('fs');
const parser = require('ua-parser-js');

const { validationResult } = require('express-validator/check');
const {validate} = require('./models/old/advicepro/validation');
const preventDuplicates = require('./models/old/advicepro/preventDuplicates');


app.use(bodyParser.json()); // for parsing application/json
app.use(multer({ storage: configs.multer() }).single('file_upload'));
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

app.use(allRoutes);

app.listen(PORT, () => {
  console.log("The server is running and listening on port " + PORT)
});

