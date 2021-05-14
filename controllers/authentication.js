const authHandler = require('../models/authentication/authhandler');
const { logError } = require('../utils/logError');
const { AUTH, FIRABASE_PWD, FIREBASE_EMAIL } = require('../utils/stringVals');

exports.authenticate = (req, res) => {
    const { email, password } = req.body.package;  
    authHandler.getFirebaseTokenSigned(email, password)
        .then(data => res.status(200).send(data))
        .catch(err => {
            res.status(400).send(err);
            //UPDATE DATABASE ERROR LOG
            logError(AUTH, 'Invalid for Signed In Auth - catch statement', { req })
        });
}

exports.protectedauth = (req, res) => {
    if (req.validToken ){ 
        authHandler.getFirebaseTokenSigned(FIREBASE_EMAIL, FIRABASE_PWD)
            .then(data => res.status(200).send(data))
            .catch(err => {
                res.status(400).send(err);
                //UPDATE DATABASE ERROR LOG
                logError(AUTH, 'Protected Auth denied - catch statement', { req })
            });
    }
    else res.status(500).send('Error: Invalid token');
}


exports.authanonymous = (req, res) => {
    
    if (req.validToken ){
        authHandler.getFirebaseToken()
            .then(data => res.status(200).send(data))
            .catch(err => {
                res.status(400).send(err);

                //UPDATE DATABASE ERROR LOG
                logError(AUTH, 'Invalid Token for Anonymous Auth - catch statement', { req })
            })
    }
    else res.status(500).send('Error: Invalid token')
    
}

