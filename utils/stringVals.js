require('dotenv').config();

exports.AGENCY_NAME = "KCLSU Advice";
exports.CONTACT_EMAIL = "help@kclsu.org";
exports.PHONE_NUMBER = "020 7848 1588";
exports.FULL_NAME= "KCLSU website";
exports.FIXIE_URL = process.env.FIXIE_URL;
exports.CONTRACT_KEY = process.env.ADVICE_PRO_CONTRACT;
exports.ADVICE_PRO_URL = process.env.ADVICE_PRO_URL;
exports.ADVICEPRO_RECORDS_DATABASE_URL = 'https://kclsu-advice.firebaseio.com/submissions/';
exports.FIREBASE_URI = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
