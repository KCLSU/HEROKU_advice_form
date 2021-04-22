var express = require('express');
var router = express.Router();
var controllers = require('../controllers');
var { attachToRequest } = require('../middlewares/requestAddOns');
var { approveUser } = require('../middlewares/approveUser');
var { checkDuplicates } = require('../middlewares/checkDuplicates');
const { validate } = require('../middlewares/validation');
const { validateToken } = require('../middlewares/validateToken');
const { createToken } = require('../middlewares/createToken');


router.get('/', (req, res) => { res.status(200).send("SUCCESS")});
router.get('/newslist/:id', controllers.msl.fetchNews);  
router.get('/eventslist/:id', controllers.msl.fetchEvents);  
  
router.post('/submitAdvicePro', 
    attachToRequest, 
    checkDuplicates,
    validate, 
    controllers.advicepro.submitToAdvicePro
);

router.post('/upload_image', controllers.cloudinary.upload);

router.post('/transform', controllers.cloudinary.transform);

router.post('/authenticate',controllers.auth.authenticate);

router.get('/serverToken',
    attachToRequest,
    approveUser,
    createToken,
);

// https://www.youtube.com/watch?v=0SARbwvhupQ
// https://www.youtube.com/watch?v=vFOw_m5zNCs

router.post('/firebaseToken', 
    attachToRequest,
    validateToken,
    controllers.auth.firebaseAuth
);


module.exports = router;