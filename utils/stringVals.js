  
require('dotenv').config();
var DEVPORT = 4000;
var PORT = process.env.PORT || DEVPORT;
const developmentMode = PORT === DEVPORT;
const dbConfig = developmentMode ? require('../dbconfig.js').dbconfig : {};
exports.DEVELOPMENT_MODE = developmentMode;
exports.DEVELOPMENT_PORT = DEVPORT;
exports.CLIENT_DEV_URI = 'http://localhost:9000';
exports.HEROKU_URI = process.env.HEROKU_URI;
exports.KCLSU_URI = process.env.KCLSU_URI;
exports.PORT = PORT;

exports.AGENCY_NAME = "KCLSU Advice";
exports.CONTACT_EMAIL = "help@kclsu.org";
exports.PHONE_NUMBER = "020 7848 1588";
exports.FULL_NAME= "KCLSU website";
exports.FIXIE_URL = process.env.FIXIE_URL;
exports.CONTRACT_KEY = process.env.ADVICE_PRO_CONTRACT;
exports.AGENCY_API_KEY = process.env.ADVICE_PRO_API;
exports.ADVICE_PRO_URL = developmentMode ? process.env.FIREBASE_DB_TEST_URI + '/advice/advicepro' : process.env.ADVICE_PRO_URL;
exports.ADVICEPRO_RECORDS_DATABASE_URL = developmentMode ? process.env.FIREBASE_DB_TEST_URI + '/advice/submissions' : process.env.FIREBASE_DB_URI + '/advice/submissions';


//FOR AUTHENTICATION
exports.KCLSU_CUSTOM_KEY = developmentMode? dbConfig.DEVSERVER_TOKEN : process.env.KCLSU_CUSTOM_KEY;

//CREDENTIALS FOR KCLSU FIREBASE REAL TIME DATABASE

exports.FIREBASE_SIGNIN = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + process.env.FIREBASE_DB_KEY
exports.ANONYMOUS_SIGNIN = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' 

exports.FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID
exports.FIREBASE_PRIVATE_KEY_ID = process.env.FIREBASE_PRIVATE_KEY_ID
exports.FIREBASE_PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY
exports.FIREBASE_CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL
exports.FIREBASE_CLIENT_ID = process.env.FIREBASE_CLIENT_ID
exports.FIREBASE_AUTH_URI = "https://accounts.google.com/o/oauth2/auth"
exports.FIREBASE_TOKEN_URI = "https://oauth2.googleapis.com/token"
exports.FIREBASE_AUTH_PROVIDER = "https://www.googleapis.com/oauth2/v1/certs"
exports.FIREBASE_CLIENT_X509_CERT_URL = process.env.FIREBASE_CLIENT_X509_CERT_URL

exports.FIREBASE_SERVICE_ACCOUNT_URL = "./kclsu-db1-firebase-adminsdk.json";
exports.FIREBASE_DB_KEY = process.env.FIREBASE_DB_KEY;
exports.FIREBASE_DB_URI = developmentMode ? dbConfig.FIREBASE_DB_URI : process.env.FIREBASE_DB_URI 
exports.FIREBASE_DB_TEST_URI = developmentMode ? dbConfig.FIREBASE_DB_TEST_URI : process.env.FIREBASE_DB_TEST_URI 
exports.FIREBASE_DB_ERRORLOG_URI = developmentMode ? dbConfig.FIREBASE_DB_ERRORLOG_URI : process.env.FIREBASE_DB_ERRORLOG_URI
exports.FIREBASE_DB_ADMIN_UID = developmentMode ? dbConfig.FIREBASE_DB_ADMIN_UID : process.env.FIREBASE_DB_ADMIN_UID
exports.FIREBASE_DB_SERVER_UID = developmentMode ? dbConfig.FIREBASE_DB_SERVER_UID : process.env.FIREBASE_DB_SERVER_UID

//CLOUDINARY CREDENTIALS
exports.CLOUDINARY_KEY =  process.env.CLOUDINARY_KEY;
exports.CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET;


//MSL ENDPOINTS
exports.MSL_NEWS = 'https://kclsu.org/svc/feeds/news/';
exports.MSL_EVENTS = 'https://kclsu.org/svc/feedsevents/';

//ERROR AREA NAMES
exports.AUTH = 'auth';
exports.ADVICE = 'advice';
exports.CLOUDINARY = 'cloudinary';
exports.MSL = 'msl';