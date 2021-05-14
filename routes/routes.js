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

//MSL

router.get('/', (req, res) => { res.status(200).send("SUCCESS")});
router.get('/newslist/:id', controllers.msl.fetchNews);  
router.get('/eventslist/:id', controllers.msl.fetchEvents);  
  
//ADVICE 

router.post('/submitAdvicePro', 
    attachToRequest, 
    checkDuplicates,
    validate('advicepro'),
    checkValid,
    controllers.advicepro.submitToAdvicePro
);

//CLOUDINARY

router.post('/upload_image', controllers.cloudinary.upload);

router.post('/transform', controllers.cloudinary.transform);

//TOKENS AND AUTHENTICATION

router.post('/authenticate', controllers.auth.authenticate);

        //AUTH FOR KCLSU PROTECTED PAGES
router.post('/protectedauth',
    attachToRequest,
    validateToken,
    controllers.auth.protectedauth
);

    //GENERATE A TOKEN AND ATTACH TO CLIENT HEADER
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