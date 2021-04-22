const authHandler = require('../models/authentication/authhandler');

exports.authenticate = (req, res) => {
    const { email, password } = req.user;  
    authHandler.getFirebaseTokenWithPassword(email, password)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err))
}


exports.firebaseAuth = (req, res) => {
    
    if (req.validToken ){
        authHandler.getFirebaseToken()
        .then(data => res.status(200).send(data))
        .catch(err => res.status(400).send(err))
    }
    else req.status(500).send('Error: Invalid token')
    
}

