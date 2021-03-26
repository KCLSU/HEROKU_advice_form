
exports.authenticate = (req, res) => {  
    firebaseAuth(req.body.package, req.body.area)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err))
}