const { errorResponse } = require("../utils/errorResponse");
const { logError } = require("../utils/logError");
const { KCLSU_URI } = require('../utils/stringVals');

exports.validateToken = (req, res, next) => {
    const existingTokens = req.serverTokens;
    const cookieToken = req.cookies.kclsutoken || { token: null };
    const userIp = req.ip;
    console.log(cookieToken)
    let validToken = existingTokens.find(item => 
       item.ip === userIp && item.token === cookieToken.token
    );

    const allowedOrigin = req.get('origin') || KCLSU_URI;

    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Access-Control-Allow-Credentials', true);
    

    if(!validToken){
        res.status(400).send(errorResponse('Error: Invalid token'));
        logError('Token', 'Invalid or non-existing token supplied by client: ' + cookieToken.token, req)
    }
    else next();
}

