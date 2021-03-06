const { errorResponse } = require("../utils/errorResponse");
const { logError } = require("../utils/logError");
const { DEVELOPMENT_MODE } = require('../utils/stringVals');

exports.approveUser = (req, res, next) => {
    const userIp = req.ip;
    //Check if IP has had a token issued previously. If not, check origin
    //Could add an IP location based check here too
    let validIp = req.serverTokens.find(item => item.ip === userIp);

    let validOrigin = req.get('origin') && req.get('origin').includes('kclsu.org');
    let validUser = validIp && req.secure || validOrigin;
    
    if (DEVELOPMENT_MODE){
        validUser = true;
    }
    
    if (!validUser){
        res.status(400).send(errorResponse('The user is invalid'));
        //UPDATE DATABASE ERROR LOG
        logError('Auth', 'User not valid',  req )
    }
    else next();

};
