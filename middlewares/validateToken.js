const { errorResponse } = require("../utils/errorResponse");
const { logError } = require("../utils/logError");
const { DEVELOPMENT_MODE, CLIENT_DEV_URI, HEROKU_URI } = require('../utils/stringVals');

exports.validateToken = (req, res, next) => {
    const existingTokens = req.serverTokens;
    const cookieToken = req.cookies.kclsutoken || { token: null }
    const userIp = req.ip;
    //CHECK TOKEN IS IN LIST OF RECENTLY CREATED TOKENS
    //CHECK USER IP MATCHES IP IN TOKEN

    let validToken = existingTokens.find(item => 
       item.ip === userIp && item.token === cookieToken.token
    );

    const allowedOrigin = DEVELOPMENT_MODE ?  CLIENT_DEV_URI : HEROKU_URI;
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Access-Control-Allow-Credentials', true);
    

    if (!validToken) {
        res.status(400).send(errorResponse('Error: Invalid token'));
        logError('Token', 'Invalid Token supplied by client', req)
    }
    else next();
}

