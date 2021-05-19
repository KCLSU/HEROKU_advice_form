const cloudinaryInterface = require("../models/cloudinary/interface");
const { errorResponse } = require("../utils/errorResponse");
const { logError } = require("../utils/logError");


exports.transform = (req, res) => {
    let transformations = req.body.transformations;
    let id = req.body.publicId;
    const cloudinaryInt = new cloudinaryInterface();
    cloudinaryInt.transform(id, transformations)
        .then(img => res.status(200).send(img))
        .catch(err => {
            res.status(500).send(errorResponse('Image transform failed',{"error":err, "status": "Failed to transform image"}));
            logError('Cloudinary', 'Failed to transform image', req, { error: err })
        })
}

exports.upload = (req, res, next) => {
    console.log('----------------------------------')
    console.log(req.file)
    console.log('----------------------------------');
    const cloudinaryInt = new cloudinaryInterface();
    cloudinaryInt.upload(req.file)
    .then(result => {
        fs.unlink(req.file.path, er => {
            if (er) throw new Error(er)
        })
        res.status(200).send(result)
    })
    .catch(er => {
        res.send(er);
        logError('Cloudinary', 'Failed to upload new image', req, { error: er })
    })
    }