const { errorResponse } = require("../utils/errorResponse");
const { logError } = require("../utils/logError");

exports.validateToken = (req, res, next) => {
    const existingTokens = req.serverTokens;
    //const userToken = req.get('kclsutoken');
    const cookieToken = req.cookies.kclsutoken;
    const userIp = req.ip;
    //console.log(req.cookies)
    //const tokenString = req.cookies.kclsutoken;
    //console.log(tokenString)
    
    //console.log('ALL TOKENS')
   // console.log(existingTokens)
    //CHECK TOKEN IS IN LIST OF RECENTLY CREATED TOKENS
    //CHECK USER IP MATCHES IP IN TOKEN

    let validToken = existingTokens.find(item => 
       item.ip === userIp && item.token === cookieToken
    );

    if(!validToken){
        res.status(400).send(errorResponse('Error: Invalid token'));
        logError('Token', 'Invalid Token supplied by client', req)
    }
    else next();
}

