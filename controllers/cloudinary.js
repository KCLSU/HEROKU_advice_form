const cloudinaryInterface = require("../models/cloudinary/interface");
const { errorResponse } = require("../utils/errorResponse");
const { logError } = require("../utils/logError");
const fs = require('fs');

exports.transform = (req, res) => {
    let transformations = req.body.transformations;
    let id = req.body.publicId;
    const cloudinaryInt = new cloudinaryInterface();
    cloudinaryInt.transform(id, transformations)
        .then(img => res.status(200).send(img))
        .catch(err => {
            res.status(500).send(errorResponse('Image transform failed', {"error":err, "status": "Failed to transform image"}));
            logError('Cloudinary', 'Failed to transform image', req, { response: err })
        })
}

exports.upload = (req, res) => {
    const cloudinaryInt = new cloudinaryInterface();
    cloudinaryInt.upload(req.file)
    .then(result => {
        fs.unlink(req.file.path, er => {
            if (er) throw new Error(er)
        })
        res.status(200).send(result)
    })
    .catch(er => {
        res.send(errorResponse('Failed to upload new image to Cloudinary', { response: er }));
        logError('Cloudinary', 'Failed to upload new image', req, { response: er })
    })
}