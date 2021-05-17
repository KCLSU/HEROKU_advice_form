const authHandler = require('../models/authentication/authhandler');
const { errorResponse } = require('../utils/errorResponse');
const { logError } = require('../utils/logError');
const { AUTH, FIRABASE_PWD, FIREBASE_EMAIL } = require('../utils/stringVals');

exports.authenticate = (req, res) => {
    const { email, password } = req.body.package;  
    authHandler.getFirebaseTokenSigned(email, password)
        .then(data => {
            if (data.error){
                logError(AUTH, data.error.message, req, {error: data.error})
            }
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(400).send(err);
            //UPDATE DATABASE ERROR LOG
            logError(AUTH, 'Failed to retrieve Firebase Token from signed auth - catch statement', req, { err })
        });
}

exports.protectedauth = (req, res) => {
    authHandler.getFirebaseTokenSigned(FIREBASE_EMAIL, FIRABASE_PWD)
        .then(data => {
            res.status(400).send(errorResponse('Failed to retrieve Firebase Token from signed auth',{ error: data.error}));
            logError(AUTH, data.error.message, req, {error: data.error})
        })
        .catch(err => {
            res.status(400).send(errorResponse('Protected Auth denied', { error: err }));
            //UPDATE DATABASE ERROR LOG
            logError(AUTH, 'Protected Auth denied, failed to get Firebase Token - catch statement', req, { error: err })
        });
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

