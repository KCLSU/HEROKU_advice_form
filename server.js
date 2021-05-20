var express = require('express');
var bodyParser = require('body-parser');
var allRoutes = require('./routes/routes');
var app = express();
var cors = require('cors');
var multer  = require('multer');
var admin = require('firebase-admin');
var constants = require('./utils/stringVals');
var configs = require('./utils/configs');

// Fetch the service account key JSON file contents
let serviceAccount;
let databaseURL = constants.FIREBASE_DB_URI;
if (constants.PORT === 4000){
  serviceAccount = require("./kclsu-db1-firebase-adminsdk.json");
  databaseURL = constants.FIREBASE_DB_TEST_URI;
} else serviceAccount = configs.firebaseServiceAccount();

//Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: databaseURL
});

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});

app.use(bodyParser.json()); // for parsing application/json
app.use(multer({ storage: imageStorage }).single('file_upload'));
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

app.use(allRoutes);

app.listen(contants.PORT, () => {
  console.log("The server is running and listening on port " + constants.PORT)
});

