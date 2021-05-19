const { errorResponse } = require("../utils/errorResponse");
const { logError } = require("../utils/logError");

exports.validateToken = (req, res, next) => {
    const existingTokens = req.serverTokens;
    const userToken = req.get('kclsutoken');
    const userIp = req.ip;

    //CHECK TOKEN IS IN LIST OF RECENTLY CREATED TOKENS
    //CHECK USER IP MATCHES IP IN TOKEN

    let validToken = existingTokens.find(item => 
       item.ip === userIp && item.token === userToken
    );

    if(!validToken){
        res.status(500).send(errorResponse('Error: Invalid token'));
        logError('Token', 'Invalid Token supplied by client', req)
    }
    else next();
}

