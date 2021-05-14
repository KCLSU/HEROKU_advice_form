require('dotenv').config();

// if (process.env.PORT === 4000){

// }
// else {

// }

exports.AGENCY_NAME = "KCLSU Advice";
exports.CONTACT_EMAIL = "help@kclsu.org";
exports.PHONE_NUMBER = "020 7848 1588";
exports.FULL_NAME= "KCLSU website";
exports.FIXIE_URL = process.env.FIXIE_URL;
exports.CONTRACT_KEY = process.env.ADVICE_PRO_CONTRACT;
// exports.ADVICE_PRO_URL = process.env.ADVICE_PRO_URL;
exports.ADVICE_PRO_URL = 'https://test-db-1577e.firebaseio.com/officers.json';
// exports.ADVICEPRO_RECORDS_DATABASE_URL = 'https://kclsu-advice.firebaseio.com/submissions/';
exports.ADVICEPRO_RECORDS_DATABASE_URL = process.env.PORT = 4000 ?
 'https://test-db-1577e.firebaseio.com/mascots/' :
 'https://kclsu-advice.firebaseio.com/submissions';
 
exports.FIREBASE_URI = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
exports.ANONYMOUS_SIGNIN = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
exports.LOG_URL = 'https://test-db-1577e.firebaseio.com/deals.json'

//CREDENTIALS FOR KCLSU FIREBASE REAL TIME DATABASE
exports.FIRABASE_PWD = 'something'
exports.FIREBASE_EMAIL = 'something@something.com'


//ERROR AREA NAMES
exports.AUTH = 'auth';
exports.ADVICE = 'advice';
exports.CLOUDINARY = 'cloudinary';
exports.MSL = 'msl';