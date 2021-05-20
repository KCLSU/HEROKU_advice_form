require('dotenv').config();
var PORT = process.env.PORT || 4000;
exports.PORT = PORT;
const developmentMode = PORT === 4000;
const dbConfig = developmentMode ? require('../dbconfig.js').dbconfig : {};


exports.AGENCY_NAME = "KCLSU Advice";
exports.CONTACT_EMAIL = "help@kclsu.org";
exports.PHONE_NUMBER = "020 7848 1588";
exports.FULL_NAME= "KCLSU website";
exports.FIXIE_URL = process.env.FIXIE_URL;
exports.CONTRACT_KEY = process.env.ADVICE_PRO_CONTRACT;
exports.ADVICE_PRO_URL = developmentMode ? process.env.FIREBASE_DB_TEST_URI + '/advice/advicepro' : process.env.ADVICE_PRO_URL;
exports.ADVICEPRO_RECORDS_DATABASE_URL = developmentMode ? process.env.FIREBASE_DB_TEST_URI + '/advice/submissions' : process.env.FIREBASE_DB_URI + '/advice/submissions';


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

// exports.FIREBASE_KEY = process.env.FIREBASE_KEY;
//LEGACY
exports.FIREBASE_PWD = 'something'
exports.FIREBASE_EMAIL = 'something@something.com'

exports.FIREBASE_DB_KEY = process.env.FIREBASE_DB_KEY;
exports.FIREBASE_DB_URI = developmentMode ? dbConfig.FIREBASE_DB_URI : process.env.FIREBASE_DB_URI 
exports.FIREBASE_DB_TEST_URI = developmentMode ? dbConfig.FIREBASE_DB_TEST_URI : process.env.FIREBASE_DB_TEST_URI 
exports.FIREBASE_DB_ERRORLOG_URI = developmentMode ? dbConfig.FIREBASE_DB_ERRORLOG_URI : process.env.FIREBASE_DB_ERRORLOG_URI
exports.FIREBASE_DB_ADMIN_UID = developmentMode ? dbConfig.FIREBASE_DB_ADMIN_UID : process.env.FIREBASE_DB_ADMIN_UID

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