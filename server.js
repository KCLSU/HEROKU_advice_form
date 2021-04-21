var express = require('express');
var bodyParser = require('body-parser');
var allRoutes = require('./routes/routes');
var configs = require('./utils/configs');
var app = express();
var cors = require('cors');
var PORT = process.env.PORT || 4000;
var multer  = require('multer');

// const { validationResult } = require('express-validator/check');
// const {validate} = require('./models/old/advicepro/validation');


app.use(bodyParser.json()); // for parsing application/json
app.use(multer({ storage: configs.multer() }).single('file_upload'));
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

app.use(allRoutes);

app.listen(PORT, () => {
  console.log("The server is running and listening on port " + PORT)
});

