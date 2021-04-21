const authHandler = require('../models/authentication/authhandler');
var firebaseAuth = require('../models/old/authentication/firebaseAuth');

exports.authenticate = (req, res) => {  
    firebaseAuth(req.body.package, req.body.area)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err))
}

exports.randomString = (req, res) => {
    res.status(200).send(authHandler.generateString());
}