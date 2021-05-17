const { errorResponse } = require("../utils/errorResponse");
const { logError } = require("../utils/logError");

exports.approveUser = (req, res, next) => {
    const userIp = req.ip;
    // console.log(req.referer);
    //Check if IP has had a token issued previously. If not, check referer and protocol
    //Could add an IP location based check here too
    let validIp = req.serverTokens.find(item => item.ip === userIp);
    let validUser = validIp || 
        req.get('origin').includes('kclsu.org')
        && req.get('referer').includes('manager')
        
    if (!validUser){
        res.status(400).send(errorResponse('The user in invalid'));
        //UPDATE DATABASE ERROR LOG
        logError('Auth', 'User not valid',  req )
    }
    else next();

};
