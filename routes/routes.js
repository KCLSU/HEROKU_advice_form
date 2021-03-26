var express = require('express');
var router = express.Router();
var controllers = require('../controllers');

router.get('/', (req, res) => { res.status(200).send("SUCCESS")});
router.get('/newslist/:id', controllers.msl.fetchNews);  
router.get('/eventslist/:id', controllers.msl.fetchEvents);  
  
router.post('/submitAdvicePro', validate(), controllers.advicepro.submitToAdvicePro);
router.post('/authenticate', controllers.auth.authenticate);
router.post('/upload_image',controllers.cloudinary.upload);
router.post('/transform', controllers.cloudinary.transform);
