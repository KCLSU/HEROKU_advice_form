const authHandler = require('../models/authentication/authhandler');
const { errorResponse } = require('../utils/errorResponse');
const { logError } = require('../utils/logError');
const { AUTH, FIRABASE_PWD, FIREBASE_EMAIL, FIREBASE_KEY } = require('../utils/stringVals');

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
    if (providedKey === FIREBASE_KEY){
        authHandler.getFirebaseTokenSigned(FIREBASE_EMAIL, FIRABASE_PWD)
        .then(data => {
            if (data.error){
                res.status(400).send(errorResponse('Failed to retrieve Firebase Token from signed auth',{ error: data.error}));
                logError(AUTH, data.error.message, req, {error: data.error})
            }
            else res.status(200).send(data)
        })
        .catch(err => {
            res.status(400).send(errorResponse('Protected Auth denied', { error: err }));
            //UPDATE DATABASE ERROR LOG
            logError(AUTH, 'Protected Auth denied, failed to get Firebase Token - catch statement', req, { error: err })
        });
    } else {
        res.status(400).send(errorResponse('Invalid key provided'));
        logError(AUTH, 'Protected Auth denied, invalid firebase key provided', req)
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

