const authHandler = require('../models/authentication/authhandler');
const { logError } = require('../utils/logError');
const { AUTH } = require('../utils/stringVals');

exports.authenticate = (req, res) => {
    if (req.validToken ){
        const { email, password } = req.body.package;  
        authHandler.getFirebaseTokenWithPassword(email, password)
            .then(data => res.status(200).send(data))
            .catch(err => {
                res.status(400).send(err);
                
                //UPDATE DATABASE ERROR LOG
                logError(AUTH, 'Invalid Token for Signed In Auth', { req })
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
                logError(AUTH, 'Invalid Token for Anonymous Auth', { req })
            })
    }
    else res.status(500).send('Error: Invalid token')
    
}

