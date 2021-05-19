require('dotenv').config();

var PORT = process.env.PORT || 4000;
exports.PORT = PORT;

const developmentMode = PORT === 4000;


exports.AGENCY_NAME = "KCLSU Advice";
exports.CONTACT_EMAIL = "help@kclsu.org";
exports.PHONE_NUMBER = "020 7848 1588";
exports.FULL_NAME= "KCLSU website";
exports.FIXIE_URL = process.env.FIXIE_URL;
exports.CONTRACT_KEY = process.env.ADVICE_PRO_CONTRACT;
exports.ADVICE_PRO_URL = developmentMode ? 'https://test-db-1577e.firebaseio.com/officers.json' : process.env.ADVICE_PRO_URL;
exports.ADVICEPRO_RECORDS_DATABASE_URL = developmentMode ? 'https://test-db-1577e.firebaseio.com/mascots/' : process.env.ADVICEPRO_RECORDS_DATABASE_URL;
 
exports.FIREBASE_SIGNIN = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + process.env.FIREBASE_DATABASE_KEY;
exports.ANONYMOUS_SIGNIN = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' ;
exports.LOG_URL = developmentMode ? 'https://test-db-1577e.firebaseio.com/deals.json' : 'https://test-db-1577e.firebaseio.com/deals.json'

//CREDENTIALS FOR KCLSU FIREBASE REAL TIME DATABASE
exports.FIREBASE_PWD = 'something'
exports.FIREBASE_EMAIL = 'something@something.com'


//CLOUDINARY CREDENTIALS
exports.CLOUDINARY_KEY =  process.env.CLOUDINARY_KEY;
exports.CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET;

//ERROR AREA NAMES
exports.AUTH = 'auth';
exports.ADVICE = 'advice';
exports.CLOUDINARY = 'cloudinary';
exports.MSL = 'msl';