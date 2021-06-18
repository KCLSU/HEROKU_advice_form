var admin = require("firebase-admin");
const authHandler = require('../models/authentication/authhandler');
const { errorResponse } = require('../utils/errorResponse');
const { logError } = require('../utils/logError');
const { AUTH, KCLSU_CUSTOM_KEY, FIREBASE_DB_ADMIN_UID } = require('../utils/stringVals');

exports.authenticate = (req, res) => {
    const { email, password } = req.body.package;  
    authHandler.getFirebaseTokenSigned(email, password)
        .then(data => {
            if (data.error){
                res.status(400).send(errorResponse(data.error.message,{ error: data.error}));
                logError(AUTH, data.error.message, req, {error: data.error})
            }
            else res.status(200).send(data)
        })
        .catch(err => {
            res.status(400).send(errorResponse('Firebase Auth denied', { error: err }));
            //UPDATE DATABASE ERROR LOG
            logError(AUTH, 'Failed to retrieve Firebase Token from signed auth - catch statement', req, { err })
        });
}

exports.protectedauth = (req, res) => {

    let providedKey = req.params.key;
    if (providedKey === KCLSU_CUSTOM_KEY){
        admin
            .auth()
            .createCustomToken(FIREBASE_DB_ADMIN_UID)
            .then((customToken) => {
                res.status(200).send({ token: customToken })
            })
            .catch((error) => {
                res.status(400).send(errorResponse('Protected Auth denied', { error }));
                logError(AUTH, 'Protected Auth denied, failed to get Firebase Token - catch statement', req, { error })
            });
    }
}


exports.authanonymous = (req, res) => { 
    authHandler.getFirebaseToken()
        .then(data => res.status(200).send(data))
        .catch(err => {
            res.status(400).send(errorResponse(err));

            //UPDATE DATABASE ERROR LOG
            logError(AUTH, 'Firbase Token denied for Anonymous Auth - catch statement', req, { err })
        })
}

