var express = require('express');
var router = express.Router();
var controllers = require('../controllers');
var { attachToRequest } = require('../middlewares/requestAddOns');
var { approveUser } = require('../middlewares/approveUser');
var { checkDuplicates } = require('../middlewares/checkDuplicates');
const { validate } = require('../middlewares/validation');
const { validateToken } = require('../middlewares/validateToken');
const { createToken } = require('../middlewares/createToken');
const { checkValid } = require('../middlewares/checkValid');


router.get('/', (req, res) => { res.status(200).send("SUCCESS")});
router.get('/newslist/:id', controllers.msl.fetchNews);  
router.get('/eventslist/:id', controllers.msl.fetchEvents);  
  
router.post('/submitAdvicePro', 
    attachToRequest, 
    checkDuplicates,
    validate('advicepro'),
    checkValid,
    controllers.advicepro.submitToAdvicePro
);

router.post('/upload_image', controllers.cloudinary.upload);

router.post('/transform', controllers.cloudinary.transform);

router.post('/authenticate',
    attachToRequest,
    validateToken,
    controllers.auth.authenticate
);

router.get('/serverToken',
    attachToRequest,
    approveUser,
    createToken
);


//FOR ANONYNMOUS FIREBASE AUTH
router.post('/signinanon', 
    attachToRequest,
    validateToken,
    controllers.auth.authanonymous
);


module.exports = router;