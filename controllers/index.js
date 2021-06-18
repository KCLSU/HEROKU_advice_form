var mslController = require('../controllers/msl');
var adviceproController = require('../controllers/advicepro');
var cloudinaryController = require('../controllers/cloudinary');
var authController = require('../controllers/authentication');

module.exports = {
    msl: mslController,
    advicepro: adviceproController,
    cloudinary: cloudinaryController,
    auth: authController
}